// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                      D A T A B A S E                                           //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//

async function Marketing_Database(event)
{ 
 // SET UP CONTROLS
 var page = Core_State_Get("marketing", "submodule");
 
 UI_Element_Find(page, "panel-lists-title").innerHTML = UI_Language_String("marketing/database", "panel lists title");
 
 UI_Element_Find(page, "list-menu-upload").onclick   = Marketing_Database_UploadLeads;
 UI_Element_Find(page, "list-menu-move").onclick     = Marketing_Database_MoveLeads;
 UI_Element_Find(page, "list-menu-delete").onclick   = Marketing_Database_DeleteList;
 UI_Element_Find(page, "list-menu-rename").onclick   = Marketing_Database_RenameList;
 UI_Element_Find(page, "list-menu-cleanup").onclick  = Marketing_Database_CleanList;

  
 
 // LISTS MENU
 var menu = UI_Menu_Create("lists", 
 {
  new:
  {
   text  : UI_Language_String("marketing/menus", "lists new"),
   state : "enabled",  
   icon  : "list-alt",
   func  : Marketing_Database_NewList
  },
  
  reload:
  {
   text  : UI_Language_String("marketing/menus", "lists reload"),
   state : "enabled",  
   icon  : "sync-alt",
   func  : Marketing_Database_UpdateLists
  }
 });
 
 
 var container = UI_Element_Find(page, "panel-lists");
 UI_Menu_Assign(container, menu);
 
 
 
 // LIST HEADER (LEADS, STATS ETC.)
 var items = {};

 var item        = {};
 item["icons"]   = [];
 item["text"]    = UI_Language_String("marketing/database", "list menu leads");
 item["onclick"] = Marketing_Database_ListLeads;  
 items["leads"]  = item;
 
  var item       = {};
 item["icons"]   = [];
 item["text"]    = UI_Language_String("marketing/database", "list menu stats");
 item["onclick"] = Marketing_Database_ListStats;  
 items["stats"]  = item;
 
 var header = UI_Header("list-menu", items, {selectfirst:false, css:"color-noted"});  
 UI_Element_Find(page, "panel-list-menu").appendChild(header);
 
 Core_State_Set("marketing", ["database", "list-header"], header);
 

 
 await Marketing_Database_UpdateLists();
}







// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                         L I S T S                                              //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//


function Marketing_Database_ListName(id)
{
 var lists = Core_State_Get("marketing", "lists", {});
 var lists = Array_Organize_ByField(lists, "id");
 var name  = Safe_Get(lists, [id ,"name"], id);
 
 return name;
}




async function Marketing_Database_UpdateLists()
{
 await Marketing_Database_ReadLists();
 await Marketing_Database_DisplayLists();
}



async function Marketing_Database_NewList(event)
{
 var popup = false;

 // CREATE DIALOG
 var content = UI_Element_Create("marketing/popup-newlist", {}, {language:"marketing/popups"});

 // CREATE NEW
 var button_create =
 {
  text   : UI_Language_String("marketing/popups", "newlist button create"), 
  onclick: 
  async function()
  {
   var name      = UI_Element_Find(popup, "name").value;
   var id        = await Core_Api("Marketing_Lists_New", {name});
   Core_State_Set("marketing", ["database", "new-list"], id);
   
   UI_Popup_Close(popup);
  }
 }


 // CANCEL
 var button_cancel =
 { 
  text   : UI_Language_String("core/popups", "button cancel"), 
  onclick: "close" 
 } 
 
 
 // ON CLOSE POPUP
 var onclose = 
 async function()
 {
  var id = Core_State_Get("marketing", ["database", "new-list"], false); console.log(id);
  if(id)
  {
   // RELOAD LISTS
   await Marketing_Database_UpdateLists();
 
   // FIND AND SELECT NEWLY CREATED LIST
   Marketing_Database_SelectList(id);
  
   Core_State_Set("marketing", ["database", "new-list"], false);
  }
 }


 // CREATE POPUP
 var title = UI_Language_String("marketing/popups", "newlist title");
 var text  = UI_Language_String("marketing/popups", "newlist text");
 popup     = await UI_Popup_Create({content, title, text}, [button_create, button_cancel], "flexi", {open:false, escape:true, onclose}); 
 
 
 
 // OPEN POPUP
 Core_State_Set("marketing", ["database", "new-list"], false);
 await UI_Popup_Show(popup);
}





async function Marketing_Database_ReadLists()
{
 var lists   = await Core_Api("Marketing_Lists_List", {});
 
 Core_State_Set("marketing", "lists", lists);
}



async function Marketing_Database_ListSelect(element)
{
 var item = Document_Element_GetObject(element, "item");
 Core_State_Set("marketing", ["database", "selected-list"], item);
  
 UI_Element_Find("list-name").innerHTML              = UI_Language_String("marketing/database", "list title", {name:item["name"]});
 UI_Element_Find("panel-list-display").innerHTML     = "";
 UI_Element_Find("panel-list-actions").style.display = "none";
 
 UI_Element_Find("panel-list").style.visibility = "visible";
 
 var header = Core_State_Get("marketing", ["database", "list-header"]);
 
 
 var view = Core_State_Get("marketing", ["database", "list-view"], "leads");
 if(view) 
 {
  UI_Header_Set(header, view, true);
 }
}



async function Marketing_Database_ListLeads()
{
 Core_State_Set("marketing", ["database", "list-view"], "leads");
 
 UI_Element_Find("panel-list-actions").style.display = "flex";
 
 // CREATE LEADS TABLE 
 var pagerows  = Module_Config("users", "page"); 
 
 var display  = Database_View_Create("Marketing_Leads_ByList", pagerows, 
 {
  student_id  :true,
  name        :true,
  phone_mobile:true,
  email       :true
 }, 
 "marketing/lead-fields", false, false, {export_fields:"student_id,phone_mobile,email,name", operations:{}});
 
 // Change order from name to id
 // await Database_View_Query(display,
 // {		
  // fields : "student_id,phone_mobile,email,name",
  // list_id: Core_State_Get("marketing", ["database", "selected-list", "id"], -1),
  // order  : "name",
 // }); 

 await Database_View_Query(display,
 {		
  fields : "student_id,phone_mobile,email,name",
  list_id: Core_State_Get("marketing", ["database", "selected-list", "id"], -1),
  order  : "order_id",
 }); 


 var panel       = UI_Element_Find("panel-list-display");
 panel.innerHTML = "";
 panel.appendChild(display);
}





async function Marketing_Database_ListStats()
{
 Core_State_Set("marketing", ["database", "list-view"], "stats");
 
 UI_Element_Find("panel-list-actions").style.display = "none";
 
 var id   = Core_State_Get("marketing", ["database", "selected-list", "id"], -1)
 var stats = await Core_Api("Marketing_List_Stats", {id, outcomes:["eng","no","rec"]});
 
 
 // CHART: LIST USAGE
 var unused = stats["total"] - stats["used"];
 var data   = 
 [
  {color:Document_CSS_GetVariable("color-light"), name:UI_Language_String("marketing/database", "chart legend unused"), value:unused}, 
  {color:Document_CSS_GetVariable("color-dark"),   name:UI_Language_String("marketing/database", "chart legend used"),   value:stats["used"]}
 ];
 var chart_usage = UI_Chart_DoughnutLegend(data, 0.67, {width:"100%", height:"100%", zIndex:100, values:"left"});  
 
 
 // CHART: LIST OUTCOMES
 var outcomes       = Core_Data_Page("marketing/outcomes");
 var data           = Object_Subset(stats, ["eng", "rec", "no"]); 
 var chart_outcomes = UI_Chart_DoughnutLegend(data,  0.67, {width:"100%", height:"100%", zIndex:100, values:"left"}, outcomes);
 
 
 var panel       = UI_Element_Find("panel-list-display");
 panel.innerHTML = "";
 panel.appendChild(chart_usage);
 panel.appendChild(chart_outcomes);

 //panel.appendChild(display);
}




async function Marketing_Database_DisplayLists(lists)
{
 var page = Core_State_Get("marketing", "submodule");
 if(!lists) var lists = Core_State_Get("marketing", "lists", []);


 // ASSEMBLE DISPLAY
 var display = UI_List_Items(lists, ["style-outlined-accented", "outline-inner"], Marketing_Database_ListSelect, {style:"vertical", overflow:true},
 
 // ITEMS
 function(item)
 {    
  var element = UI_Element_Create("marketing/database-list-card", item, {language:"marketing/elements"});  
  Document_Element_SetObject(element, "item", item);
  Document_Element_SetData(element, "list_id", item["id"]);
  
  return element; 
 });
 
 
 var container       = UI_Element_Find(page, "panel-lists");
 container.innerHTML = "";
 container.appendChild(display);
}




async function Marketing_Database_SelectList(id)
{
 var container = UI_Element_Find("panel-lists");
 
 var element   = Document_Element_FindChild(container, "list_id", id, ["recurse"]); 
 if(element) 
 {	  
  element.scrollIntoView({behavior: "smooth", block: "center"});
  Document_Event_Trigger(element, "click");
 } 
}








// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                             S I D E   M E N U   F U N C T I O N S                              //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//



async function Marketing_Database_DeleteList()
{
 var list = Core_State_Get("marketing", ["database", "selected-list"], false);
 if(!list) return;
 
 
 var title   = UI_Language_String("marketing/popups", "deletelist title");
 var content = UI_Language_String("marketing/popups", "deletelist confirm", list); 
 var picture = Resources_URL("images/cover-alert.jpg");  
 var confirm = await UI_Popup_Confirm(title, content, picture);
 if(!confirm) return;
 
 
 var result = await Core_Api("Marketing_List_Delete", {id:list["id"], emptyonly:true});
 
 if(result == "notempty")
 {
  var title   = UI_Language_String("marketing/popups", "deletelist title");
  var content = UI_Language_String("marketing/popups", "deletelist cant"); 
  var picture = Resources_URL("images/cover-deny.png");  

  await UI_Popup_Alert(title, content, picture);
  return;
 }
 
 
 var title   = UI_Language_String("marketing/popups", "deletelist title");
 var content = UI_Language_String("marketing/popups", "deletelist done", list); 
 await UI_Popup_Alert(title, content);
 
 await Marketing_Database_UpdateLists();
}




async function Marketing_Database_RenameList()
{
 var list = Core_State_Get("marketing", ["database", "selected-list"], false);
 if(!list) return;
 
 
 var title   = UI_Language_String("marketing/popups", "renamelist title");
 var picture = Resources_URL("images/cover-write.png");  
 var newname = await UI_Popup_Input(title, false, picture, list["name"]);
 if(!newname) return;
 
 var result = await Core_Api("Marketing_List_Rename", {id:list["id"], name:newname});
 
 switch(result)
 {
  case "ok":
  break;
  
  case "exists":
	var title   = UI_Language_String("marketing/popups", "renamelist title");
    var content = UI_Language_String("marketing/popups", "renamelist exists", list); 
    var picture = Resources_URL("images/cover-deny.png");  
 
	await UI_Popup_Alert(title, content, picture);
	return;
  break;
 }
 
 await Marketing_Database_UpdateLists();
}











async function Marketing_Database_CleanList()
{
 var list = Core_State_Get("marketing", ["database", "selected-list"], false);
 if(!list) return;
 
 
 var title   = UI_Language_String("marketing/popups", "cleanlist title");
 var content = UI_Language_String("marketing/popups", "cleanlist text", list); 
 var picture = Resources_URL("images/cover-alert.jpg");  
 var confirm = await UI_Popup_Confirm(title, content, picture);
 if(!confirm) return;
 
 await Core_Api("Marketing_Leads_Reset", {list_id:list["id"], criteria:"all"});
}




async function Marketing_Database_MoveLeads()
{
 var list = Core_State_Get("marketing", ["database", "selected-list"], false);
 if(!list) return;
 
 var popup = false;
 
 // POPUP CONTENT
 var content = UI_Element_Create("marketing/popup-moveleads", list, {language:"marketing/popups"});
 var select  = UI_Element_Find(content, "list");
 
 // SHOW LISTS IN SELECT
 var lists = Core_State_Get("marketing", "lists", []);
 Marketing_Lists_ToSelect(lists, select, {selected:list["id"], sections:true});

 
 
 // POPUP BUTTONS
 
 // CANCEL
 var button_cancel =
 { 
  text   : UI_Language_String("core/popups", "button cancel"), 
  onclick: "close" 
 } 
 
 
 // MOVE
 var button_move =
 { 
  text   : UI_Language_String("marketing/popups", "moveleads move"), 
  onclick: 
  async function()
  {
   var list_from = list["id"];
   var list_to   = UI_Element_Find(popup, "list").value;
   var amount    = UI_Element_Find(popup, "amount").value;
   var virgin    = UI_Element_Find(popup, "virgin").checked;

   var title   = UI_Language_String("marketing/popups", "moveleads title");
   var content = UI_Language_String("marketing/popups", "moveleads confirm", {from:Marketing_Database_ListName(list_from), to:Marketing_Database_ListName(list_to), amount}); 
   var picture = Resources_URL("images/cover-alert.jpg");  
   var confirm = await UI_Popup_Confirm(title, content, picture);
   if(!confirm) return;

   await Core_Api("Marketing_List_MoveLeads", {list_from, list_to, amount, virgin});   
   
   await UI_Popup_Close(popup);
   await Marketing_Database_UpdateLists();
  }
 } 
 
 
 
 // CREATE POPUP
 var title = UI_Language_String("marketing/popups", "moveleads title");
 popup     = await UI_Popup_Create({content, title}, [button_move, button_cancel], "flexi", {open:false, escape:true, onclose}); 
 
 
 // OPEN POPUP
 await UI_Popup_Show(popup);
}



async function Marketing_Database_UploadLeads()
{
 var fields    = ["student_id", "name", "center", "course", "phone_mobile", "email", "province", "city", "notes", "owner_name", "teachers_tas_name"];
 var popup     = false;
 var content   = false;
 var lines     = [];
 
 var firstrow  = "";
 var separator = "";
 
 
 // READ USER'S LAST LEAD UPLOAD SETTINGS
 var value = await Core_Api("User_Config_Read", {file:"marketing", section:"database", field:"upload-leads-assign"});
 assign    = Object_From_String(value);

 

 // READ CSV FILE
 var files = await Storage_File_Select({accept:".csv, .txt"});
 if(!files || files.length == 0) return;
 
 var data  = await Storage_File_ReadText(files[0]);
 
 var deletedFR = false;
 
 // FUNCTION UPDATE
 var update =
 function()
 {
  // SETUP
  separator = UI_Element_Find(popup, "select-separator").value; 
  firstrow  = UI_Element_Find(popup, "select-firstrow").value; 
  
  // DECODE
  var text  = data; //atob(data);
  lines     = Array_From_String(text, "\r\n");
  
  if(firstrow == "fields" && lines.length > 0)
  {
   deletedFR = true;
   Array_Element_DeleteAt(lines, 0);
  }
  
  for(var i in lines) lines[i] = lines[i].split(separator);
  
  
  // PURGE DELIMITERS
  for(var i in lines)
  {
   var tokens = lines[i];
   
   for(var t in tokens)
   {
	var token = tokens[t];
	
	if((token[0] == "'" && token[token.length -1] == "'") || (token[0] == '"' && token[token.length -1] == '"'))
	{
     tokens[t] = token.substr(1, token.length-2)
	}
   }
  }
   

  // UPDATE FIELDS SELECTORS
  for(var field of fields)
  {
   var select = Document_Element_FindChild(popup, "assign", field, ["recurse"]);
  
   if(select)
   {
	select.innerHTML = "";
	
	Document_Select_AddOption(select, "", "");
	
    if(lines.length > 0)
	{
     for(var i in lines[0])
	 {
	  var value = lines[0][i];
	  Document_Select_AddOption(select, value, i);
	 }
	}
	
	if(assign[field] !== undefined) select.value = assign[field];

    select.onchange =   
    async function(event)
	{
     var select    = event.srcElement;
	 var field     = Document_Element_GetData(select, "assign");
	 assign[field] = select.value;
	 
	 var value = Object_To_String(assign);   
	 await Core_Api("User_Config_WriteValue", {file:"marketing", section:"database", field:"upload-leads-assign", value});
	}		
   }
  }

  if(!deletedFR)
  Array_Element_DeleteAt(lines, 0);

  // DISPLAY SAMPLE
  var container       = UI_Element_Find(popup, "sample");
 
  var table = UI_Table("data");
  var n     = lines.length;
  if(n > 10) n = 10;
  
  var k = lines[0].length;
  for(var i = 0; i<n; i++)
  {
   var row  = UI_Table_Row(table);
   for(var j=0; j<k; j++)
   {
	var cell = UI_Table_Cell(row);
    cell.innerHTML = lines[i][j];
	
	Document_CSS_SetClass(cell, "table-borders-gray");
   }
  }
  
  container.innerHTML = "";
  container.appendChild(table);  
 }
 
 
 
 // FUNCTION UPLOAD
 var upload = 
 async function()
 {
  // DETERMINE LIST
  var lists    = Array_Organize_ByField(Core_State_Get("marketing", "lists"), "id");
  var list_id  = Core_State_Get("marketing", ["database", "selected-list", "id"], -1);
  var list     = lists[list_id];
  
  // OTHER UPLOAD PARAMETERS
  var leads    = lines.filter(lead => { if(lead.join("").length > 0) return true; else return false });
  var code     = UI_Element_Find(popup, "input-tag").value;
  

  // CONFIRMATION POPUP 
  var title    = UI_Language_String("marketing/popups", "upload confirm title"); 
  var content  = UI_Language_String("marketing/popups", "upload confirm text", {count:leads.length, name:list["name"], code}); 
  var picture  = Resources_URL("images/cover-alert.jpg");

  var confirm  = await UI_Popup_Confirm(title, content, picture);
	 
  if(confirm)
  {
   // WAIT POPUP
   var title   = UI_Language_String("marketing/popups", "upload wait title"); 
   var content = UI_Language_String("marketing/popups", "upload wait text"); 
   var wait    = await UI_Popup_Create({title, content}, [], "standard", {open:true, escape:false});
   

   // UPLOAD
   await Core_Api("Marketing_Leads_Upload", {list_id, code, leads, assign});
   
   // CLOSE POPUPS
   await UI_Popup_Close(wait);
   await UI_Popup_Close(popup);
   
   // RELOAD LISTS AND RESELECT THE CURRENT ONE
   await Marketing_Database_UpdateLists();
   await Marketing_Database_SelectList(list_id);
  } 
 }

 
 
 
 // POPUP CONTENT
 content = UI_Element_Create("marketing/popup-upload", {}, {language:"marketing/popups"});
 
 // FIELDS ASSIGNMENT
 var container = UI_Element_Find(content, "fields-assign");
 for(var field of fields)
 {
  var element = UI_Element_Create("marketing/popup-upload-selectfield", {field}, {language:"marketing/popups"});
  UI_Element_Find(element, "caption").innerHTML = UI_Language_String("marketing/popups", "upload field " + field);
  
  var select = UI_Element_Find(element, "select");
  Document_Element_SetData(select, "assign", field);
  
  container.appendChild(element);
 }
 
 
 
 // CREATE AND OPEN POPUP
 var button_upload =
 { 
  text   : UI_Language_String("marketing/popups", "upload button upload"), 
  onclick: upload 
 }
 
 var button_cancel =
 { 
  text   : UI_Language_String("core/popups", "button cancel"), 
  onclick: "close" 
 }
 
 popup = await UI_Popup_Create({content}, [button_upload, button_cancel], "flexi", {open:false, escape:true});
 
 UI_Element_Find(popup, "select-separator").onchange = update; 
 UI_Element_Find(popup, "select-firstrow").onchange  = update;

 update();
 await UI_Popup_Show(popup);
}