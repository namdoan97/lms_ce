<?PHP

function Triggers_Load()
{
}



function Triggers_New($user_id = -1, $type = "none", $date = -1, $data = "", $utc = false)
{
 $db = Core_Database_Open();
 
 if($user_id == -1) $user_id = $_SESSION["user"]["id"];
 
 $type = SQL_Format($type, $db); 
 
 if($utc) $date = User_Date($date, "in");
 $date = SQL_Format($date, $db);
 
 $data = SQL_Format($data, $db);
 
 $id = SQL_Query("INSERT INTO users_triggers (user_id, type, date, data) VALUES ($user_id, $type, $date, $data)", $db);
 
 SQL_Close($db);
 
 return $id;
}




function Triggers_Delete($id)
{
 $db = Core_Database_Open();
 
 SQL_Query("DELETE FROM users_triggers WHERE id = $id", $db); 
  
 SQL_Close($db); 
}



function Triggers_Delete_ByData($data)
{
 $db = Core_Database_Open();
 
 SQL_Format($data, $db);
 SQL_Query("DELETE FROM users_triggers WHERE data = $data", $db); 
  
 SQL_Close($db); 
}




function Triggers_List($user_id = -1, $types = false, $mode = "expired", $limit = false)
{
 $db         = Core_Database_Open();
 $conditions = [];
 
 // USER
 if($user_id == -1) $user_id = $_SESSION["user"]["id"];
 array_push($conditions, "user_id = $user_id");


 // TYPES
 if($types)
 {
  $types = SQL_Format_IN($types, $db);
  array_push($conditions, "type IN ($types)");
 }
 

 // DATE
 $date = Date_Format_As(Date_Now(), "no-seconds");
 $date = SQL_Format($date, $db);

 switch($mode)
 {
  case "expired":
	array_push($conditions, "date <= $date");
	$order      = "ORDER BY date DESC";
  break;
  
  case "late":
	array_push($conditions, "date <= $date");
	$order = "ORDER BY date ASC";
  break;
  
  case "upcoming":
  case "future":	
	array_push($conditions, "date > $date");
	$order = "ORDER BY date ASC";
  break;
  
  default:
	 $order = "ORDER BY date DESC";
  break;
 }
 
 // LIMIT
 if(!$limit) $limit = ""; else $limit = "LIMIT $limit"; 

 $conditions = implode(" AND ", $conditions); 
 $data       = SQL_Query("SELECT * FROM users_triggers WHERE $conditions $order $limit", $db);
 
 SQL_Close($db);
 return $data;
}



?>