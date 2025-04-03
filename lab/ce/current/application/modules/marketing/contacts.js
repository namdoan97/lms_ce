// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                    C O N T A C T S                                             //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//



async function Marketing_Contact_DisplayCase(id, options = {})
{
 Core_State_Set("marketing", "displaying-case", true);
 var customer_info = Safe_Get(options, "customer", false);  
 
 if(typeof(id) != "object")
 {
  var data = await Core_Api("Marketing_Contact_Read", {id, case:true}); 
 }
 console.log("case", data);
 
 var case_id = id;
 Core_State_Set("marketing", "display-contact-id", id);
 Core_State_Set("marketing", "display-contact-data", data);
 

 
 // MAIN FORM
 var panel  = UI_Element_Create("marketing/case-form", {}, {language:"marketing/case"});
 Document_Element_SetData(panel, "contact_id", id);


 // CUSTOMER INFO?
 if(customer_info)
 {
  UI_Element_Find(panel, "section-customer").style.display = "flex";
  
  var lead = data["lead"] || {};
  for(var field of ["student_id", "name", "phone_mobile", "email"])
  {
   UI_Element_Find(panel, field).value = lead[field];
  }
 }
 
 
 // CENTER
 /*
 var select  = UI_Element_Find(panel, "center_id");
 Document_Select_AddOption(select, "", "");
 var centers = Centers_List();
 for(var id in centers)
 {
  Document_Select_AddOption(select, id, centers[id]["name"]);
 }
 select.value = data["center_id"];
 select.onchange = Call_SetField;
 */
 
 // ID
 var input      = UI_Element_Find(panel, "id");
 input.value    = data["id"];
 
 // PRODUCT
 var select      = UI_Element_Find(panel, "product");
 Marketing_Contact_SelectData(select, "product");
 select.onchange =
 async function(event)
 {   
  var element = event.srcElement;
  
  // PROGRAM
  var select  = UI_Element_Find(panel, "program");
  UI_Select_FromConfig(select, "programs-" + element.value, true);
  
  select.value = data["program"]; 
  
  select.onchange = Marketing_Contact_SetField;
  
  Marketing_Contact_SetField({srcElement:element});
 }
 select.value = data["product"]; 
 Document_Event_Trigger(select, "change");


 // COURSE
 var input = UI_Element_Find(panel, "course");
 input.value = data["course"];
 input.onchange = Marketing_Contact_SetField;
 
 
 // CALL TYPE
 var select = UI_Element_Find(panel, "call_type");
 Marketing_Contact_SelectData(select, "call_type");
  
 select.onchange =
 async function(event)
 { 
  var element = event.srcElement;
  var select  = UI_Element_Find(panel, "call_reason");
  
  var reasons   = Core_Data_Page("marketing/call_reason");
  
  select.innerHTML = "";
  for(var key in reasons)
  {
   if(reasons[key]["type"] == element.value)
   {
    var text = UI_Language_Object(reasons[key]);
    Document_Select_AddOption(select, text, key);
   }
  }

  select.value    = data["call_reason"];
  select.onchange = Marketing_Contact_SetField;
  
  Marketing_Contact_SetField({srcElement:element});
 }

 select.value = data["call_type"]; 
 Document_Event_Trigger(select, "change");



 // INQUIRY CATEGORY (DEPARTMENTS)
 var select = UI_Element_Find(panel, "inquiry_department");
 UI_Select_FromConfig(select, "departments", true);
 
 select.onchange =
 async function(event)
 { 
  var element = event.srcElement;
  var select  = UI_Element_Find(panel, "inquiry_topic");
  
  var inquiries   = Core_Data_Page("marketing/inquiry_topic");
  
  select.innerHTML = "";
  for(var key in inquiries)
  {
   if(inquiries[key]["department"] == element.value)
   {
    var text = UI_Language_Object(inquiries[key]);
    Document_Select_AddOption(select, text, key);
   }
  }

  select.value    = data["inquiry_topic"];
  select.onchange = Marketing_Contact_SetField;
  
  Marketing_Contact_SetField({srcElement:element});
 }
 select.value = data["inquiry_department"]; 
 Document_Event_Trigger(select, "change");

 

 // NOTES
 var select = UI_Element_Find(panel, "notes");
 Marketing_Contact_SelectData(select, "notes");
 select.value = data["notes"]; 
 select.onchange = Marketing_Contact_SetField;
 
	

 
 // SURVEY	
 var questions = Core_Data_Page("marketing/case-questions");
 var container = UI_Element_Find(panel, "panel-questions");
 
 for(var id in questions)
 {
  var question   = questions[id];
  question["id"] = id;
  
  var text       = UI_Language_Object(question);
  var element    = UI_Element_Create("marketing/case-question-item", {id, text});  
  var select     = UI_Element_Find(element, "answer");
  
  Document_Element_SetObject(select, "question", question);
  Document_Element_SetData(select, "case_id", case_id);
  Document_Select_AddOption(select, "", "");
  

  var scores = Core_Data_Page("marketing/case-question-" + question["type"]);
  for(var key in scores)
  {
   var text  = UI_Language_Object(scores[key]);
   var value = scores[key]["score"];
   
   Document_Select_AddOption(select, text, value);
  }
  
  select.value    = Safe_Get(data, ["survey", id, "answer"], "");
  select.onchange = Marketing_Contact_CaseAnswer; 
 
  container.appendChild(element);
 }
 
 
 
 // CASE	
 var container = UI_Element_Find(panel, "panel-case");
 Document_Element_SetData(container, "caseid", case_id);
 Core_State_Set("marketing", "display-contact-container", container);
 
 await Marketing_Contact_DisplayActions(container, data);

 
 UI_Element_Find(panel, "followup-item-add").onclick = Marketing_Contact_RecordAction;
 
 var icon     = UI_Element_Find(panel, "link-case");
 Document_Element_SetData(icon, "caseid", case_id);
 icon.onclick = Marketing_Contact_CopyLink;
 
 Core_State_Set("marketing", "displaying-case", false);
 return panel;
}



async function Marketing_Contact_CopyLink(event)
{ 
 var element       = event.srcElement;
 var url           = Client_Location_Current() + "?autologin=1&framework=null&module=embed&page=casefollowup";
 
 var case_id       = Document_Element_GetData(element, "caseid", false);
 if(case_id) url   = url + "&case_id=" + case_id;
  
 var action_id    = Document_Element_GetData(element, "actionid", false);
 if(action_id) url = url + "&action_id=" + action_id;
  
 navigator.clipboard.writeText(url);
 var title = UI_Language_String("marketing/popups", "link copied title");
 await UI_Popup_Intermission(title, undefined, undefined, 1, {autoclose:true});
  
 return url;
}
  



async function Marketing_Contact_DisplayActions(container, data)
{ 
 container.innerHTML = "";
 var case_id = Document_Element_GetData(container, "caseid");
 
 var actions = Safe_Get(data, ["actions"], []);
 for(var item of actions)
 {  
  var element                                   = UI_Element_Create("marketing/case-action-item", {});  
  UI_Element_Find(element, "date").innerHTML    = UI_Language_Date(item["date"], "date-short");
  UI_Element_Find(element, "time").innerHTML    = UI_Language_Date(item["date"], "time-only");
  UI_Element_Find(element, "user").innerHTML    = item["user"];
  UI_Element_Find(element, "dept").innerHTML    = "(" + UI_Language_String("marketing/inquiry_department", item["department"]) + ")"; 
  UI_Element_Find(element, "action").value      = item["action"];
  
  var outcome                   = UI_Element_Find(element, "outcome");
  outcome.innerHTML             = UI_Language_String("marketing/case-outcomes", item["outcome"]); 
  outcome.style.backgroundColor = Document_CSS_Get(Core_Data_Value("marketing/case-outcomes", item["outcome"], "color", "transparent"));
 
  var icon = UI_Element_Find(element, "delete");
  Document_Element_SetData(icon, "actionid", item["id"]);
  icon.onclick = Marketing_Contact_DeleteAction;  
  
  var icon     = UI_Element_Find(element,    "link");
  Document_Element_SetData(icon, "caseid",   case_id);
  Document_Element_SetData(icon, "actionid", item["id"]);
  icon.onclick = Marketing_Contact_CopyLink;
  
  Document_Element_SetData(element, "actionid", item["id"]);
 
  container.appendChild(element);
 }

}



async function Marketing_Contact_RecordAction(event)
{
 var id      = Core_State_Get("marketing", "display-contact-id");
 var data    = Core_State_Get("marketing", "display-contact-data", {});
	
 var content = UI_Element_Create("marketing/popup-case-addaction", {}, {language:"marketing/case"});
 var title   = UI_Language_String("marketing/case", "popup addaction title");
 var button  = 
 {
  text    : UI_Language_String("marketing/case", "popup addaction record"),
  onclick : 
  async function()
  {
   // RECORD ACTION
   var user       = UI_Element_Find(popup, "user").value;
   var department = UI_Element_Find(popup, "department").value;
   var action     = UI_Element_Find(popup, "action").value;
   var outcome    = UI_Element_Find(popup, "outcome").value;
   
   var action_id  = await Core_Api("Marketing_Contact_RecordAction", {id, user, department, action, outcome});
   
   
   // SEND EMAIL
   var data = Core_State_Get("marketing", "display-contact-data", {});
   var info = [];
   info.push(Safe_Get(data, ["lead", "student_id"], ""));
   info.push(Safe_Get(data, ["lead", "name"], ""));
   info.push(Safe_Get(data, ["center"], ""));
   info = info.join(" ");
   console.log(info);
	  
   var ceNotify = Core_Config(["centers",Safe_Get(data, ["center"], ""),"ce-notify"]);

   //var to       = "thanhtran@ilavietnam.edu.vn"; 
   var to       = ceNotify; 
   var from     = Module_Config("marketing", "mailer-name") + ";" + Module_Config("marketing", "mailer-email");
   var subject  = String_Variables_Set(Module_Config("marketing", "case-notify-subject"), {info});
   var template = Module_Config("marketing", "case-notify-template");
   var data     = {};
   data["url"]  = Client_Location_Current() + "?autologin=1&framework=null&module=embed&page=casefollowup&case_id=" + id + "&action_id=" + action_id;
   
   var mailsent = await Core_Service("sendmail", {from, to, subject, template, data});
   console.log(mailsent);
   
   
   


   // RELOAD CONTACT 
   var container = Core_State_Get("marketing", "display-contact-container");
   var data      = await Core_Api("Marketing_Contact_Read", {id, case:true}); 
   await Marketing_Contact_DisplayActions(container, data);
     
   // CLOSE
   await UI_Popup_Close(popup);
   
   Core_State_Set("marketing",["follow-up","action-default"],false);
   
   // FIND THE NEW ITEM AND FLASH IT
   var element = Document_Element_FindChild(container, "actionid", action_id, ["recurse"]);
   Document_Element_Animate(element, "flash 1s 3");
  }
 }

 var escape = () => {
	var action = UI_Element_Find(popup, "action").value;
	Core_State_Set("marketing",["follow-up","action-default"],action);
	UI_Popup_Close(popup);
 }

 popup = await UI_Popup_Create({content, title}, [button], "flexi", {open:false, escape});
 
 // DEFAULT USERNAME
 var user = await User_Read(true);
 var name = [user["firstname"], user["lastname"]].join();
 UI_Element_Find(popup, "user").value = name;
 
 // DEPARTMENT BY ROLE
 var department = User_Config("department");
 UI_Element_Find(popup, "department").value = department;
 
 // DEPARTMENT SELECT
 var select   = UI_Element_Find(popup, "department");
 Document_Select_AddOption(select, "", "");
 UI_Select_FromConfig(select, "departments", true);
 
 // ACTION 
 var action = UI_Element_Find(popup,"action");
 var actionValue = Core_State_Get("marketing",["follow-up","action-default"],false);
 if(actionValue) action.value = actionValue;
 
 // OUTCOME SELECT
 var select   = UI_Element_Find(popup, "outcome");
 UI_Select_FromDatapage(select, "marketing/case-outcomes");

 await UI_Popup_Show(popup);
}






async function Marketing_Contact_DeleteAction(event)
{
 var element = event.srcElement;
 var id      = Document_Element_GetData(element, "actionid");
 var caseid  = Core_State_Get("marketing", "display-contact-id");
	
 var title   = UI_Language_String("marketing/case", "popup deleteaction title");
 var text    = UI_Language_String("marketing/case", "popup deleteaction text");
 var confirm = await UI_Popup_Confirm(title, text);
 
 if(!confirm) return;
 
 // DELETE
 await Core_Api("Marketing_Contact_DeleteAction", {id});
 
 // RELOAD CONTACT 
 var container = Core_State_Get("marketing", "display-contact-container");
 var data      = await Core_Api("Marketing_Contact_Read", {id:caseid, case:true}); 
 await Marketing_Contact_DisplayActions(container, data);
}








function Marketing_Contact_SelectData(select, page)
{ 
 select.innerHTML = "";
 
 var items = Core_Data_Page("marketing/" + page);
 var keys  = Object.keys(items);
   
 if(keys.length > 0)
 {
  Document_Select_AddOption(select, "", "");
	
  for(var key of keys)
  {
   var text = UI_Language_Object(items[key]);
   Document_Select_AddOption(select, text, key);
  }
 }
}




async function Marketing_Contact_Card(contact)
{
 var element = UI_Element_Create("marketing/contact-case-card", contact, {language:"marketing/case"});
 
 for(var field of ["name", "student_id"])
 {
  var input   = UI_Element_Find(element, field);
  input.value = Safe_Get(contact, ["lead", field], "");
 }
 
 
 for(var field of ["notes"])
 {
  var input   = UI_Element_Find(element, field);
  input.value = contact[field] || "";
 }
  
  
 for(var field of ["call_type", "call_reason", "inquiry_topic"])
 {
  var data    = Core_Data_Page("marketing/" + field);
  var item    = data[contact[field]] || {};
  
  var input   = UI_Element_Find(element, field);
  input.value = UI_Language_Object(item);
 }

 var data = Core_Config("departments");
 var item = data[contact["inquiry_department"]] || {};
 
 var input = UI_Element_Find(element, "inquiry_department");
 input.value = UI_Language_Object(item);
 
 return element;
}



async function Marketing_Contact_SetField(event)
{
 // DO NOT STORE DATA IF DISPLAYING CASE (NOT TRIGGERED BY USER)
 if(Core_State_Get("marketing", "displaying-case")) return;
	
	
 var element   = event.srcElement;
 var field     = Document_Element_GetData(element, "uid");
 
 var parent    = Document_Element_FindParent(element, "contact_id");
 var id        = Document_Element_GetData(parent, "contact_id");
 
 await Core_Api("Marketing_Contact_Set", {id, field, value:element.value});
}



async function Marketing_Contact_CaseAnswer(event)
{
 var element    = event.srcElement;
 var data       = Document_Element_GetObject(element, "question");
 
 var parent     = Document_Element_FindParent(element, "contact_id");
 var contact_id = Document_Element_GetData(parent, "contact_id");
 
 var question   = data["id"];
 var department = data["dept"];
 var answer     = element.value;
   
 await Core_Api("Marketing_Survey_Set", {contact_id, question, department, answer});
}



async function Marketing_Contacts_CasePopup(id)
{
 var promise = new Promise(async(resolve, reject) =>
 {
  var display = await Marketing_Contact_DisplayCase(id);
 
  var content = UI_Element_Create("marketing/popup-case");
  content.appendChild(display);
  
  var onclose = 
  async function()
  {
   resolve();
  }
 
  var popup = await UI_Popup_Create({content}, [], "flexi", {open:false, escape:true, onclose});
  await UI_Popup_Show(popup);
 });

 return promise; 
}