<?PHP

// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                     M A R K E T I N G                                          //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//


function Marketing_Load()
{
 
}







// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                        L I S T S                                               //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//


function Marketing_List_Read($id)
{
 $db   = Core_Database_Open();
 $data = SQL_Query("SELECT * FROM marketing_lists WHERE id = $id", $db);
 SQL_Close($db);
 
 $list = data[0];
 
 return $list;
}




function Marketing_Lists_New($name)
{
 $db = Core_Database_Open();
 
 $center_id     = SQL_Format($center_id, $db);
 $name          = SQL_Format($name, $db);
 $creation_date = Date_Now();
 $creator_id    = $_SESSION["user"]["id"];
 
 // DOES IT EXIST ALREADY?
 $data   = SQL_Query("SELECT id FROM marketing_lists WHERE name = $name", $db);
 if(count($data) > 0)
 {
  $id = $data[0]["id"];
 }
 else
 {
  $id = SQL_Query("INSERT INTO marketing_lists (name, creation_date, creator_id) VALUES($name, $creation_date, $creator_id)", $db);
 }
 
 SQL_Close($db);
 
 return $id;
}



function Marketing_List_Rename($id, $name)
{
 $db    = Core_Database_Open(); 
  

 // SEARCH FOR LISTS OF THE SAME NAME 
 $name  = SQL_Format($name, $db);
 $lists = SQL_Query("SELECT id FROM marketing_lists WHERE name = $name", $db);
 
 if(count($lists) > 0)
 {
  SQL_Close($db);
  return "exists";
 }

 SQL_Query("UPDATE marketing_lists SET name = $name WHERE id = $id", $db);
 SQL_Close($db);
 
 return "ok";
}




function Marketing_List_Delete($id, $emptyonly = true)
{
 $count = Marketing_List_LeadsCount($id);
 if($emptyonly && $count != 0)
 {
  return "notempty";
 }
 
 $db = Core_Database_Open(); 
 SQL_Query("DELETE FROM marketing_lists WHERE id = $id", $db);
 SQL_Close($db);
 
 return "ok";
}




function Marketing_Lists_List()
{
 $db      = Core_Database_Open();
 $lists   = SQL_Query("SELECT * FROM marketing_lists", $db);
 SQL_Close($db);
 
 return $lists;
}





function Marketing_Lists_UpdateAll()
{
 $db = Core_Database_Open();
 
 // GET ALL IDS
 $data = SQL_Query("SELECT id FROM marketing_lists", $db);
 $ids  = array_column($data, "id");
 
 foreach($ids as $id)
 {
  $data  = SQL_Query("SELECT COUNT(*) FROM marketing_leads WHERE list_id = $id", $db);
  $count = $data[0]["COUNT(*)"];
  SQL_Query("UPDATE marketing_lists SET leads_count = $count WHERE id = $id", $db);
 }
 
 SQL_Close($db);
}





function Marketing_List_LeadsCount($list_id)
{
 $db = Core_Database_Open();
 
 $data  = SQL_Query("SELECT COUNT(*) FROM marketing_leads WHERE list_id = $list_id", $db);
 $count = $data[0]["COUNT(*)"];
 
 SQL_Query("UPDATE marketing_lists SET leads_count = $count WHERE id = $list_id", $db);
 
 SQL_Close($db);
 
 return $count;
}



function Marketing_List_Stats($id, $outcomes = [])
{
 $db    = Core_Database_Open();
 
 $stats = [];
 
 $data           = SQL_Query("SELECT COUNT(*) FROM marketing_leads WHERE list_id = $id", $db);
 $count          = $data[0]["COUNT(*)"];
 $stats["total"] = $count;
 
 $data           = SQL_Query("SELECT COUNT(*) FROM marketing_leads WHERE list_id = $id AND outcome_last IS NOT NULL", $db);
 $count          = $data[0]["COUNT(*)"];
 $stats["used"]  = $count;

 foreach($outcomes as $outcome)
 { 
  $data           = SQL_Query("SELECT COUNT(*) FROM marketing_leads WHERE list_id = $id AND outcome_last = '$outcome'", $db);
  $count          = $data[0]["COUNT(*)"];
  $stats[$outcome]  = $count;
 }	 
 
 SQL_Close($db);
 
 return $stats;
}



function Marketing_List_Transfer($id, $center_id)
{
 $db        = Core_Database_Open(); 
 
 $center_id = SQL_Format($center_id, $db);
 
 SQL_Query("UPDATE marketing_lists SET center_id = $center_id WHERE id = $id", $db);
 SQL_Close($db);
}




function Marketing_List_MoveLeads($list_from, $list_to, $virgin = false, $amount = -1)
{
 if($amount == -1) $limit = ""; else $limit = "LIMIT $amount";
 if($virgin) $virgin = " AND operator_id IS NULL AND outcome_last IS NULL"; else $virgin = "";
 
 $query = "UPDATE marketing_leads SET list_id = $list_to WHERE (list_id = $list_from $virgin) $limit";
 
 $db = Core_Database_Open(); 
 SQL_Query($query, $db);
 SQL_Close($db);
 
 // UPDATE AFFECTED LISTS LEADS COUNTS
 Marketing_List_LeadsCount($list_from);
 Marketing_List_LeadsCount($list_to);
 
 //return $query;
}








// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                        L E A D S                                               //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//


function Marketing_Leads_Upload($list_id = -1, $leads = [], $assign = [], $creation_tag = false, $options = [])
{
 $db = Core_Database_Open();
 
 
 // CREATION TAG
 if(!$creation_tag)
 {
  $creation_tag = "";
 }
 $creation_tag = SQL_Format($creation_tag, $db);
 
 
 // CREATION DATE
 $creation_date = Date_Now();
 $creation_date = SQL_Format($creation_date, $db);
 
 
 // SANITIZE ASSIGN
 $fields = array_keys($assign);
 $valid  = [];
 foreach($fields as $field)
 {
  if($field && $assign[$field] !=="")
  {
   $valid[$field] = $assign[$field];
  }
 }
 $assign = $valid;
 $fields = array_keys($assign);
 
 $query_fields = implode(", ", $fields);

 

 $order_id = 0;
 // CHECK EXIST DATA LIST
 $check = SQL_Query("SELECT COUNT(id) as count FROM marketing_leads WHERE list_id = $list_id",$db);
 if(count($check)) $order_id = intval($check[0]["count"]);

 // PREPARE QUERIES
 foreach($leads as &$lead)
 {
  $values = [];
  $update = [];
  
  foreach($fields as $field)
  {
   $index = $assign[$field];
   $value = $lead[$index];
   $value = SQL_Format($value, $db);
   
   array_push($values, $value);
   array_push($update, "$field = $value");
  }
  $values = implode(", ", $values);

  $order_id = $order_id + 1;
  array_push($update, "order_id = $order_id");
  
  array_push($update, "list_id = $list_id");
  $update = implode(", ", $update);
   
  $lead = "INSERT INTO marketing_leads (list_id, creation_date,  $query_fields , order_id) VALUES ($list_id, $creation_date, $values, $order_id) ON DUPLICATE KEY UPDATE $update";
 }

 //return $leads;
 
 
 // INSERT
 $db->beginTransaction();
 
 foreach($leads as &$lead)
 {
  SQL_Query($lead, $db);
 }
 
 $db->commit();
 
 
 // DONE
 SQL_Close($db);
 
 
 // UPDATE LEADS COUNT (AN IMPORT CAN AFFECT MULTIPLE LISTS)
 Marketing_Lists_UpdateAll();
}





function Marketing_Lead_Update($id, $field, $value)
{
 $db    = Core_Database_Open();
 
 $value = SQL_Format($value, $db);
 SQL_Query("UPDATE marketing_leads SET $field = $value WHERE id = $id", $db);
 
 SQL_Close($db); 
}




function Marketing_Lead_New($student_id, $list_id = -1, $operator_id = -1)
{
 $db    = Core_Database_Open();
 
 $student_id = SQL_Format($student_id, $db);
 
 $id    = SQL_Query("INSERT INTO marketing_leads (student_id, list_id) VALUES($student_id, $list_id)", $db);
 
 if($operator_id)
 {
  Marketing_Call_AssignLead($operator_id, $id, $db);
 }
 
 SQL_Close($db);

 return $id; 
}




function Marketing_Lead_SearchByPhone($search, $fields = "*", $whole = true)
{
 $db    = Core_Database_Open();
 
 $phone = SQL_Format($search, $db);
 $leads = SQL_Query("SELECT * FROM marketing_leads WHERE phone_mobile = $search", $db);
 
 SQL_Close($db);
 
 
 if(count($leads) > 0)
 {  
  $lead = $leads[0];
 }
 else $lead = false;
 

 if($lead)
 {
  if($whole) return $lead; else return $lead["id"];
 }
 
 return false;
}




function Marketing_Leads_ByList($list_id = -1, $fields = "*", $order = false, $rows = false, $stats = false, $page = false)
{
 $db = Core_Database_Open();


 // CONDITION
 $condition = "list_id = $list_id";

 // ORDER 
 if($order)
 {
  $order = "ORDER BY $order";   
 }
 else 
 {
  $order = "";
 }
 
 
 // LIMIT
 if($rows)
 {
  if($page) 
  {
   $start = $page * $rows;
   $limit = "LIMIT $start, $rows";
  }
  else
  {
   $limit = "LIMIT $rows";
  }
 }
 else
 {
  $limit = "";
 }
 
 
 $query  = "SELECT $fields FROM marketing_leads WHERE $condition $order $limit";
 $data   = SQL_Query($query, $db);
 
 if($stats)
 {
  $stats  = [];
  
  $query  = "SELECT count(*) FROM marketing_leads WHERE $condition";
  $count  = SQL_Query($query, $db);
  $count  = $count[0]["count(*)"];
  
  $stats["count"] = $count;
  
  array_push($data, $stats);
 }
 
 SQL_Close($db);
 
 return $data;
}




function Marketing_Leads_CenterFromList($leads, $field = "center_id")
{
 $ids = array_column($leads, "list_id");
 
 $db    = Core_Database_Open(); 
 $ids   = SQL_Format_IN($ids, $db);
 $lists = SQL_Query("SELECT id, center_id FROM marketing_lists WHERE id IN($ids)", $db);
 SQL_Close($db);
 
 $lists = Array_Catalog_ByField($lists, "id", true);
 foreach($leads as &$lead) $lead[$field] = $lists[$lead["list_id"]]["center_id"]; 
 
 return $leads;
}





function Marketing_Leads_Reset($list_id = -1, $criteria = "all", $value = false)
{
 $db = Core_Database_Open(); 
 
 $conditions = [];
 
 // LIST
 if($list !=-1) array_push($conditions, "list_id = $list_id");
 
 // CRITERIA
 switch($criteria)
 {
  case "all":
  break;
  
  case "time":
  break;
  
  default:
  break;
 }
 
 
 $conditions = implode("AND", $conditions);
 $query      = "UPDATE marketing_leads SET operator_id = NULL, contact_last = NULL, outcome_last = NULL WHERE $conditions";
 
 SQL_Query($query, $db);
 SQL_Close($db);
}





function Marketing_Leads_Search($search = [])
{
 $db     = Core_Database_Open();
  
 $search = (array) $search;
 
 
 // 1. FIELDS
 $fields = $search["fields"] ?: [];
 if(gettype($fields) == "string") $fields = explode(",", $fields);
 if(array_search("id", $fields) === false) array_unshift($fields, "id");
 $fields = implode(",", $fields);
 
 // 2. CONDITIONS
 $conditions = [];
 
  
 // 2c. ID OR ELSE
 if($search["student_id"])
 {
  $id = $search["student_id"];
  array_push($conditions, "(student_id = '$id')");
 }
 else
 // OTHER FIELDS
 {
  // NAME
  if($search["name"])
  {
   $lastname = $search["name"];
   array_push($conditions, "(name LIKE '$name%')");
  }
  
  
  // EMAIL
  if($search["email"])
  {
   $email = $search["email"];
   array_push($conditions, "(email LIKE '$email%')");
  }
  
  // MOBILE
  if($search["phone_mobile"])
  {
   $mobile = $search["phone_mobile"];
   array_push($conditions, "(phone_mobile LIKE '$mobile%')");
  }
 }
 
 

 
 $conditions = implode(" AND ", $conditions);
 
 
 // 3. LIMIT
 if($search["count"])
 { 
  $limit = $search["count"];
  $limit = "LIMIT $limit";
 }
 else $limit = "";
 
 
 // 4. ORDER
 if($search["order"])
 { 
  $order = $search["order"];
  $order = "ORDER BY $order";
 }
 else $order = "";
 
 
 $query = trim("SELECT $fields FROM marketing_leads WHERE $conditions $order $limit");
 $rows  = SQL_Query($query, $db);
 
 SQL_Close($db); 
 
 return $rows; 
}


function Marketing_Lead_Exists($student_id)
{
 $db = Core_Database_Open();
 
 $student_id = SQL_Format($student_id, $db);
 $leads      = SQL_Query("SELECT id FROM marketing_leads WHERE student_id = $student_id", $db);
 $id         = $leads[0]["id"] ?? false;
 
 SQL_Close($db);
 
 return $id;
}






// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                     O P E R A T O R S                                          //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//


function Marketing_Operators_ByManager($manager_id = -1)
{ 
 if($manager_id == -1) $manager_id = $_SESSION["user"]["id"];
 
 $db    = Core_Database_Open(); 
 
 $query = "SELECT id,firstname,lastname,marketing_list FROM users WHERE role = 'ceoper' AND manager_id = $manager_id";
 
 $operators = SQL_Query($query, $db);
 SQL_Close($db);
 
 return $operators;
}


function Marketing_Operators_ByRole($roles= [])
{  
 $db    = Core_Database_Open(); 
 
 $roles = SQL_Format_IN($roles, $db);
 
 $query = "SELECT id,firstname,lastname,marketing_list FROM users WHERE role IN ($roles) ORDER BY role DESC, firstname";
 
 $operators = SQL_Query($query, $db);
 SQL_Close($db);
 
 return $operators;
}



function Marketing_Operators_ByCenter($center_id)
{
 $db        = Core_Database_Open(); 
 
 $center_id = SQL_Format($center_id, $db);
 $query     = "SELECT id FROM marketing_id WHERE center_id = $center_id";
 $lists     = SQL_Query($query, $db);
 
 $ids       = array_colunn($lists, "id");
 $ids       = SQL_Format_IN($ids, $db);
 
 $query     = "SELECT id,firstname,lastname,marketing_list,marketing_list_0,marketing_list_1 FROM users WHERE role = 'ceoper' AND marketing_list IN ($ids)";

 $operators = SQL_Query($query, $db);
 SQL_Close($db);
 
 return $operators;
}




function Marketing_Operators_ByTarget($center_id)
{
 $db = Core_Database_Open(); 
 
 $center_id = SQL_Format($center_id, $db);
 $query     = "SELECT id,firstname,lastname,marketing_list,marketing_list_0,marketing_list_1 FROM users WHERE role = 'ceoper' AND center = $center_id";
 
 
 $operators = SQL_Query($query, $db);
 SQL_Close($db);
 
 return $operators;
}




function Marketing_Operator_Stats($id, $date_from = false, $date_to = false, $utc = false)
{
 $stats = [];
 $db    = Core_Database_Open(); 
 
 
 // DATES
 if(!$date_from) $date_from = "19700101000000";
 if(!$date_to)   $date_to   = Date_Now();
 
 if(!$utc)
 {
  $date_from = User_Date($date_from, "in");
  $date_to   = User_Date($date_to,   "in");
 }

 $date_from = SQL_Format(Date_Format_As($date_from, "no-seconds"), $db);
 $date_to   = SQL_Format(Date_Format_As($date_to, "no-seconds"), $db);
 
 $query             = "SELECT date_call, outcome, duration FROM marketing_contacts WHERE user_id = $id AND date_call BETWEEN $date_from AND $date_to ORDER BY date_call ASC";
 $data              = SQL_Query($query, $db);
 $stats["contacts"] = $data;
 
 SQL_Close($db);
 
 
 if(!$utc)
 {
  User_Date_Process($stats["contacts"], ["date_call"], "out");
 }

 
 return $stats;
}


function Marketing_Operator_SetList($operator_id = -1, $list_id)
{
 if($operator_id == -1) $operator_id = $_SESSION["user"]["id"];
 
 $db = Core_Database_Open(); 
 
 // GET CURRENTLY USED LEAD
 $data    = SQL_Query("SELECT marketing_lead FROM users WHERE id = $operator_id", $db);
 $user    = $data[0];
 $lead_id = $user["marketing_lead"];
 
 // FREE LEAD
 if($lead_id)
 {
  SQL_Query("UPDATE marketing_leads SET operator_id = NULL WHERE id = $lead_id", $db);
 }
 
 // SET LIST AND RESET OPERATOR'S LEAD
 SQL_Query("UPDATE users SET marketing_list = $list_id, marketing_lead = NULL WHERE id = $operator_id", $db);
 
 
 SQL_Close($db);
}



// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                          C A L L                                               //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//



function Marketing_Call_AssignLead($operator_id, $lead_id, $connection = false)
{
 if($connection) $db = $connection; else $db = Core_Database_Open(); 
 
 SQL_Query("UPDATE marketing_leads SET operator_id = $operator_id, outcome_last = NULL WHERE id = $lead_id", $db);
 SQL_Query("UPDATE users SET marketing_lead = $lead_id WHERE id = $operator_id", $db);
 
 if(!$connection) SQL_Close($db);
}






function Marketing_Call_GetLead($operator_id = -1, $fields = "*", $options = [])
{
 // INIT
 $lead   = false;
 
 if($operator_id == -1) $operator_id = $_SESSION["user"]["id"];
 $db = Core_Database_Open(); 
 
 $date = Date_Format_NoSeconds(Date_Now());
 $date = SQL_Format($date, $db);
 
 if($options["mode"] == "lead")
 {
  $lead_id = $options["lead_id"];
  $leads   = SQL_Query("SELECT $fields FROM marketing_leads WHERE id = $lead_id", $db); 
  $lead    = $leads[0];
 }
 else
 {
  // GET OPERATOR 
  $data     = SQL_Query("SELECT marketing_lead, marketing_list FROM users WHERE id = $operator_id", $db);
  $operator = $data[0];
 }
 

 // HAS AN ASSIGNED LEAD? GET IT
 if(!$lead)
 {
  if($operator["marketing_lead"]) 
  {
   $lead_id = $operator["marketing_lead"];
   
   // GET LEAD
   $leads   = SQL_Query("SELECT $fields FROM marketing_leads WHERE id = $lead_id", $db);
   
   // LEAD MUST EXIST
   if(count($leads) > 0)
   {
    $lead    = $leads[0];
    $lead["reason"] = "current";  
   }	
   
  } 
 }
 
 
 // HAS A PENDING LEAD FOR ANY REASON? GET IT
 if(!$lead)
 {
  // CHECK LEADS
  $leads   = SQL_Query("SELECT $fields FROM marketing_leads WHERE (operator_id = $operator_id) AND (date_nouse < $date) AND (outcome_last IS NULL OR (outcome_last <> 'rec' AND outcome_last <>'eng'))", $db);
  
  if(count($leads) > 0)
  {
   $lead = $leads[0]; 
   $lead["reason"] = "pending";
  }
 }
 
 
 
 // HAS A RECALL COMING UP?
 if(!$lead)
 {
  $recalls = Triggers_List($operator_id, ["tmkrec"], "late", 1);  
  if(count($recalls) > 0)
  {
   $recall  = $recalls[0];
   $lead_id = $recall["data"];
   $leads   = SQL_Query("SELECT $fields FROM marketing_leads WHERE id = $lead_id", $db);
   
   if(count($leads) == 0)
   {
	SQL_Query("DELETE FROM marketing_contacts WHERE lead_id = $lead_id", $db);
   }
   else
   {
    $lead           = $leads[0];
    $lead["reason"] = "recall"; 
   }
   
   Triggers_Delete($recall["id"]);   
  }
 }
 


 // HAS A LIST? EXTRACT A NEW LEAD FROM THE LIST
 if(!$lead)
 { 
  if($operator["marketing_list"]) 
  {
   // SELECT RANDOM FROM LIST
   $list_id = $operator["marketing_list"];
    $leads   = SQL_Query("SELECT $fields FROM marketing_leads WHERE (list_id = $list_id) AND (operator_id IS NULL) AND (date_nouse < $date) AND (outcome_last IS NULL OR (outcome_last <> 'rec' AND outcome_last <> 'eng')) ORDER BY order_id  LIMIT 1", $db);
  
   // FOUND ONE? ASSIGN IT AND RETURN IT  
   if(count($leads) > 0)
   { 
    $lead = $leads[0];	
	$lead["reason"] = "list";
   }
  }
 }
 
 
 
 
 // IF A LEAD IS SELECTED, PERFORM A FEW OPERATIONS ON IT
 if($lead)
 {
  $lead_id             = $lead["id"];
  $lead["operator_id"] = $operator_id; 
  
  // 1. MARK LEAD AS OWNED BY OPERATOR
  Marketing_Call_AssignLead($operator_id, $lead_id, $db);
  
  
  // 3. COMPLEMENT LEAD WITH CONTACTS
  $contacts = SQL_Query("SELECT * FROM marketing_contacts WHERE (lead_id = $lead_id) ORDER BY date_call DESC", $db);
  
  // CONTACTS UTC DATES
  foreach($contacts as &$contact)
  {
   foreach(["date_call", "date_recall"] as $date)
   {
    if(isset($contact[$date]))
    {
     $contact[$date] = User_Date($contact[$date], "out");
    }
   }
  }
  
  Users_Integrate($contacts, "user_id", "id,firstname,lastname", $container = "operator");
  
  $lead["contacts"]    = $contacts;
 }
 
 SQL_Close($db);

 return $lead;
}





function Marketing_Call_ListRecalls($operator_id = -1, $leads = false, $days = 30, $utc = false)
{
 if($operator_id == -1) $operator_id = $_SESSION["user"]["id"];	

 //$date_from = Date_Format_NoSeconds(Date_Now());
 //$date_to   = Date_Format_NoSeconds(Date_Add_Days($date, $days));
 
 $db      = Core_Database_Open(); 
 
 // AND date_recall IS NOT NULL AND date_recall BETWEEN $date_from AND $date_to
 $recalls = Triggers_List($operator_id, ["tmkrec"], "future");
 $ids     = array_column($recalls, "id");
 
 if(count($ids) > 0)
 {
  $ids     = SQL_Format_IN($ids, $db);
  $query   = "SELECT id, lead_id , date_recall, notes FROM marketing_contacts WHERE recall_id IN ($ids) ORDER BY date_recall ASC";
  $recalls = SQL_Query($query, $db);
 }
 else
 {
  $recalls = [];
 }
 
 if($leads && (count($recalls) > 0))
 {
  $ids   = array_column($recalls, "lead_id");
  $ids   = SQL_Format_IN($ids, $db);

  $leads = SQL_Query("SELECT * FROM marketing_leads WHERE id IN ($ids)", $db);
  $leads = Marketing_Leads_CenterFromList($leads, "center");
  
  foreach($recalls as &$recall)
  {
   foreach($leads as $lead)
   {
    if($recall["lead_id"] == $lead["id"])
	{
     $recall["lead"] = $lead;
	
     break;
	}	
   }		
  } 
  
 }
 
 SQL_Close($db);
 
 if(!$utc) User_Date_Process($recalls, ["date_recall"], "out");
 return $recalls;
}




function Marketing_Call_NewContact($contact, $release = false, $date_nouse = false, $utc = false)
{ 
 $db = Core_Database_Open(); 
 
 
 // INIT  
 $lead_id = $contact["lead_id"];
 $user_id = $contact["user_id"];
 
 foreach(["date_call", "date_recall"] as $date)
 {
  if(isset($contact[$date]) && ($contact[$date] !== -1))
  {
   $contact[$date] = User_Date($contact[$date], "in");
  }
 }

 
 
 // IF DATE_NOUSE SET, MARK THE LEAD IMMEDIATELY
 if($date_nouse)
 {
  $date_nouse = SQL_Format($date_nouse, $db);
  SQL_Query("UPDATE marketing_leads SET date_nouse = $date_nouse WHERE id = $lead_id", $db);
 }
 

 
 // IF A DATE_RECALL IS SET...
 if($contact["date_recall"] && $contact["date_recall"] != -1)
 {
  // DELETE EXISTING TRIGGERS WITH THE SAME lead_id
  Triggers_Delete_ByData($lead_id);
 
  // CREATE NEW TRIGGER
  $recall_id            = Triggers_New($user_id, "tmkrec", $contact["date_recall"], $lead_id);
  $contact["recall_id"] = $recall_id;
 }
 
 
 
 // GET SOME FIELDS FROM THE LEAD
 $leads   = SQL_Query("SELECT center, course FROM marketing_leads WHERE id = $lead_id", $db);
 $lead    = $leads[0];
 $contact = array_merge($contact, $lead);
 
 
 // CREATE CONTACT
 $insert = SQL_Fields_Insert($contact, $db);
 $query  = "INSERT INTO marketing_contacts $insert";
 $id     = SQL_Query($query, $db);
 
 
 // RELEASE LEAD FROM OPERATOR?
 if($release)
 {
  SQL_Query("UPDATE marketing_leads SET operator_id = NULL WHERE id = $lead_id", $db);
 }

 $outcome = SQL_Format($contact["outcome"], $db);
 SQL_Query("UPDATE marketing_leads SET outcome_last = $outcome WHERE id = $lead_id", $db);
 
 
 // MOVE OPERATOR TO NEXT LEAD
 SQL_Query("UPDATE users SET marketing_lead = NULL WHERE id = $user_id", $db);
 
 
 SQL_Close($db);
 return $id;
}





// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                     C O N T A C T S                                            //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//



function Marketing_Contacts_New($contact, $release = false, $utc = false)
{ 
 $db = Core_Database_Open(); 
 
 foreach(["date_call", "date_recall"] as $date)
 {
  if(isset($contact[$date]) && $contact[$date])
  {
   $contact[$date] = User_Date($contact[$date], "in");
  }
 }
 
 $lead_id = $contact["lead_id"];
 $user_id = $contact["user_id"];
 
 // MARK ALL EXISTING RECALLS TO THE SAME LEAD AS RECALLED
 SQL_Query("UPDATE marketing_contacts SET recalled = TRUE WHERE user_id = $user_id AND lead_id = $lead_id", $db);
 
 // CREATE CONTACT
 $insert = SQL_Fields_Insert($contact, $db);
 $query  = "INSERT INTO marketing_contacts $insert";
 $id     = SQL_Query($query, $db);
 
 // MOVE OPERATOR TO NEXT LEAD
 $user_id = $contact["user_id"];
 SQL_Query("UPDATE users SET marketing_lead = NULL WHERE id = $user_id", $db);
 
 // RELEASE LEAD FROM OPERATOR?
 if($release)
 {
  SQL_Query("UPDATE marketing_leads SET operator_id = NULL, outcome_last = NULL WHERE id = $lead_id", $db);
 }
 else
 {
  $outcome = SQL_Format($contact["outcome"], $db);
  SQL_Query("UPDATE marketing_leads SET outcome_last = $outcome WHERE id = $lead_id", $db);
 }
 
 SQL_Close($db);
 
 return $id;
}




function Marketing_Contacts_List($operator_id = false, $date_from = false, $date_to = false, $outcomes = false, $info = [], $utc = false)
{
 $db         = Core_Database_Open();
 $conditions = [];
 
 
 // SPECIFIC USER?
 if($operator_id)
 {
  array_push($conditions, "(user_id = $operator_id)");
 }
 
 
 // SPECIFIC OUTCOMES?
 if($outcomes)
 {
  $outcomes = SQL_Format_IN($outcomes, $db);
 
  array_push($conditions, "outcome IN ($outcomes)");
 }
 
 
 // DATE FROM
 if(!$date_from) 
 {
  $date_from = Date_Now();
  $date_from = Date_Format_As($date_from, "date-only") . "0000";
 }
 else
 {
  if(!$utc) $date_from = User_Date($date_from, "in");
  $date_from = Date_Format_As($date_from, "no-seconds");
 }
 
 
 // DATE TO
 if(!$date_to) 
 {
  $date_to = Date_Now();
  $date_to = Date_Format_As($date_to, "date-only") . "2359";
 }
 else
 {
  if(!$utc) $date_to = User_Date($date_to, "in");
  $date_to = Date_Format_As($date_to, "no-seconds");
 }
 
 array_push($conditions, "(date_call BETWEEN $date_from AND $date_to)");
 
 
 
 // COMPILE CONDITIONS
 $conditions = implode(" AND ", $conditions);
 

 // QUERY
 $query = "SELECT * FROM marketing_contacts WHERE $conditions ORDER BY date_call ASC";
 $data  = SQL_Query($query, $db); 
  
  
 if($info && $info["leads"])
 { 
  $data = SQL_Data_Integrate($db, $data, "lead_id", "marketing_leads", "id", $fields = "name,student_id", "lead");
  return $data;
 }
 
 
 SQL_Close($db);
 
 // PROCESS DATES
 if(!$utc) User_Date_Process($data, "date_call", "out");
 
 return $data;
}




function Marketing_Contact_Set($id, $field, $value)
{
 $db = Core_Database_Open(); 
 
 $value = SQL_Format($value, $db);
 $call  = SQL_Query("UPDATE marketing_contacts SET $field = $value WHERE id = $id", $db);
 
 SQL_Close($db);
}



function Marketing_Contact_Read($id, $case = false, $lead = false)
{
 $db = Core_Database_Open(); 
 
 $calls = SQL_Query("SELECT * FROM marketing_contacts WHERE id = $id", $db);
 $call  = $calls[0];
 

 $lead_id      = $call["lead_id"];
 $leads        = SQL_Query("SELECT student_id, name, phone_mobile, email FROM marketing_leads WHERE id = $lead_id", $db);
 $call["lead"] = $leads[0];
 
 
 if($case)
 {
  $survey         = SQL_Query("SELECT * FROM marketing_contacts_questions WHERE contact_id = $id", $db);
  $survey         = Array_Catalog_ByField($survey, "question", true);
  $call["survey"] = $survey;
  
  
  // READ CASE ACTIONS
  $actions         = SQL_Query("SELECT * FROM marketing_contacts_actions WHERE contact_id = $id ORDER BY date DESC", $db);
  $call["actions"] = $actions;
 }
 
 SQL_Close($db);
 
 return $call;
}


function Marketing_Contact_RecordAction($id, $user, $department, $action, $outcome)
{
  $db = Core_Database_Open(); 
  
  $user       = SQL_Format($user,   $db);
  $department = SQL_Format($department, $db);
  $action     = SQL_Format($action, $db);
  $outcome    = SQL_Format($outcome, $db);
  
  $date        = Date_Now();
  
  $last = SQL_Query("SELECT date FROM marketing_contacts_actions WHERE contact_id = $id ORDER BY date DESC LIMIT 1", $db);
  if(count($last) == 0)
  {
   $action_time = 0;
  }
  else
  {
   $action_time = Date_Distance_Minutes($date, $last[0]["date"]);
  }
  
  $id = SQL_Query("INSERT INTO marketing_contacts_actions (contact_id, user, department, action, outcome, date, action_time) VALUES($id, $user, $department, $action, $outcome, $date, $action_time)", $db);
  
  SQL_Close($db);
  
  return $id;
}




function Marketing_Contact_DeleteAction($id)
{
 $db = Core_Database_Open(); 
 
 SQL_Query("DELETE FROM marketing_contacts_actions WHERE id = $id", $db);
 
 SQL_Close($db);
}






// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                       S U R V E Y                                              //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//


function Marketing_Survey_Set($contact_id, $question, $department, $answer)
{
 $db = Core_Database_Open(); 
 
 $question   = SQL_Format($question, $db);
 $answer     = SQL_Format($answer, $db);
 $department = SQL_Format($department, $db);
 
 SQL_Query("INSERT INTO marketing_contacts_questions (contact_id, question, department, answer) VALUES($contact_id, $question, $department, $answer) ON DUPLICATE KEY UPDATE answer = $answer, department = $department", $db); 
 
 SQL_Close($db);
}










// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                        S T A T S                                               //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//


function Marketing_Stats_Appointments($date_from = false, $date_to = false, $types = false, $centers = false, $options = [])
{
 // INIT
 $stats = [];
 $db    = Core_Database_Open(); 
 
 // ASSEMBLE CONDITIONS
 $conditions = [];
 
 if(!$date_from) 
 {
  $date_from = "197001010000";
 }
 else
 {
  if(!$options["utc"]) $date_from = User_Date($date_from, "in");
  $date_from = Date_Format_As($date_from, "no-seconds");
 }
 
 if(!$date_to) 
 {
  $date_to = "210001012359";
 }
 else
 {
  if(!$options["utc"]) $date_to = User_Date($date_to, "in");
  $date_to = Date_Format_As($date_to, "no-seconds");
 }
 
 array_push($conditions, "(date BETWEEN $date_from AND $date_to)");

 if($centers) 
 {
  $centers = SQL_Format_IN($centers, $db);
  array_push($conditions, "center_id IN ($centers)");
 }
 
 if($types) 
 {
  $types = SQL_Format_IN($types, $db);
  array_push($conditions, "type IN ($types)");
 }
 
 $conditions = implode(" AND ", $conditions);
 
 
 // QUERY
 $data = SQL_Query("SELECT center_id, outcome, date FROM users_appointments WHERE $conditions ORDER BY center_id, date ASC", $db);
 SQL_Close($db);
 
 
 // FORMAT STATS
 foreach($data as &$item) $item["date"] = Date_Format_As($item["date"], "date-only");
 
 $stats = Array_Catalog_ByField($data, "center_id");
 
 $keys  = array_keys($stats);
 foreach($keys as $key)
 {
  $stats[$key] = Array_Catalog_ByField($stats[$key], "date");
 }
 
 return $stats;
}



function Marketing_Stats_Calls($date = false, $operators = -1, $utc = false)
{
 // INIT
 $stats = [];
 
 if($operators == -1) $operators = $_SESSION["user"]["id"];	

 if(!$date) $date = Date_Now();
 else
 { 
  if(!$utc) $date = User_Date($date, "in");
 }
 $date = Date_Format_As($date, "date-only");
 $date = "$date%";
 
 $db    = Core_Database_Open(); 
 
 if(is_array($operators))
 {
 }
 else
 {
  $operators = SQL_Query("SELECT id FROM users WHERE manager_id = $operators", $db);
  $operators = array_column($operators, "id");
 }
 
 $operators = SQL_Format_IN($operators, $db);
 $date      = SQL_Format($date, $db);  
 $contacts  = SQL_Query("SELECT user_id, outcome FROM marketing_contacts WHERE date_call LIKE $date AND user_id IN ($operators)", $db);
 
 SQL_Close($db);
 
 $stats = [];
 foreach($contacts as $contact)
 {
  $operator = $contact["user_id"];
  $outcome  = $contact["outcome"];
  
  if(!$stats[$operator][$outcome]) $stats[$operator][$outcome] = 0;
  $stats[$operator][$outcome]++;
 }

 return $stats;
}



function Marketing_Reset()
{
 /*
 TRUNCATE marketing_contacts_questions;
TRUNCATE marketing_contacts_actions;
TRUNCATE marketing_contacts;
TRUNCATE marketing_leads;
TRUNCATE marketing_lists;
TRUNCATE users_triggers;
UPDATE users SET marketing_lead = null, marketing_list = null;
*/
}


?>