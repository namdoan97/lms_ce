// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                        C A S E S                                               //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//

async function Marketing_Cases(event)
{   
 var operator_id = User_Id();
 
 var config = await Core_Api("User_Config_Read", {file:"ce", section:"cases"}) || {};
 Core_State_Set("marketing", ["cases", "config"], config);
 
 var page = Core_State_Get("marketing", "submodule");  
 
 var element                  = UI_Element_Find(page, "date-from");
 var date_from                = Safe_Get(config, ["list-date-from"], false);
 if(!date_from) var date_from = Date_Add_Days(Date_Now(), -7);
 element.value                = Date_To_Input(date_from);
 element.onchange             = Marketing_Cases_UpdateList;
 
 
 var element                  = UI_Element_Find(page, "date-to");
 var date_to                  = Safe_Get(config, ["list-date-to"], false);
 if(!date_to) var date_to     = Date_Now();
 element.value                = Date_To_Input(date_to); 
 element.onchange             = Marketing_Cases_UpdateList;
 
 for(var date of ["lastweek", "yesterday", "today", "thisweek"])
 {
  var element = UI_Element_Find(page, "date-" + date);
  Document_Element_SetData(element, "range", date);
  
  element.onclick = 
  async function(event)
  {
   var element = event.srcElement;
   var range   = Document_Element_GetData(element, "range");
   
   switch(range)
   {
	case "lastweek":
		var range = Date_Range("last week");
	break;
	
	case "yesterday":
		var range = Date_Range("yesterday");
	break;
	
	case "today":
		var range = Date_Range("today");
	break;

	case "thisweek":
		var range = Date_Range("this week");
	break;
	
	default:
		var range = false;
	break;
   }
   
   if(range)
   {
	UI_Element_Find(page, "date-from").value = Date_To_Input(range["from"]);
	UI_Element_Find(page, "date-to").value   = Date_To_Input(range["to"]);
	
	console.log(range);
	await Marketing_Cases_UpdateList();
   }
  }
 }
 
 
 
 await Marketing_Cases_UpdateList();
}





async function Marketing_Cases_UpdateList(event)
{
 var page    = Core_State_Get("marketing", "submodule");  
 
 var date_from = Date_From_Input(UI_Element_Find(page, "date-from").value);
 var date_to   = Date_From_Input(UI_Element_Find(page, "date-to").value);
 
 var config    =  Core_State_Get("marketing", ["cases", "config"]);
 config["list-date-from"] = date_from;
 config["list-date-to"]   = date_to;
 
 Core_Api("User_Config_WriteSection", {file:"ce", section:"cases", data:config});


 switch(User_Config("marketing-cases"))
 {
  case "own":
	var operator_id = User_Id();
  break;
  
  case "all":
	var operator_id = undefined;
  break;
  
  default:
	var operator_id = User_Id();
  break;
 }
 
 var display = UI_Element_Find(page, "cases-list");
 await Marketing_Cases_Display(operator_id, date_from, date_to, display) 
}







async function Marketing_Cases_Display(operator_id, date_from, date_to, display)
{
 // FROM A FEW DAYS AGO
 var date_from = Date_Portion(date_from, "date-only") + "0000";
 
 // TO ALL OF TODAY
 var date_to = Date_Portion(date_to, "date-only") + "2359";
 
 // FETCH AND STRUCTURE APPOINTMENTS
 var list = await Core_Api("Marketing_Contacts_List", {operator_id, outcomes:["eng"], date_from, date_to, info:{leads:true}}); console.log(list);

 for(var item of list)
 {
  item["date_call"] = Date_Portion(item["date_call"], "date-only");
 }
 list      = Array_Catalog_ByField(list, "date_call");
 var dates = Object.keys(list);
 dates     = dates.reverse();


 display.innerHTML = ""; 
 for(var date of dates)
 {
  var items  = list[date];
  
  var text   = UI_Language_Date(date,"date-long-weekday-noyear");
  var header = UI_Element_Create("marketing/contact-cases-header", {text});
  display.appendChild(header);
  
  for(var item of items)
  {
   var card = await Marketing_Contact_Card(item);
   display.appendChild(card);
	  
   Document_Element_SetData(card, "contact_id", item["id"]);
	  
   card.onclick =   
   async function(event)
   {
	var element = event.srcElement;
	element     = Document_Element_FindParent(element, "contact_id");
	var id      = Document_Element_GetData(element, "contact_id"); 
	   
	await Marketing_Contacts_CasePopup(id);
	await Marketing_Cases_UpdateList();
   }
  }
 }
 
}




async function Marketing_Cases_DisplayCase(id)
{
}

