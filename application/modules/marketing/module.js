// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                   M A R K E T I N G                                            //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//

async function Marketing_OnLoad(module, data)
{
 // LOAD LISTS
 await Marketing_Database_ReadLists();
}



async function Marketing_OnShow(module, data)
{
 // ALLOWED FUNCTIONS (TOP MENU)
 var functions = User_Config("marketing-functions", "").split(","); 

 var items = {};
 for(var func of functions)
 {
  var item        = {};
  item["icons"]   = [];
  item["text"]    = UI_Language_String("marketing/functions", func);
  item["onclick"] = Marketing_Page;
  
  items[func]  = item;
 }
 
 var header = UI_Header("module-page-select", items, {selectfirst:false, css:"color-noted"});  
 
 var selector = UI_Element_Find(module, "module-header");
 selector.appendChild(header);
 
 Module_Page_Set();
}




async function Marketing_OnUnload()
{
}




async function Marketing_Page(item)
{
 await Module_Page_Set(item["id"]);
}




// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                          M O R E                                               //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//

function Marketing_Lists_ToSelect(lists, select, options = {selected:false})
{
 if(options["nullfirst"])
 {
  Document_Select_AddOption(select, "", "");
 }
 

 // LISTS IN CENTER
 for(var item of lists)
 {
  var option   = new Option();
  option.text  = item["name"];
  option.value = item["id"];
   
  select.appendChild(option);
 }
  
 if(options["selected"]) select.value = options["selected"];
}

