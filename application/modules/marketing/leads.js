// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                      L E A D S                                                 //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//



async function Marketing_Leads_Create(phone, studentid)
{
 var title   = UI_Language_String("marketing/call", "search popup title");
 var text    = UI_Language_String("marketing/call", "search popup newlead");
 var confirm = await UI_Popup_Confirm(title, text);
   
 if(!confirm) return;
   
 var title   = UI_Language_String("marketing/call", "search popup list");
 var list_id = await UI_Popup_Select(title, false, false, 
 async function(select)
 {
  var user  = await Core_Api("User_Read", {user_id:operator_id, options:{fields:"marketing_list"}});
  var list  = user["marketing_list"];
  var lists = await Core_Api("Marketing_Lists_List", {}); 
  await Marketing_Lists_ToSelect(lists, select, {selected:list, sections:true});
 });
   
 if(!list_id) return;
  
 if(Module_Page_Get() != "call") await Module_Page_Set("call");
  
 await Core_Api("Marketing_Lead_New", {phone, list_id, operator_id}); 
 await Marketing_Call_Next();
 await Marketing_Call();
}






function Marketing_Leads_FieldType(string)
{
 // PHONE?
 if(String_Is_Number(string) && (string.length >=9))
 {
  return "phone";
 }

 // EMAIL?   
 if(string.includes("@"))
 {
  return "email";
 }

 // CODE?
 var parts = string.split("-");
 if((parts.length == 2) && (String_Is_Number(parts[1])))
 {
  return "code";
 }

 // TEXT (NAME OR NOTES)
 return "text";
}




async function Marketing_Leads_SearchPopup(fields = "student_id,name", count = 100, order = "id")
{
 var promise = new Promise((resolve, reject) =>
 {
  var title   = UI_Language_String("marketing/popups", "search lead title");
  var text    = UI_Language_String("marketing/popups", "search lead button");
  
  var content = UI_Element_Create("marketing/popup-select-search", {}, {language:"marketing/popups"});
  var table   = false;
  
  // DEBOUNCEABLE SEARCH FUNCTION
  var update_timeout = false;
  
  function update()
  {
   if(update_timeout) clearTimeout(update_timeout);
   
   update_timeout = setTimeout(
   async function()
   {
	var search =
	{
	 fields,
	 count,
	 order
	}
	
	// GET OTHER SEARCH VALUES FROM THE POPUP
	for(var field of ["name", "email", "phone_mobile", "student_id"]) search[field] = UI_Element_Find(content, field).value;	

    var users       = await Core_Api("Marketing_Leads_Search", {search});
	
	var tablefields = {};
	for(var field of fields.split(",")) tablefields[field] = true;
	table     = UI_Table_Data(users, tablefields, "users/table-fields");
	
    var display = UI_Element_Find(content, "users");
	display.innerHTML = "";
	display.appendChild(table);
  
	update_timeout = false;
   }, 1000);
  }
  
 
  // FIELDS
  for(var field of ["name", "email", "phone_mobile", "student_id"])
  {
   var element  = UI_Element_Find(content, field);
    
   element.onkeypress  = update;
   //element.onblur      = update;
  }
 
  
  var onclick = 
  function(popup)
  {
   UI_Popup_Close(popup);
   
   var row = Document_Element_GetObject(table, "selected-row");
   if(row)
   {
	var user = Document_Element_GetObject(row, "item");
   }
   else
   {
	var user = false;
   }
   
   resolve(user);
  }


  var onescape =
  function()
  {
   resolve(false);
  }
 
  UI_Popup_Create({title, content}, [{text, onclick}], "flexi", {escape:true, open:true, onescape});  
 });
 
 return promise;
}
