<?PHP





function Call_Search($mode, $search, $fields = "id, student_id, mobile, email, date")
{
 $db = Core_Database_Open(); 
 
 switch($mode)
 {
  case "student_id":
  case "email":
    $search = "%$search%";
    $search = SQL_Format($search, $db); 
	$query  = "SELECT $fields FROM calls WHERE student_id LIKE $search";
  break;
  
  case "mobile":
	$search = "$search%";
    $search = SQL_Format($search, $db); 
	$query  = "SELECT $fields FROM calls WHERE student_id LIKE $search";
  break;
 }
 
 $calls = SQL_Query($query, $db);
 
 SQL_Close($db);
 
 return $calls;
}



?>