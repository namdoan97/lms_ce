// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                      F O L L O W U P                                           //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//


async function Embed_Casefollowup()
{
 
 var case_id   = Client_Location_Parameter("case_id");
 var action_id = Client_Location_Parameter("action_id");
 
 var page      = Module_Page_Body();
 var panel     = UI_Element_Find(page, "display");
 var display   = await Marketing_Contact_DisplayCase(case_id, {customer:true});
 
 // DISABLLE DELETE CONTACT
 var buttonDelete = UI_Element_Find(display,"delete-button");
 if(buttonDelete)
 Document_Element_Disable(buttonDelete, "style-disabled");
 
 // DISABLE CUSTOMER SECTION
 /*
 var section    = UI_Element_Find(display, "section-customer");
 var elements  = Document_Element_Children(section, true);
 for(var element of elements)
 {
  var uid = Document_Element_GetData(element, "uid", false);
  if(uid) Document_Element_Disable(element, "style-disabled");
 }
 */
 
 // DISABLE PRODUCT EDITING
 var section    = UI_Element_Find(display, "section-product");
 var elements  = Document_Element_Children(section, true);
 for(var element of elements)
 {
  var uid = Document_Element_GetData(element, "uid", false);
  if(uid) Document_Element_Disable(element, "style-disabled");
 }
 
 
 // DISABLE CALL EDITING
 var section    = UI_Element_Find(display, "section-call");
 var elements  = Document_Element_Children(section, true);
 for(var element of elements)
 {
  var uid = Document_Element_GetData(element, "uid", false);
  if(uid) Document_Element_Disable(element, "style-disabled");
 }
 
 // DISABLE SURVEY EDITING
 var section    = UI_Element_Find(display, "section-survey");
 var elements  = Document_Element_Children(section, true);
 for(var element of elements)
 {
  var uid = Document_Element_GetData(element, "uid", false);
  if(uid == "answer") Document_Element_Disable(element, "style-disabled");
 }
 
 // DISABLE DELETING ACTIONS
 var section    = UI_Element_Find(display, "section-actions");
 var elements  = Document_Element_Children(section, true);
 for(var element of elements)
 {
  var uid = Document_Element_GetData(element, "uid", false);
  if(uid == "delete") Document_Element_Disable(element, "style-disabled");
 }
 
 panel.appendChild(display);
 
 var element = Document_Element_FindChild(display, "actionid", action_id, ["recurse"]);
 if(element) Document_Element_Animate(element, "flash 1s 3");
}