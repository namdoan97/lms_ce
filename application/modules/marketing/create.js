// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                       C R E A T E                                              //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//

async function Marketing_Create(event)
{   	
 // CREATION POPUP
 var title       = UI_Language_String("marketing/popups", "create lead title");
 var placeholder = UI_Language_String("marketing/popups", "create lead id");
 var student_id  = await UI_Popup_Input(title, false, false, placeholder);
 
 if(!student_id) return;
 
 // CHECK IF EXISTS
 var lead_id = await Core_Api("Marketing_Lead_Exists", {student_id});
 
 // IF IT DOESN'T, OFFER TO CREATE IT
 if(lead_id)
 {
  var title = UI_Language_String("marketing/popups", "create lead title");
  var text  = UI_Language_String("marketing/popups", "create lead exists", {id:student_id});
  var popup = await UI_Popup_Intermission(title, text, false, 3, {autoclose:true, template:"flexi"});
 }
 else
 {  
  var title   = UI_Language_String("marketing/popups", "create lead title");
  var text    = UI_Language_String("marketing/popups", "create lead confirm", {id:student_id});
  var picture = Resources_URL("images/cover-alert.jpg");
  var confirm = await UI_Popup_Confirm(title, text, picture);
  
  if(!confirm) return;
  
  var lead_id = await Core_Api("Marketing_Lead_New", {student_id});
 }
 
 // ASSIGN LEAD
 var operator_id = User_Id();
 await Core_Api("Marketing_Call_AssignLead", {operator_id, lead_id});
 
 // RETURN TO CALL
 if(Core_State_Get(module, ["page"]) == "call") 
 {
  await Marketing_Call(); 
 }
 else 
 {
  await Module_Page_Set("call");
 }
}



