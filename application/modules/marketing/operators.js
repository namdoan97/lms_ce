// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                    O P E R A TO R S                                            //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//

async function Marketing_Operators(event)
{ 
 // SET UP CONTROLS
 var page = Core_State_Get("marketing", "submodule");
 
 var select  = UI_Element_Find(page, "operators-filter");
 
 // LOAD LISTS
 //await Marketing_Database_ReadLists();
 

 // OPERATORS REPORTING TO YOU
 var list = await Core_Api("Marketing_Operators_ByRole", {roles:["ceoper", "cesuper"]});
 Core_State_Set("marketing", ["operators", "list"], list);
 
 // OPERATORS WORKING ON SPECIFIC CENTERS
 
 // OPERATORS WORKING 
 
 // CENTERS
 var centers = Centers_List(); 
 var select  = UI_Element_Find(page, "operators-center");
 for(var center in centers)
 {
  var option   = new Option();
  option.text  = centers[center]["name"].toUpperCase();
  option.value = center; 
  
  select.appendChild(option);
 }
 
 select.value = User_Center();
 Core_State_Set("marketing", "view-center", select.value);
 
 select.onchange = 
 async function()
 { 
  Core_State_Set("marketing", "view-center", select.value);
  
  // CLEAR CURRENTLY EDITED LIST
  var container       = UI_Element_Find("panel-operators");
  container.innerHTML = "";
 
  // RELOAD LISTS
  //await Marketing_Database_ReadLists();
  
  // OPERATORS
  await Marketing_Operators_Update();
 }
 
 
 await Marketing_Operators_Update();
}




async function Marketing_Operators_Update()
{
 var list  = Core_State_Get("marketing", ["operators", "list"], []);
 var lists = Core_State_Get("marketing", "lists");
 var page  = Core_State_Get("marketing", "submodule");
 
 var panel       = UI_Element_Find(page, "panel-operators");
 panel.innerHTML = "";
 
 for(var operator of list)
 {
  var element = UI_Element_Create("marketing/operator-card", operator);
  
  var icon     = UI_Element_Find(element, "action-user");
  Document_Element_SetObject(icon, "operator", operator);
  icon.onclick = Marketing_Operators_DisplayUser;
  
  var icon     = UI_Element_Find(element, "action-cases");
  Document_Element_SetObject(icon, "operator", operator);
  icon.onclick = Marketing_Operators_DisplayAppointments;
  
  var icon     = UI_Element_Find(element, "action-recalls");
  Document_Element_SetObject(icon, "operator", operator);
  icon.onclick = Marketing_Operators_DisplayRecalls;
  
  var icon     = UI_Element_Find(element, "action-stats");
  Document_Element_SetObject(icon, "operator", operator);
  icon.onclick = Marketing_Operators_DisplayStats;
  
  var select = UI_Element_Find(element, "marketing-list");
   
  Marketing_Lists_ToSelect(lists, select, {selected:operator["marketing_list"], sections:true, nullfirst:true})
  Document_Element_SetData(select, "operator", operator["id"]);
 
  select.onchange =
  async function(event)
  {
   var element = event.srcElement;   
   var user_id = Document_Element_GetData(element, "operator");
   
   var value   = element.value;
   if(value == "") value = null;
	
   await Core_Api("User_Update_Field", {user_id, field:"marketing_list", value});
  
  }	  
  
  panel.appendChild(element);
 }
  
}



async function Marketing_Operators_DisplayRecalls(event)
{
 var element      = event.srcElement;
 var operator     = Document_Element_GetObject(element, "operator", {});

 var container    = UI_Element_Create("marketing/operator-recalls"); 
 UI_Element_Find(container, "title").innerHTML = UI_Language_String("marketing/operators", "operator recalls title");
 
 await Marketing_Call_DisplayRecalls(operator["id"], UI_Element_Find(container, "recalls"), {onclick:Marketing_Operators_DisplayLead});
 
 var panel       = UI_Element_Find("panel-info");
 panel.innerHTML = "";
 panel.appendChild(container);
 
 UI_Element_Find("panel-info").style.display   = "flex"; 
 UI_Element_Find("panel-extras").style.display = "none"; 
}




async function Marketing_Operators_DisplayLead(event)
{
 var element = event.srcElement;
 element     = Document_Element_FindParent(element, "lead");
    
 var lead_id = Document_Element_GetData(element, "lead");
 
 var container = UI_Element_Find("panel-extras");
 await Marketing_Call_DisplayLead(-1, container, {mode:"lead", lead_id, data:true, history:true, outcome:false});
 container.style.display = "flex";
}





async function Marketing_Operators_DisplayUser(event)
{
 var element      = event.srcElement;
 var operator     = Document_Element_GetObject(element, "operator", {});
 var user         = await Users_User_DisplayMain(operator["id"]);
 
 var panel       = UI_Element_Find("panel-info");
 panel.innerHTML = "";
 panel.appendChild(user);
 
 UI_Element_Find("panel-info").style.display   = "flex"; 
 UI_Element_Find("panel-extras").style.display = "none"; 
}




async function Marketing_Operators_DisplayAppointments(event)
{
 var element      = event.srcElement;
 var operator     = Document_Element_GetObject(element, "operator", {});
 var date         = Date_Now();
 
 // FROM A FEW DAYS AGO
 var days      = 7;
 var date_from = Date_Portion(Date_Add_Days(date, -days), "date-only") + "0000";
 
 // TO ALL OF TODAY
 var date_to = Date_Portion(date, "date-only") + "2359";
 
 // FETCH AND STRUCTURE APPOINTMENTS
 var list = await Core_Api("Marketing_Contacts_List", {operator_id:operator["id"], outcomes:["eng"], date_from, date_to, info:{leads:true}});

 for(var item of list)
 {
  item["date_call"] = Date_Portion(item["date_call"], "date-only");
 }
 list      = Array_Catalog_ByField(list, "date_call");
 var dates = Object.keys(list);
 dates     = dates.reverse();
 
 // DISPLAY
 var container = UI_Element_Create("marketing/operator-appointments");
 UI_Element_Find(container, "title").innerHTML = UI_Language_String("marketing/operators", "operator appointments title", {days});
 
 var cards = UI_Element_Find(container, "appointments");
 
 for(var date of dates)
 {
  var items  = list[date];
  
  var text   = UI_Language_Date(date,"date-long-weekday-noyear");
  var header = UI_Element_Create("marketing/contact-cases-header", {text});
  cards.appendChild(header);
  
  for(var item of items)
  {
   var card = await Marketing_Contact_Card(item);
   cards.appendChild(card);
	  
   Document_Element_SetData(card, "contact_id", item["id"]);
	  
   card.onclick =   
   async function(event)
   {
	var element = event.srcElement;
	element     = Document_Element_FindParent(element, "contact_id");
	var id      = Document_Element_GetData(element, "contact_id"); 
	   
	await Marketing_Contacts_CasePopup(id);
   }
  }
 }
 
 var panel       = UI_Element_Find("panel-info");
 panel.innerHTML = "";
 panel.appendChild(container);
 
 UI_Element_Find("panel-info").style.display   = "flex"; 
 UI_Element_Find("panel-extras").style.display = "none"; 
}



async function Marketing_Operators_DisplayStats(event)
{
 var element      = event.srcElement;
 var operator     = Document_Element_GetObject(element, "operator", {});
 var date         = Date_Now();
 
 var days         = 7;
 var date_to      = Date_Now();
 var date_from    = Date_Add_Days(date_to, -days);
 var stats        = await Core_Api("Marketing_Operator_Stats", {id:operator["id"], date_from, date_to});
 
 
 // CREATE DISPLAY
 var container = UI_Element_Create("marketing/operator-stats");
 var charts    = UI_Element_Find(container, "charts");
 UI_Element_Find(container, "title").innerHTML    = UI_Language_String("marketing/operators", "operator stats title");
 UI_Element_Find(container, "subtitle").innerHTML = UI_Language_String("marketing/operators", "operator stats subtitle", {days});
 
 
 // OUTCOMES
 var contacts = Safe_Get(stats, ["contacts"], []);
 var outcomes = Array_Catalog_ByField(contacts, "outcome");
 
 var data = {}
 for(var outcome in outcomes)
 {
  data[outcome] = outcomes[outcome].length;
 }
 
 var outcomes = Core_Data_Page("marketing/outcomes"); 
 var chart    = UI_Chart_DoughnutLegend(data,  0.67, {width:"100%", height:"100%", zIndex:100, values:"left"}, outcomes);

 charts.appendChild(chart);
 
 
 
 
 
 // TOTAL CALL TIME
 var time = 0;

 for(var contact of contacts)
 {
  var duration = parseInt(contact["duration"]);
  if(!isNaN(duration)) time = time + duration;
 }
 
 if(time > 0)
 {
  time        = (time / 60).toFixed(1);
  var text    = UI_Language_String("marketing/operators", "operator stats calltime", {time}); 
  
  var element = UI_Element_Create("marketing/stats-operator-info", {text}); 
  charts.appendChild(element);
 }
 
 
 
 
 // BY DAY
 var outcomes = Core_Data_Page("marketing/outcomes"); 
 var contacts = Safe_Get(stats, ["contacts"], []);
 var dates    = {};
 
 for(var i = -7; i<=0; i++)
 {
  var item = {};
  var date = Date_Portion(Date_Add_Days(Date_Now(), i), "date-only");
 
 
  for(var outcome in outcomes)
  {
   for(var contact of contacts)
   {
	if((Date_Portion(contact["date_call"], "date-only") == date) && (contact["outcome"] == outcome))
	{		
     if(!item[outcome]) item[outcome] = 0;
     item[outcome]++;
	}
   }
  }
    
  
  var key    = UI_Language_Date(date + "000000", "date-short-weekday-noyear");
  dates[key] = item;
 }

 var chart = UI_Chart_Stacks(dates, outcomes, {totals:": ", legend:false});
 charts.appendChild(chart);
 


 var panel       = UI_Element_Find("panel-info");
 panel.innerHTML = "";
 panel.appendChild(container);
  
  UI_Element_Find("panel-info").style.display   = "flex"; 
 UI_Element_Find("panel-extras").style.display = "none"; 
}