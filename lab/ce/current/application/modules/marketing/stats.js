// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                      S T A T S                                                 //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//




async function Marketing_Stats(event)
{
 // STATS SELECTOR
 var stats = Core_Data_Page("marketing/stats");
 
 var items = {};
 for(var id in stats)
 {
  var stat        = stats[id];
  
  var item        = {};
  item["icons"]   = [];
  item["text"]    = UI_Language_Object(stat);
  item["onclick"] = Safe_Function("Marketing_Stats_" + String_Capitalize_Initial(id), false);
  
  items[id]       = item;
 }
 
 var header = UI_Header("module-page-select", items, {selectfirst:false, css:"color-noted"});  
 var page   = Core_State_Get("marketing", "submodule");
 UI_Element_Find(page, "header").appendChild(header);
}





function Marketing_Stats_Center(center, dates, title)
{	
 var config   = Core_Data_Page("marketing/stats-outcomes-groups");
 
 var outcomes = [];
 for(var item of config)
 {
  var outcome = {};
  
  outcome["values"]          = Array_From_String(item["values"]);
  outcome["backgroundColor"] = Document_CSS_GetVariable(item["color"]);
  outcome["label"]           = UI_Language_Object(item);
  outcome["data"]            = Array(dates.length).fill(null);
  
  outcomes.push(outcome);
 }
 

 // SCAN DATES
 var n = 0;
 for(var date of dates)
 {
  var items = center[date] || [];
  
  for(var item of items)
  { 
   for(var outcome of outcomes) if(outcome["values"].includes(item["outcome"]))
   {
	if(outcome["data"] == null) outcome["data"] = [];
	outcome["data"][n]++
	
    break;
   }
  }
  
  n++;
 }


 // CREATE LABELS
 var labels = [];
 for(var date of dates)
 {
  var text = UI_Language_Date(date + "000000", "date-long-weekday-noyear");
  labels.push(text);
 }
 
 
 // CHART CONFIG
 var config = 
 {
  type:    "bar",
  data:    {labels, datasets: outcomes},
  options: 
  {
   responsive: true, 
   scales:     {x:{stacked: true}, y:{stacked: true}},
   plugins:    {legend: {display: false}}
  }
 }
 
 
 // CREATE ELEMENT
 var element            = UI_Element_Create("core/chart-bars-custom", {title});
 element.style.position = "relative";
 
 // LEGEND
 var legend = UI_Element_Find(element, "legend");
 for(var outcome of outcomes)
 {
  var caption = outcome["label"];
  var color   = outcome["backgroundColor"];
  
  var item = UI_Element_Create("core/chart-legend-item", {caption, color});
  legend.appendChild(item);
 }


 // SETUP CANVAS
 var canvas   = UI_Element_Find(element, "canvas");
 var context  = canvas.getContext("2d"); 
 
 var chart = new Chart(context, config);

 Document_Element_SetData(element,   "type",  "stacks");
 Document_Element_SetObject(element, "chart", chart);


 // CUSTOM-STYLE CHART
 element.style.backgroundColor = "var(--color-white)";
 element.style.width           = "512px";
 element.style.height          = "384px";
 Document_CSS_SetClass(element, "shadow-sharp-bottom");
 Document_CSS_SetClass(element, "border-rounded");
 Document_CSS_SetClass(element, "padding-medium");
 
 return element; 
}




async function Marketing_Stats_Appointments()
{
 var page          = Core_State_Get("marketing", "submodule");
 var content       = UI_Element_Find(page, "content");
 content.innerHTML = "";
 
 var centers   = Centers_List();
 var ids       = Object.keys(centers);
  
 var days      = 7;
 var types     = false;//["sales"];
 var date_from = Date_Portion(Date_Now(), "no-seconds");
 //var date_from = "202406010000";
 var date_to   = Date_Add_Days(date_from, days); 
 var stats     = await Core_Api("Marketing_Stats_Appointments", {date_from, date_to, types, centers:ids});
 console.log(stats);
 
 // DATES
 var dates = [];
 for(var i = 0; i<days; i++)
 {
  var date  = Date_Add_Days(date_from, i);
  date      = Date_Portion(date, "date-only");
  
  dates.push(date);
 }
 
 // ALL CENTERS
 var table  = UI_Table("sheet");

 var header = UI_Table_Row(table);
 
 var title  = UI_Table_Cell(header);
 title.style.backgroundColor = "transparent";
 title.style.border          = "0px";
 
 var caption = UI_Language_String("marketing/stats", "appointments");
 var text    = UI_Element_Create("marketing/stats-title", {caption});
 title.appendChild(text);
 
 
 for(var center in centers)
 {
  var cell       = UI_Table_Cell(header);
  cell.innerHTML = "<b>" + Centers_Name(center) + "</b>";
 }
 
 for(var date of dates)
 {
  var row = UI_Table_Row(table);
   
  var cell             = UI_Table_Cell(row);
  cell.style.textAlign = "left";
  cell.innerHTML       = UI_Language_Date(date, "date-long-weekday-noyear");
  
  for(var center in centers)
  {
   var appointments = Safe_Get(stats, [center, date], []);
   
   var cell         = UI_Table_Cell(row);
   cell.innerHTML   = appointments.length;
  }
 }
 
 var container = UI_Element_Create("marketing/stats-sheet");
 container.appendChild(table);
 container.style.width = "100%";
 
 content.appendChild(container);
 
 
 // APPOINTMENTS RESULTS BY CENTER
 var container = UI_Element_Create("marketing/stats-charts-blocks");
 for(var center of ids)
 {  
  var data    = stats[center] || {};
  var element = Marketing_Stats_Center(data, dates, Centers_Name(center));
   
  container.appendChild(element)
 }
 content.appendChild(container);
}




async function Marketing_Stats_Calls()
{
 var operators     = await Core_Api("Marketing_Operators_ByRole", {roles:["ceoper", "cesuper"]});
 var outcomes      = Core_Data_Page("marketing/outcomes");
 var subpage       = UI_Element_Create("marketing/stats-subpage-calls");
 
 var select        = UI_Element_Find(subpage, "date");
 select.value      = Date_To_Input(Date_Now());
 select.onchange   =
 async function(event)
 {
  var select = event.srcElement;
  var date   = Date_From_Input(select.value);
  date       = Date_Portion(date, "date-only");
  
  var stats = await Core_Api("Marketing_Stats_Calls", {date});
  var data  = {};

  for(var operator of operators)
  {
   var id     = operator["id"];
   var fname  = operator["firstname"] || " ";
   var name   = [operator["firstname"], operator["lastname"]].join(" "); 
   
   data[name] = stats[id] || {};
  }
 
  console.log(data);
  
  var chart = UI_Chart_Stacks(data, outcomes, {totals:": "});
  
  var calls       = UI_Element_Find(subpage, "calls");
  calls.innerHTML = "";
  calls.appendChild(chart);
 }
 
 Document_Event_Trigger(select, "change");
 
 var page          = Core_State_Get("marketing", "submodule");
 var content       = UI_Element_Find(page, "content");
 content.innerHTML = "";
 content.appendChild(subpage);
}