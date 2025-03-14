// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                      S E A R C H                                               //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//

async function Marketing_Search(event)
{   
 var lead = await Marketing_Leads_SearchPopup(); 
 console.log(lead);
  
 if(lead)
 {
  var operator_id = User_Id();
  var lead_id     = lead["id"];
  
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
  
}



