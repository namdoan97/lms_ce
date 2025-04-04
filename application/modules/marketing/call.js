// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                          C A L L                                               //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//

async function Marketing_Call(event)
{	
 // SET UP CONTROLS
 var page  = Core_State_Get("marketing", "submodule"); 

 await Marketing_Call_DisplayLead(-1, UI_Element_Find(page, "panel-call")); 
}





  
async function Marketing_Call_DisplayRecalls(operator_id, container, options = {})
{
 if(!operator_id) var operator_id = User_Id();
	 
 var recalls = await Core_Api("Marketing_Call_ListRecalls", {operator_id, leads:true});
 Core_State_Set("marketing", ["call", "recalls"], recalls);
 
 var table = UI_Table("standard", {seamless:true, fixed:true, xselectable:true});
 var n     = 0;
 for(var recall of recalls)
 {
  var date = Safe_Get(recall, ["date_recall"], Date_Now());
  
  // ROW
  var row = UI_Table_Row(table, {transparent:true});
  
  if(Numbers_Is_Odd(n))
  {
   row.style.backgroundColor = "var(--color-light)";
  }
  else
  {
   row.style.backgroundColor = "var(--color-medium)";
  }
  n++;
  
  Document_CSS_SetClass(row, "style-clickable");
  Document_Element_SetData(row, "lead", recall["lead_id"]);
  
  
  // MANUAL RECALL
  if(Safe_Get(options, "openrecalls"))
  {
   row.onclick =
   async function(event)
   {
    var element = event.srcElement;
    element     = Document_Element_FindParent(element, "lead");
    
    var id      = Document_Element_GetData(element, "lead");
    console.log(id);
    
    var title   = UI_Language_String("marketing/call", "recall popup title"); 
    var text    = UI_Language_String("marketing/call", "recall popup text"); 
    
	var confirm = await UI_Popup_Confirm(title, text);
	if(!confirm) return;
   
    var lead_id = id;
    var operator_id = User_Id();
 
    await Core_Api("Marketing_Call_AssignLead", {operator_id, lead_id});
    await Marketing_Call_Next();
	await Marketing_Call();
   }
  }
  else
  {
   // CUSTOM ONCLICK ?
   if(!onclick) row.onclick = Safe_Get(options, "onclick");
  }
 
   
 
  
  // CENTER
  var cell             = UI_Table_Cell(row);
  cell.innerHTML       = Centers_Name(Safe_Get(recall, ["lead", "center"]));
  cell.style.textAlign = "left";
  
  // DATE
  var cell             = UI_Table_Cell(row);
  cell.innerHTML       = String_Capitalize_Camel(Date_Format(date, UI_Language_Current(true), "date-long-weekday-noyear"));
  cell.style.textAlign = "left";
  
  // TIME
  var cell              = UI_Table_Cell(row);
  cell.style.textAlign  = "left";
  cell.innerHTML        = Date_Format(date, UI_Language_Current(true), "time-only");
  
  // NAME
  var cell = UI_Table_Cell(row);
  cell.innerHTML = Safe_Get(recall, ["lead", "name"], "");
  
  // NOTES
  var cell             = UI_Table_Cell(row);
  cell.innerHTML       = Safe_Get(recall, ["notes"], "");
  cell.style.textAlign = "justify";
 }
 
 container.innerHTML = "";
 container.appendChild(table);
}



function Marketing_Call_DisplayContacts(lead)
{
 var outcomes = Core_Data_Page("marketing/outcomes");
 var n        = 0;
 var table    = UI_Table("standard", {seamless:true, fixed:true});
 
 for(var contact of Safe_Get(lead, ["contacts"], []))
 { 
  var row = UI_Table_Row(table, {transparent:true});
  //console.log(contact);
 
  if(contact["outcome"] == "eng")
  {
   row.style.backgroundColor = "var(--color-good)";
   row.style.color           = "var(--color-white)";
  }
  else
  {
   if(Numbers_Is_Odd(n))
   {
    row.style.backgroundColor = "var(--color-light)";
   }
   else
   {
    row.style.backgroundColor = "var(--color-medium)";
   }
  }
  
  // CONTACT OUTCOME
  var cell                   = UI_Table_Cell(row);
  cell.innerHTML             = UI_Language_Object(outcomes[contact["outcome"]]);
  cell.style.backgroundColor = "var(--" + outcomes[contact["outcome"]]["color"] + ")";
  cell.style.color           = contact["outcome"]["text"] || "";
  cell.style.textAlign       = "left";
  
  
  // CONTACT DATE
  var cell             = UI_Table_Cell(row);
  cell.innerHTML       = Date_Format(contact["date_call"], UI_Language_Current(true), "date-long-weekday");
  cell.style.textAlign = "left";
  
  // CONTACT TIME
  var cell             = UI_Table_Cell(row);
  cell.innerHTML       = Date_Format(contact["date_call"], UI_Language_Current(true), "time-only");
  cell.style.textAlign = "left";
  
  // CONTACT DURATION
  var cell             = UI_Table_Cell(row);
  cell.innerHTML       = Time_Format_Period((contact["duration"] / 60).toFixed(1), UI_Language_Current(true)); 
  cell.style.textAlign = "left";
 
  // CONTACT NOTES  
  var cell             = UI_Table_Cell(row);
  var wrapper          = UI_Element_Create("marketing/lead-contact-notes");
  wrapper.innerHTML    = contact["notes"] || "...";
  wrapper.title        = contact["notes"] || "";
  //cell.style.textAlign = "left";
  //cell.style.overflow  = "ellipsis";
  cell.appendChild(wrapper); 
 
  // CASE ICONS  
  var cell    = UI_Table_Cell(row);
  var wrapper = UI_Element_Create("marketing/lead-contact-links");
  cell.appendChild(wrapper);
	
  
  // ICONS: DISPLAY CASE
  var icon    = UI_Element_Find(wrapper, "case");
  
  if(contact["outcome"] == "eng") 
  {
   Document_Element_SetData(icon, "uid", "case-" + contact["id"]);
   Document_Element_SetObject(icon, "contact", contact);
  
   icon.onclick =
   async function(event)
   {
    var element = event.srcElement;
    var contact = Document_Element_GetObject(element, "contact"); console.log(contact);
    var appid   = contact["id"]; 
    
    var display         = await Marketing_Contact_DisplayCase(contact["id"]);  console.log(display);
	var container       = UI_Element_Find("more-content");
	container.innerHTML = "";
    container.appendChild(display);
   }
  }
  else
  {
   icon.style.display = "none";
  }
  
  
  //if(contact["date_recall"]) 
  
  n++;
 }
 
 return table;
}




async function Marketing_Call_DisplayLead(operator_id, container, options = {data:true, history:true, outcome:true})
{
 var outcomes = Core_Data_Page("marketing/outcomes");
 
 var mode     = Safe_Get(options, ["mode"],    "operator");
 var lead_id  = Safe_Get(options, ["lead_id"], -1);
 
 var lead     = await Core_Api("Marketing_Call_GetLead", {operator_id, options:{full:true, mode, lead_id}});
 
 // NO LEAD
 if(!lead)
 {
  var text    = UI_Language_String("marketing/call", "message noleads");
  var message = UI_Element_Create("core/message-center-big", {text});
	 
  container.innerHTML = "";
  container.appendChild(message);
  
  return;
 }
 
 lead["time"]      = new Date().getTime();
 lead["date_call"] = Date_Now();
 
 console.log("lead");
 console.log(lead);
 
 var element = UI_Element_Create("marketing/lead-call", {}, {language:"marketing/lead"});
 
  // RECALL?
 if(lead["reason"] == "recall")
 {
  console.log("recall");
  UI_Element_Find(element, "warning-text").innerHTML = UI_Language_String("marketing/lead", "warning recall");
  UI_Element_Find(element, "warning-icon").className = "fas fa-exclamation-triangle";
  
  UI_Element_Find(element, "warning-body").style.backgroundColor = "var(--color-soso)";
  UI_Element_Find(element, "panel-warning").style.display         = "flex";
 }
 
 
 // BASE INFO
 if(options["data"])
 {
  var fields  = ["student_id", "name", "phone_mobile", "center", "course", "email", "province", "city", "postcode", "notes"];
  
  // FIELDS
  for(var field of fields)
  {
   var control   = UI_Element_Find(element, "input-" + field);
   control.value = lead[field];
   
   Document_Element_SetData(control, "field", field);
   Document_Element_SetData(control, "lead_id", lead["id"]);
 
   control.onchange = 
   async function(event)
   {
    var element = event.srcElement;
    
    var id    = Document_Element_GetData(element, "lead_id");
    var field = Document_Element_GetData(element, "field");
    var value = element.value;
    
    Core_Api("Marketing_Lead_Update", {id, field, value});
   }	  
  }
  
 }
 
 
 // CONTACT HISTORY
 var table       = Marketing_Call_DisplayContacts(lead);
 var panel       = UI_Element_Find(element, "panel-contacts"); 
 panel.innerHTML = "";
 panel.appendChild(table);
  
  
  
 // OUTCOMES
 var buttons  = UI_Element_Find(element, "panel-outcomes");

 if(mode == "operator")
 {
  if(options["outcome"])
  {
   for(var key in outcomes)
   {
    var outcome = outcomes[key];
    var button  = UI_Element_Create("marketing/lead-button-outcome");
    
    button.style.backgroundColor            = "var(--" + outcome["color"] + ")"; 
    if(outcome["text"]) button.style.color  = "var(--" + outcome["text"]  + ")";
    
    UI_Element_Find(button, "text").innerHTML = UI_Language_Object(outcome);
    Document_CSS_SetClass(UI_Element_Find(button, "icon"), "fa-" + outcome["icon"]);
    
    Document_Element_SetData(button, "outcome", key);
    Document_Element_SetObject(button, "lead", lead);
    button.onclick = Marketing_Call_SetOutcome;   

    buttons.appendChild(button);
   }
 
  }	   
 }
 else
 {
  buttons.style.display = "none";
 }
 
 container.innerHTML = "";
 container.appendChild(element);
}



function Marketing_Call_DisableButtons()
{
 // DISABLE ALL BUTTONS EXCEPT NEXT
 var panel   = UI_Element_Find("panel-outcomes");
 var buttons = Document_Element_FindChildren(panel, "outcome", undefined, ["recurse"]);
 for(var button of buttons) Document_Element_Disable(button, "style-disabled");
}



async function Marketing_Call_NewContact(lead_id, operator_id = null, outcome, date_call, date_recall, date_nouse, notes = "", duration = null, release = false)
{	
 var contact               = {};
 
 contact["user_id"]        = operator_id;
 contact["lead_id"]        = lead_id;
 contact["date_call"]      = date_call; 
 contact["date_recall"]    = date_recall;
 contact["notes"]          = notes;
 contact["duration"]       = duration;
 contact["outcome"]        = outcome;
 
 var id = await Core_Api("Marketing_Call_NewContact", {contact, release, date_nouse});
 
 console.log(contact);
 console.log(id);
 
 return id;
}








async function Marketing_Call_SetOutcome(event)
{
 var element   = event.srcElement;
 element       = Document_Element_FindParent(element, "outcome");
 
 var outcome   = Document_Element_GetData(element, "outcome", "");
 var lead      = Document_Element_GetObject(element, "lead", {});
 var popup     = false;
 
 var date_call = Date_Portion(lead["date_call"], "no-seconds");
 

 // CANCEL
 var button_cancel =
 { 
  text   : UI_Language_String("core/popups", "button cancel"), 
  onclick: "close" 
 }  
 
 
 // SOME DEFAULTS
 var notes    = ""; 
 var duration = Math.floor((new Date().getTime() - lead["time"]) / 1000);
 
 // COMPOSE POPUP
 var lead_id    = lead["id"];
 var recall     = false;
 
 switch(outcome)
 {	  
  // DENY
  case "no":
    var days    = parseInt(Core_Config(["marketing", outcome, "recall-default-time"], 365));

    var title   = "";
	var text    = UI_Language_String("marketing/popups", "newcontact no text", {days});
	var picture = Resources_URL("images/cover-alert.jpg");
	var confirm = await UI_Popup_Confirm(title, text, picture);
	
	if(!confirm) return;
	
	var date_recall = -1;
	var date_nouse  = Date_Add_Days(Date_Now(), 365 * 10);
	var release     = true;
	
	await Marketing_Call_NewContact(lead["id"], lead["operator_id"], outcome, date_call, date_recall, date_nouse, notes, duration, release);
	
	// NEXT LEAD
	await Marketing_Call_Next();
	await Marketing_Call();
  break;
  
  
  // NEXT
  case "next":
	var title   = "";
	var text    = UI_Language_String("marketing/popups", "newcontact next text");
	var confirm = await UI_Popup_Confirm(title, text);
	
	if(!confirm) return;
	

    var days        = parseInt(Core_Config(["marketing", outcome, "nouse-default-time"], 3));
	var date_nouse  = Date_Add_Days(Date_Now(), days);
	var date_recall = -1;
	var release     = true;  

	await Marketing_Call_NewContact(lead["id"], lead["operator_id"], outcome, date_call, date_recall, date_nouse, notes, duration, release);
	
	// NEXT LEAD
	await Marketing_Call_Next();
	await Marketing_Call();
  break;
  
  
  // RECALL
  case "rec":
    var minutes = Core_Config(["marketing", outcome, "recall-default-time"], 60);
	recall      = Date_Add_Minutes(Date_Now(), minutes);
	
	var title    = "";
	var subtitle = UI_Language_String("marketing/popups", "newcontact rec text");
	var picture  = Resources_URL("images/cover-stopwatch.jpg");
	
	var content = UI_Element_Create("marketing/popup-outcome-rec", {text}, {language:"marketing/popups"});
	
	UI_Element_Find(content, "date").value = Date_To_Input(Date_Now());
	UI_Element_Find(content, "time").value = Date_Portion(Date_Add_Minutes(Date_Now(), minutes), "time-timecode");
	
	// ON CONFIRM
    var button_confirm =
    {
     text    : UI_Language_String("marketing/popups", "newcontact outcome confirm"),
     onclick : 
	 async function()
	 {
	  await UI_Popup_Close(popup);
	  
	  var date        = Date_From_Input(UI_Element_Find(popup, "date").value);
	  var time        = Time_From_Input(UI_Element_Find(popup, "time").value);
	  var notes       = UI_Element_Find(popup, "notes").value;
	   
	  var date_recall = Date_Portion(date, "date-only") + "" + time;
	  var date_nouse  = 0;
	  var release     = false;
	 
	  await Marketing_Call_NewContact(lead["id"], lead["operator_id"], outcome, date_call, date_recall, date_nouse, notes, duration, release);
	
	  // NEXT LEAD
	  await Marketing_Call_Next();
	  await Marketing_Call();
	 }
    }
	
	popup = await UI_Popup_Create({content, picture, subtitle}, [button_cancel, button_confirm], undefined, {open:false, escape:true});
	await UI_Popup_Show(popup);
	
  break;
  
  
  // ENGAGED
  case "eng": 
  
     // RECORD OUTCOME
	 var date_nouse  = Date_Add_Days(Date_Now(), 365);
	 var date_recall = -1;
	 var release     = false;
	 
     Marketing_Call_DisableButtons();
	 var contact_id = await Marketing_Call_NewContact(lead["id"], lead["operator_id"], outcome, date_call, date_recall, date_nouse, "", duration, release);
     
	 // ADD TO CONTACT HISTORY AND AUTOSELECT
     if(!lead["contacts"]) lead["contacts"] = [];
	 lead["contacts"].push(
	 {
	  id:contact_id,
	  user_id:User_Id(),
	  lead_id:lead["id"],
	  date_call:Date_Portion(Date_Now(), "no-seconds"),
	  outcome,
	  duration
	 });
	 
	 // CONTACT HISTORY
	 var table       = Marketing_Call_DisplayContacts(lead);
	 var panel       = UI_Element_Find("panel-contacts"); 
	 panel.innerHTML = "";
	 panel.appendChild(table);
	 
	 var icon = UI_Element_Find(table, "case-" + contact_id);
	 Document_Event_Trigger(icon, "click");
  break;
 }

}






async function Marketing_Call_Next()
{
 var title = UI_Language_String("marketing/popups", "nextcontact title");
 var text  = UI_Language_String("marketing/popups", "nextcontact text");
 
 var popup = await UI_Popup_Intermission(title, text, false, 3, {autoclose:true, template:"flexi"});
}