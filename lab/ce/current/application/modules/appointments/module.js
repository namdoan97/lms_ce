// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                   A P P O I N T M E N T S                                      //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//

async function Appointments_OnLoad(module, data)
{
 // SET BY URL?
 var date = Client_Location_Parameter("date");
 
 // SET IN STATE?
 if(!date) var date = Core_State_Get("appointments", "date", Date_Portion(Date_Now(), "date-only"))
 
 // HANDLERS
 await Appointments_LoadHandlers();
 
 // UPDATE STATE
 Core_State_Set("appointments", "date", date);
 
 // CENTER SELECTOR
 var select = UI_Element_Find(module, "appointments-center");
 
 var scope  = User_Config("appointments-scope");
 switch(scope)
 {
  case "all":
  break;
  
  case "center":
	Document_Element_Disable(select, "style-disabled");
  break;
  
  case "user":
	select.style.display = "none";
  break;
 }	 

 
}



async function Appointments_OnShow(module, data)
{
 // CONTROLS
 UI_Element_Find(module, "nav-goto").onclick   = Appointments_Navigation_GoTo;
 UI_Element_Find(module, "nav-prev").onclick   = Appointments_Navigation_Prev;
 UI_Element_Find(module, "nav-next").onclick   = Appointments_Navigation_Next;
 UI_Element_Find(module, "nav-update").onclick = Appointments_Navigation_Update;
 UI_Element_Find(module, "nav-search").onclick = Appointments_Navigation_Search;
 
 
 // CENTERS
 var select       = UI_Element_Find(module, "appointments-center");
 select.innerHTML = "";
 
 var centers = Centers_List();
 for(var center in centers)
 {  
  Document_Select_AddOption(select, Centers_Name(center), center);
 }
 select.value    = Client_Location_Parameter("view-center") || Core_State_Get("appointments", "view-center", User_Center());
 select.onchange = Appointments_SetCenter;
 
 await Appointments_SetCenter(module);
 
 await Appointments_Update(); 
}





async function Appointments_OnUnload()
{
}



async function Appointments_LoadHandlers()
{
 // LOAD ALL POSSIBLE APPOINTMENT HANDLERS
 //var roles = User_Config("appointments-handlers-roles");
 var roles = "sales,tutor,director,desk";
 roles     = roles.split(",");
 
 var users = await Core_Api("Users_List_ByRole", {role:roles, fields:"id,firstname,lastname,center"});
 users     = Array_Catalog_ByField(users, "center");
 
 Core_State_Set("appointments", "handlers", users);
}




async function Appointments_SetCenter()
{
 var module = Module_Body();
 
 var center = UI_Element_Find(module, "appointments-center").value;
 Core_State_Set("appointments", "view-center", center)
 
 await Appointments_Update();
}





// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                          M O R E                                               //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//


async function Appointments_Update(highlight)
{
 var module        = Module_Body();

 var center        = UI_Element_Find(module, "appointments-center").value;		
 var date          = Core_State_Get("appointments", "date");
 var locale        = UI_Language_Current(true);
 
 var element       = UI_Element_Find("appointments-date");
 element.innerHTML = Date_Format(date, locale, "date-long-weekday-noyear").toUpperCase(); 
 
 
 switch(User_Config("appointments-scope"))
 {
  case "user":
	var center_id = Core_State_Get("appointments", "view-center");
	var user_id   = User_Id();
  break;
  
  case "all":
  case "center":
	var center_id = Core_State_Get("appointments", "view-center");
  break;

  default:
	var center_id = false;
	var user_id   = User_Id();
  break;  
 }
 
 
 // GET APPOINTMENTS
 var date_from = Date_Portion(date, "date-only") + "0000";
 var date_to   = Date_Portion(date, "date-only") + "2359";
 var list      = await Core_Api("Appointments_List", {user_id, center_id, date_from, date_to, info:["users"]});
 
 
 Core_State_Set("appointments", "list", list);
 await Appointments_Display(list, {sections:"time", highlight});
}




async function Appointments_Display(list, options = {})
{
 console.log(list);
 console.log(options);
 
 var date          = Core_State_Get("appointments", "date");
 var locale        = UI_Language_Current(true);
 
 // LIST
 var container       = UI_Element_Find("appointments-list");
 container.innerHTML = "";
 
 
 if(User_Can("create-appointments")) var state_new = "enabled"; else var state_new = "disabled";
 
 // CONTAINER MENU
 var menu = UI_Menu_Create("list", 
 {
  new:
  {
   text  : UI_Language_String("appointments/card", "menu new"),
   state : state_new,  
   icon  : "calendar-plus",
   func  : Appointments_Appointment_New
  },
  
  search:
  {
   text  : UI_Language_String("appointments/card", "menu search"),
   state : "enabled",  
   icon  : "magnifying-glass",
   func  : Appointments_Navigation_Search
  } 
 });
 
 UI_Menu_Assign(container, menu);
 
 var highlight_card  = false;
 var section         = "";


 for(var appointment of list)
 {
  
  // SECTION
  switch(options["sections"])
  {
   case "time":
	var app_time = Date_Portion(appointment["date"], "time-only");
    if(app_time != section)
    {   
     section = app_time;
  
     var element = UI_Element_Create("appointments/appointment-section", 
     {
  	  time:Date_Format(appointment["date"], locale, "time-only")
     });
   
     container.appendChild(element); 
	}
   break;
	
   case "dates":
	var app_date = Date_Portion(appointment["date"], "date-only");
	
	if(app_date != section)
    {   
     section = app_date;
  
     var element = UI_Element_Create("appointments/appointment-section", 
     {
  	  time:String_Capitalize_Camel(Date_Format(appointment["date"], locale, "date-time-long"), " ", " ")
     });
   
     container.appendChild(element); 
	}
   break;   
  }
  
  
  
  // APPOINTMENT CARD
  var element = await Appointments_Appointment_Card(appointment, options);
  
  
  // DISPLAY
  container.appendChild(element); 
 }
 
 
 if(highlight_card)
 {
  Document_Element_Animate(highlight_card, "flash 1.5s 1.5");
  highlight_card.scrollIntoView({behavior: "smooth", block: "center"});
 }
}



async function Appointments_Appointment_Card(appointment = {}, options = {})
{
 // CHECK HANDLERS
 if(!Core_State_Get("appointments", "handlers")) await Appointments_LoadHandlers(); 

	
 // COMPILE CARD
 var element = UI_Element_Create("appointments/appointment-card", appointment, {language:"appointments/card"});
 Document_Element_SetData(element, "appointment", appointment["id"]);
 Document_Element_SetData(element, "datetime", appointment["date"]);
  
 if(options["highlight"] && (appointment["id"] == options["highlight"]))
 {
  highlight_card = element;
 }
 
 
 // LOCATION
 if(options["location"])
 {
  UI_Element_Find(element, "location-row").style.display = "flex";
  UI_Element_Find(element, "center").innerHTML           = Centers_Name(appointment["center_id"]);   
  UI_Element_Find(element, "date").innerHTML             = Date_Format(appointment["date"], UI_Language_Current(true), "date-long-weekday-noyear") + ", " + Date_Format(appointment["date"], UI_Language_Current(true), "time-only");
 }
  
  
 // VISITOR
 var text       = UI_Element_Find(element, "visitor");
 text.value     = appointment["visitor"];
 Document_Element_SetData(text, "field", "visitor");
 text.onchange  = Appointments_Appointment_UpdateField;
 
  
 // HANDLER
 var select = UI_Element_Find(element, "handler");
 Document_Select_AddOption(select, UI_Language_String("appointments/card", "handler placeholder"), "");
  
 var all_handlers = Core_State_Get("appointments", "handlers");
 var handlers     = all_handlers[appointment["center_id"]];
 
 for(var handler of handlers)
 {
  var option      = document.createElement("option");
  option["value"] = handler["id"];
  option["text"]  = [handler["firstname"], handler["lastname"]].join(" ");
   
  select.appendChild(option);
 }	  
 
 select.value = appointment["handler_id"];
 Document_Element_SetData(select, "field", "handler_id");
 select.onchange  = Appointments_Appointment_UpdateField;
 
 
 
 // SOURCE
 var select       = UI_Element_Find(element, "source");
 UI_Select_FromDatapage(select, "appointments/sources");
 Document_Select_AddOption(select, "", "");
 select.value     = appointment["source"];
 Document_Element_SetData(select, "field", "source");
 select.onchange  = Appointments_Appointment_UpdateField;
  
 // OUTCOME
 var select       = UI_Element_Find(element, "outcome");
 UI_Select_FromDatapage(select, "appointments/outcomes");
 Document_Select_AddOption(select, "", "");
 select.value     = appointment["outcome"];
 Document_Element_SetData(select, "field", "outcome");
 select.onchange  = Appointments_Appointment_UpdateField;
  
  
 // CREATOR (OPTIONAL)
 if(User_Flag("appointments-view-extra", "creator"))
 {
  var user = Safe_Get(appointment, ["creator_info"], {});
  var name = [user["firstname"] || "", user["lastname"] || ""].join(" ");
  UI_Element_Find(element, "creator-name").innerHTML = name;
  
  UI_Element_Find(element, "creator").style.display = "flex";
 } 
  
  
 // PHONE
 var text       = UI_Element_Find(element, "phone");
 text.value     = appointment["phone"];
 Document_Element_SetData(text, "field", "phone");
 text.onchange  = Appointments_Appointment_UpdateField;
  
 // EMAIL
 var text       = UI_Element_Find(element, "email");
 Document_Element_SetData(text, "field", "email");
 text.value     = appointment["email"];
 text.onchange  = Appointments_Appointment_UpdateField;
  
 // TEXT
 var text       = UI_Element_Find(element, "text");
 Document_Element_SetData(text, "field", "text");
 text.value     = appointment["text"];
 text.onchange  = Appointments_Appointment_UpdateField;
 
 // NOTES
 var text       = UI_Element_Find(element, "notes");
 Document_Element_SetData(text, "field", "notes");
 text.value     = appointment["notes"];
 text.onchange  = Appointments_Appointment_UpdateField;
  
  
 // HIDE SECTIONS BASED ON ROLE
 var sections = User_Config("appointments-sections-hide") || "";
 sections = sections.split(",");
 
 for(var section of sections)
 {
  var div = UI_Element_Find(element, "section-" + section);
  if(div) div.style.display = "none";
 } 
 
  
  
 // ASSIGN MENU
 var items = [];
  
 var item        = {};
 item["text"]    = UI_Language_String("appointments/card", "menu delete");
 item["state"]   = "enabled";
 item["icon"]    = "trash-can";
 item["func"]    = Appointments_Appointment_Delete;
 items["delete"] = item;
  
 var item        = {};
 item["text"]    = UI_Language_String("appointments/card", "menu move");
 item["state"]   = "enabled";
 item["icon"]    = "share-from-square";
 item["func"]    = Appointments_Appointment_Move;
 items["move"] = item;
  
 var menu  = UI_Menu_Create("card", items);
 UI_Menu_Assign(element, menu);
  
 return element;
}






async function Appointments_Appointment_New(item)
{
 var popup   = false;
 var content = false;
 
 // NEW APPOINTMENT
 var button = 
 {
  text:   UI_Language_String("appointments/popups", "new button create"),
  onclick:
  async function()
  {
   newdate        = Datetime_From_Input(UI_Element_Find(content, "datetime").value);
   var creator_id = User_Id();
   var user_id    = User_Id
   var center_id  = UI_Element_Find(content, "center").value;
   
   var id         = await Core_Api("Appointments_Appointment_New", {date:newdate, creator_id, user_id, center_id});
  
   Core_State_Set("appointments", "date", newdate);
   await Appointments_Update(id);
   
   await UI_Popup_Close(popup);
  }
 }  
  
 var title     = UI_Language_String("appointments/popups", "new title");
 var picture   = Resources_URL("images/cover-booking.png");

 content       = UI_Element_Create("appointments/popup-new");
 
 var control   = UI_Element_Find(content, "datetime");
 control.value = Datetime_To_Input(Core_State_Get("appointments", ["date"]) || Date_Now());
 
 var control   = UI_Element_Find(content, "center");
 Centers_To_Select(control);
 control.value = Core_State_Get("appointments", ["view-center"]) || User_Center();
 if(User_Config("appointments-centers") != "all") control.style.display = "none";

 popup  =  await UI_Popup_Create({title, picture, content}, [button], undefined, {escape:true, open:false});

 await UI_Popup_Show(popup);
 
 //var newdate  = await UI_Popup_DateTime(Date_Now(), title, undefined, button, picture);
}



async function Appointments_Appointment_Delete(item)
{
 // MENU ITEM --> MENU --> SOURCE CARD --> ID
 var menu = Document_Element_GetObject(item, "menu");
 var card = menu["source-parent"];
 var id   = Document_Element_GetData(card, "appointment");
 
 var title    = UI_Language_String("appointments/popups", "delete title");
 var subtitle = UI_Language_String("appointments/popups", "delete subtitle");
 var picture  = Resources_URL("images/cover-alert.jpg");
 var confirm = await UI_Popup_Confirm(title, subtitle, picture);
 
 console.log(card);
 if(confirm)
 {
  await Core_Api("Appointments_Appointment_Delete", {id});
  
  await Document_Element_Animate(card, "zoomOut 1.5s 1");
  card.remove();
 }
}





async function Appointments_Appointment_Move(item)
{
 // MENU ITEM --> MENU --> SOURCE CARD --> DATE & ID
 var menu = Document_Element_GetObject(item, "menu");
 var card = menu["source-parent"];
 var date = Document_Element_GetData(card, "datetime");
 var id   = Document_Element_GetData(card, "appointment");
 
 var title    = UI_Language_String("appointments/popups", "move title");
 var subtitle = UI_Language_String("appointments/popups", "move text");
 var button   = UI_Language_String("appointments/popups", "move button move");
 var picture  = Resources_URL("images/cover-booking.png");
 
 var newdate  = await UI_Popup_DateTime(Date_Now(), title, subtitle, button, picture);
 if(newdate) 
 {
  newdate = Date_To_UTC(newdate);
  newdate = Date_Portion(newdate, "no-seconds");
  
  // MOVE ITEM TO NEW DATE
  await Core_Api("Appointments_Appointment_Set", {id, field:"date", value:newdate});
  
  // RELOAD WITH NEW DATE AND FLASH ITEM
  Core_State_Set("appointments", "date", Date_Portion(newdate, "date-only"));
  await Appointments_Update(id);	   
 } 
}




async function Appointments_Appointment_UpdateField(event)
{
 var element = event.currentTarget;
 var field   = Document_Element_GetData(element, "field");
 var value   = element.value;
 var card    = Document_Element_FindParent(element, "appointment");
 var id      = Document_Element_GetData(card, "appointment");
 
 await Core_Api("Appointments_Appointment_Set", {id, field, value});
}








// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                     N A V I G A T I O N                                        //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//



async function Appointments_Navigation_Update(event)
{
 await Appointments_Update();
}




async function Appointments_Navigation_GoTo(event)
{
 var element  = event.currentTarget;
 var position = Document_Element_Corner(element, "center");
 
 var date = await Client_Picker("date", position);
 if(date)
 {
  date = Date_From_Input(date);
  
  Core_State_Set("appointments", "date", date);
  await Appointments_Update();	  
 }
}



async function Appointments_Navigation_Next(event)
{
 var date = Core_State_Get("appointments", "date");	
 date     = Date_Add_Days(date, 1);
 
 Core_State_Set("appointments", "date", date);
 await Appointments_Update();	
}



async function Appointments_Navigation_Prev(event)
{
 var date = Core_State_Get("appointments", "date");	
 date     = Date_Add_Days(date, -1);
 
 Core_State_Set("appointments", "date", date);
 await Appointments_Update();	
}



async function Appointments_Navigation_Search(event)
{
 var title    = UI_Language_String("appointments/popups", "search title");
 var subtitle = UI_Language_String("appointments/popups", "search subtitle", {days:30});
 var picture  = Resources_URL("images/cover-booking.png");
 var search   = await UI_Popup_Input(title, subtitle, picture);
 if(!search) return;
  
 var date_from = Date_Portion(Date_Add_Days(Date_Now(), -30), "date-only");
 var date_to   = Date_Portion(Date_Add_Days(Date_Now(), +30), "date-only");
 
 switch(User_Config("appointments-scope"))
 {
  case "user":
	var center_id = false;
	var user_id   = User_Id();
  break;
  
  case "all":
  case "center":
	var center_id = Core_State_Get("appointments", "view-center");
  break;

  default:
	var center_id = false;
	var user_id   = User_Id();
  break;  
 }
 
 var list      = await Core_Api("Appointments_Search", {search, center_id, user_id, date_from, date_to});
  
 // NO RESULTS? 
 if(!list || list.length == 0)
 {
  var title    = UI_Language_String("appointments/popups", "noresults title");
  var subtitle = UI_Language_String("appointments/popups", "noresults subtitle");
  var picture  = Resources_URL("images/cover-deny.png");
 
  await UI_Popup_Alert(title, subtitle, picture);
  
  return;	 
 }
  
 Core_State_Set("appointments", "list", list);
 await Appointments_Display(list, {sections:"dates"}); 
}