<?PHP

function Appointments_Load()
{
}




function Appointments_Appointment_Read($id)
{
 $db   = Core_Database_Open();
 $data = SQL_Query("SELECT * FROM users_appointments WHERE id = $id", $db);
 SQL_Close($db);
 
 $appointment = $data[0];
 return $appointment;
}



function Appointments_Appointment_New($date = false, $creator_id = -1, $user_id = -1, $handler_id = -1, $center_id = -1, $lead_id = -1, $text = "", $notes= "", $source = "", $options = [])
{
 if(!$date) $date = Date_Now();
 else
 {
  if(!$options["utc"]) $date = User_Date($date, "in");
 }
 
 $db        = Core_Database_Open();
 
 // BASE INFO
 $center_id = SQL_Format($center_id, $db);
 $text      = SQL_Format($text, $db);
 $notes     = SQL_Format($text, $db);
 $source    = SQL_Format($source, $db);
 $id        = SQL_Query("INSERT INTO users_appointments (date, creator_id, user_id, handler_id, center_id, source, text, notes) VALUES($date, $creator_id, $user_id, $handler_id, $center_id, $source, $text, $notes)", $db); 
 
 
 // SET SOME APPOINTMENT STUFF TAKING FROM THE SOURCE LEAD, IF PROVIDED
 if($lead_id)
 {
  $leads   = SQL_Query("SELECT * FROM marketing_leads WHERE id = $lead_id", $db); 
  $lead    = $leads[0];
  
  $phone   = SQL_Format($lead["phone_mobile"] ?? $lead["phone_landline"], $db);
  $email   = SQL_Format($lead["email"], $db);
  $visitor = SQL_Format(implode(" ", [$lead["firstname"], $lead["lastname"]]), $db);
  $type    = SQL_Format("sales", $db);
  
  SQL_Query("UPDATE users_appointments SET phone = $phone, email = $email, visitor = $visitor, type = $type, lead_id = $lead_id WHERE id = $id", $db);
 }
 
 
 SQL_Close($db);
 
 return $id;
}



function Appointments_Search($user_id = false, $center_id = false, $search = "", $date_from = "19700101", $date_to = "29700101", $options = [])
{
 $conditions = [];
 
 
 // SPECIFIC USER?
 if($user_id)
 {
  array_push($conditions, "(user_id = $user_id OR handler_id = $user_id OR creator_id = $user_id)");
 }
 
 
 // SPECIFIC CENTER?
 if($center_id)
 {
  array_push($conditions, "(center_id = '$center_id')"); 
 }
 
 
 // DATE 
 $date_from = $date_from . "0000";
 $date_to   = $date_to   . "2359";
 
 array_push($conditions, "(date BETWEEN $date_from AND $date_to)");
 
 
 // SEARCH
 array_push($conditions, "(email LIKE '$search%' OR phone LIKE '$search%' OR visitor LIKE '$search%' OR `text` LIKE '%$search%')");
 
 
 // COMPILE CONDITIONS
 $conditions = implode(" AND ", $conditions);
 //return $conditions;
 
 
 // QUERY
 $db   = Core_Database_Open();
 
 // GET APPOINTMENTS
 $query = "SELECT * FROM users_appointments WHERE $conditions ORDER BY date ASC";
 $data  = SQL_Query($query, $db); 
 
 // PROCESS DATES
 User_Date_Process($data, "date", "out");
 
 // RETURN
 SQL_Close($db);
 
 
 return $data;
}






function Appointments_Appointment_Delete($id)
{
 $db   = Core_Database_Open();
 
 SQL_Query("DELETE FROM users_appointments WHERE id = $id", $db); 
 
 SQL_Close($db);
}





function Appointments_Count_ByCenter($center_id, $date_from = false, $date_to = false, $options = [])
{
 Dates_From_To($date_from, $date_to, $options["utc"]);
 
 // QUERY
 $db       = Core_Database_Open();
 
 $center_id = SQL_Format($center_id, $db); 
 $query     = "SELECT COUNT(*) FROM users_appointments WHERE center_id = $center_id AND (date BETWEEN $date_from AND $date_to)";
 $data      = SQL_Query($query, $db); 
 
 SQL_Close($db);
 
 $count = $data[0]["COUNT(*)"];
 return $count;
}






function Appointments_List($user_id = false, $center_id = false, $date_from = false, $date_to = false, $info = [], $options = [])
{
 $conditions = [];
 
 
 // SPECIFIC USER?
 if($user_id)
 {
  array_push($conditions, "(user_id = $user_id OR handler_id = $user_id OR creator_id = $user_id)");
 }
 
 
 // SPECIFIC CENTER?
 if($center_id)
 {
  array_push($conditions, "(center_id = '$center_id')"); 
 }
 
 
 
 
 // DATE FROM
 if(!$date_from) 
 {
  $date_from = Date_Now();
  $date_from = Date_Format_As($date_from, "date-only") . "0000";
 }
 else
 {
  if(!$options["utc"]) $date_from = User_Date($date_from, "in");
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
  if(!$options["utc"]) $date_to = User_Date($date_to, "in");
  $date_to = Date_Format_As($date_to, "no-seconds");
 }
 
 array_push($conditions, "(date BETWEEN $date_from AND $date_to)");
 
 
 
 // COMPILE CONDITIONS
 $conditions = implode(" AND ", $conditions);
 

 
 // QUERY
 $db   = Core_Database_Open();


 // GET APPOINTMENTS
 $query = "SELECT * FROM users_appointments WHERE $conditions ORDER BY date ASC";
 $data  = SQL_Query($query, $db); 

 
 
 // PROCESS DATES
 User_Date_Process($data, "date", "out");
 
 
 
 // GET USERS INFO?
 if(in_array("users", $info))
 {
  // GET USERS NAMES
  $users = [];
  foreach($data as $row)
  {
   foreach(["user_id", "creator_id", "handler_id"] as $field)
   {
    $id = $row[$field];
    if($id && !in_array($id, $users)) array_push($users, $id);
   }
  }
 
 
 
  if(count($users) > 0)
  {
   $users = implode(",", $users);
   $users = SQL_Query("SELECT id,firstname,lastname FROM users WHERE id IN ($users)", $db);
   $users = Array_Catalog_ByField($users, "id", true);
   foreach($users as &$user) unset($user["id"]);
  } 
  
  
  
  // REMAP NAMES TO USERS
  {
   foreach($data as &$row)
   {
    foreach(["user_id", "creator_id", "handler_id"] as $field)
    {
  	$user = $users[$row[$field]];
 	if($user) $row[str_replace("_id", "_info", $field)] = $user;
    }
   }
  }
 }

 
 SQL_Close($db);
 
 
 return $data;
}




function Appointments_Appointment_Set($id, $field, $value)
{
 $db = Core_Database_Open();
 
 $value = SQL_Format($value, $db);
 
 SQL_Query("UPDATE users_appointments SET $field = $value WHERE id = $id", $db);
 
 SQL_Close($db);
}

?>