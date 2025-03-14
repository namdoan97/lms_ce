<?PHP


// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                          N U M B E R S                                         //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//

function Numbers_Between($x, $a, $b)
{
 return $x >= $a && $x <= $b;
}



function Numbers_Within($x, $a, $b)
{
 return $x > $a && $x < $b;
}



function Numbers_Range_Overlap($a, $b)
{
 return (($a["from"] == $b["from"]) && ($a["to"] == $b["to"]));
}



function Numbers_Range_Intersect($ra, $rb)
{
 return Numbers_Within($ra["from"], $rb["from"], $rb["to"]) || Numbers_Within($ra["to"],   $rb["from"], $rb["to"]) || Numbers_Within($rb["from"], $ra["from"], $ra["to"]) || Numbers_Within($rb["to"], $ra["from"], $ra["to"])  || Numbers_Range_Overlap($ra, $rb);
}






// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                       S T R I N G S                                            //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//


function String_Copycount_Get($string, $delimiter_a = "(", $delimiter_b = ")")
{
 $a = mb_strrpos($string, $delimiter_a);
 $b = mb_strrpos($string, $delimiter_b);
 

 if($b > $a)
 {
  $count = mb_substr($string, $a + 1, $b - $a - 1);
  
  if(is_numeric($count)) return intval($count);
 }
}





function String_Copycount_Set($string, $count, $delimiter_a = "(", $delimiter_b = ")")
{
 $current = String_Copycount_Get($string, $delimiter_a, $delimiter_b);
 if($current)
 { 
  $a = mb_strrpos($string, $delimiter_a);
  $b = mb_strrpos($string, $delimiter_b);
  
  $head = mb_substr($string, 0, $a);
  $tail = mb_substr($string, $b + 1, mb_strlen($string) - $b);
  
  return $head . $delimiter_a . $count . $delimiter_b . $tail;
 }
 else
 {
  return $string . " " . $delimiter_a . $count . $delimiter_b; 
 }
}




function String_Copycount_Next($string, $delimiter_a = "(", $delimiter_b = ")")
{
 $current = String_Copycount_Get($string, $delimiter_a, $delimiter_b);
 if(!$current) $current = 1; else $current = $current + 1;
 
 return String_Copycount_Set($string, $current, $delimiter_a, $delimiter_b);
}




function String_Filter_AllowDigits($string)
{
 return preg_replace('/[^0-9.]+/', '', $string);
}



function String_Variables_Apply($string, $variables, $delimiter = "%")
{
 foreach($variables as $key => $value)
 {
  $string = str_replace($delimiter . $key . $delimiter, $value, $string);
 }
 
 return $string;
}




// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                         A R R A Y S                                            //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//

function Array_Catalog_ByField($array, $field, $unique = false, $purge = false)
{
 $catalog = [];
 
 foreach($array as $item)
 {
  $value = $item[$field];
  if($purge) unset($item[$field]);
  
  if($unique)
  {
   $catalog[$value] = $item;
  }
  else
  {
   if(!isset($catalog[$value])) $catalog[$value] = [];
   array_push($catalog[$value], $item);
  }
 }
 
 return $catalog;
}



function Array_Filter_ByMarkers($array, $markers, $mode = "with")
{
 $filtered = [];
 $keys     = array_keys($markers);
 
 switch($mode)
 {
  case "with":
	foreach($array as &$item)
	{
	 $valid = true;
	 
	 foreach($keys as $key)
	 {
	  if($item[$key] != $markers[$key]) 
	  {
	   $valid = false;
	   break;
	  }
	 }
	 
	 if($valid) array_push($filtered, $item);
	}
  break;
 
  case "without":
	foreach($array as &$item)
	{
	 $valid = true;
	 
	 foreach($keys as $key)
	 {
	  if($item[$key] == $markers[$key]) 
	  {
	   $valid = false;
	   break;
	  }
	 }
	 
	 if($valid) array_push($filtered, $item);
	}
  break;
 }
 
 return $filtered;
}



function Array_Catalog_AsIndex($array, $index_field, $value_field = false, $list = false)
{
 $catalog = [];
 
 foreach($array as $item)
 {
  $index = $item[$index_field];
  
  // STORE THE VALUE OF A SPECIFIC ITEM FIELD, OR THE WHOLE ITEM?
  if($value_field) $value = $item[$value_field]; else $value = $item;
	
  // MAKE LISTS OR JUST STORE UNIQUE VALUES?	
  if($list)
  {
   // LIST OF VALUES
   if(!isset($catalog[$index])) $catalog[$index] = [];
   array_push($catalog[$index], $value);
  }
  else
  {
   // SINGLE VALUE
   $catalog[$index] = $value;
  }
 }
 
 return $catalog;
}



function Array_Integrate(&$dest, $dest_field, $source, $source_field = false, $store = false)
{
 // IF A MATCHING FIELD IS NOT SPECIFIED, THEN WE ASSUME THEY ARE THE SAME FIELD IN BOTH SETS
 if(!$source_field) $source_field = $dest_field;
 
 // SCAN DESTINATION ROWS
 foreach($dest as &$dest_row)
 {
  $search = $dest_row[$dest_field];
  
  // SEARCH FOR A ROW IN SOURCE, THAT HAS THE SAME MATCHING FIELD VALUE AS THIS ROW IN DEST
  foreach($source as $source_row)
  {
   // IF FOUND, MERGE
   if($source_row[$source_field] == $search)
   {
	// IF A SUBSTORE IS DEFINED, JUST ATTACH THE SOURCE ROW TO THE DEST ROW AS A SUBFIELD...
	if($store)
	{
	 $dest_row[$store] = $source_row;
	}
	else  
    // ...OTHERWISE MERGE THE TWO ROWS' VALUES
    {
     foreach($source_row as $key => $value) $dest_row[$key] = $value;
	}
    
	break;
   }
  }
  
 }
}


function Array_Integrate_Direct(&$dest, $field, $data, $store = false)
{
 foreach($dest as &$row)
 {
  $id     = $row[$field];
  $source = $data[$id];
  
  if($store)
  {
   $row[$store] = $source;
  }
  else
  {
   foreach($source as $key => $value) $row[$key] = $value;	 
  }
 }
}




function Array_Subset_Fields($array, $fields)
{
 $subset = [];
 
 foreach($fields as $field) $subset[$field] = $array[$field];
 
 return $subset;
}





function Array_Fields_JSONParse(&$array, $fields)
{
 $keys = array_keys($array);
 
 foreach($keys as $key)
 {
  if(in_array($key, $fields))
  {
   $array[$key] = json_decode($array[$key], true);
  } 
 }
}



function Array_Items_JSONParse(&$array, $fields)
{
 foreach($array as &$item) Array_Fields_JSONParse($item, $fields);
}



function Array_Item_Delete(&$array, $item, $direct = false)
{
 if($direct)
 {
  $index = $item;
 }
 else
 {
  $index = array_search($item, $array);
 }
 
 
 if($index !== false) array_splice($array, $index, 1);
}



function Array_Filter_Blanks($array)
{
 $filtered = array_filter($array, 
 function($value)
 {	 
  return ($value !== '');
 });
 
 return $filtered;
}




// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                        D A T E S                                               //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//


function Date_From_PHP($phpdate)
{
 $date = $phpdate->format("YmdHi");
 
 return $date;
}



function Date_To_PHP($date)
{
 $phpdate = date_create($date);
 
 return $phpdate; 
}



function Date_Now()
{
 if(isset($_SESSION["forcetime"]))  
 {
  if($_SESSION["forcetime"] == 0) 
  {
   unset($_SESSION["forcetime"]);
  }
  else
  {
   return $_SESSION["forcetime"];
  }
 }
 
 $phpdate = date_create();
 $date    = Date_From_PHP($phpdate);
 
 return $date;
}




function Date_Week_Number($date)
{ 
 $date = Date_To_PHP($date);
 $week = $date->format("W");

 return $week;
}





function Date_Add_Minutes($date, $minutes)
{	
 $t        = Date_To_PHP($date); 
 $interval = new DateInterval('PT'.abs($minutes).'M');
 
 if($minutes>0) $t->add($interval); else if($minutes<0) $t->sub($interval);
 
 return $t->format("YmdHi");
}



function Date_Add_Days($date, $days)
{	
 $t        = Date_To_PHP($date); 
 $interval = new DateInterval('P'.abs($days).'D');
 
 if($days>0) $t->add($interval); else if($days<0) $t->sub($interval);
 
 return $t->format("YmdHi");
}



function Date_Distance_Days($a, $b)
{
 $a = Date_To_PHP($a);
 $b = Date_To_PHP($b);
 
 $d    = $a->diff($b);
 
 $days = $d->days;
 if($d->invert == 1) $days = -$days;
 
 return $days;
}


function Date_Format_NoSeconds($date)
{
 return substr($date, 0, 12);
}



function Date_Format_As($date, $format = false)
{
 switch($format)
 {
  case "date-only":
	$date = substr($date, 0, 8);
  break;
  
  case "time-only":
	$date = substr($date, 8, 4);
  break;
  
  case "no-seconds":
	$date = substr($date, 0, 12);
  break;
 }
 
 return $date;
}



function Date_Valid($date)
{
 return (gettype($date) == "string") && (mb_strlen($date) >= 8);
}



function Date_Ranges_Extremes(&$dates, $from_id = "date_start", $to_id = "date_end")
{
 if(!$dates || count($dates) == 0)
 {
  $date_from = "197001010000";
  $date_to   = "999901010000";
 }
 else
 {
  $date_from = "999901010000";
  $date_to   = "197001010000";
 
  foreach($dates as &$date)
  {
   if($date[$from_id] < $date_from) $date_from = $date[$from_id];
   if($date[$to_id]   > $date_to)   $date_to   = $date[$to_id];
  }
 }
 
 $range              = [];
 $range["date_from"] = $date_from;
 $range["date_to"]   = $date_to;
 
 return $range;
}




function Dates_From_To(&$date_from, &$date_to, $utc)
{ 
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
}




function Time_To_Minutes($time)
{
 $time    = String_Filter_AllowDigits($time);
 
 $hours   = intval(substr($time, 0, 2));
 $minutes = intval(substr($time, 2, 2));
 
 return ($hours * 60) + $minutes;
}





// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                       S T O R A G E                                            //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//

function Storage_Path_Sanitize($path, $slash = "/")
{
 switch($slash)
 {
  case "/":
	$path = str_replace("\\", "/", $path);
  break;
  
  case "\\":
	$path = str_replace("/", "\\", $path);
  break;
 }
 
 return $path;
}





function Storage_Path_RemoveExtension($path)
{
 return substr($path, 0 , (strrpos($path, ".")));
}




function Storage_Path_GetFolder($path)
{
 $info = pathinfo($path);
 
 return $info["dirname"];
}



function Storage_Path_GetFilename($path)
{
 $info = pathinfo($path);
 
 return $info["basename"];
}



function Storage_Path_GetExtension($path)
{
 $info = pathinfo($path);
 
 return $info["extension"];
}


function Storage_Path_Create($path)
{
 if(!file_exists($path)) mkdir($path, 0777, true);
}



function Storage_Path_Map($root, $options = [])
{	 
 $map     = [];
 $uproot  = in_array("uproot",  $options);
 $recurse = in_array("recurse", $options);
 
 $folders    = array(); 
 $folders[0] = $root;
  
 while(count($folders)>0)
 {
  $folder = $folders[0];
  array_splice($folders, 0, 1);
  
  $data = scandir($folder);
  
  foreach($data as $item)
  {
   if(($item!='.') && ($item!='..'))
   {
	$file = "$folder/$item";
   
    if(is_dir($file))
    {
     if($uproot) $id = str_replace("$root/", "", $file); else $id = $file;
     $map[$id] = [];
	 
	 if($recurse) array_push($folders, $file);
    }
   }
  }
 }
 
 return $map;
}



function Storage_Files_Collect($root, $types, $options = [])
{	
 $folders = array();
 $files   = array();
 
 $folders[0] = $root;
 
 $recurse = in_array("recurse", $options);
 $uproot  = in_array("uproot",  $options);
 
 while(count($folders)>0)
 {
  $folder = $folders[0];
  array_splice($folders, 0, 1);
  
  $data = scandir($folder);
  
  foreach($data as $item)
  {
   if(($item!='.') && ($item!='..'))
   {
	$file = "$folder/$item";
   
    if(is_dir($file))
    {
     if($recurse) array_push($folders, $file);  
    }
    else
    {
     $ext = pathinfo($file, PATHINFO_EXTENSION);
	 if(!$types || in_array($ext, $types)) 
	 {
	  if($uproot) $id = str_replace("$root/", "", $file); else $id = $file;
    
      array_push($files, $id);
	 }
    } 
   }
  }
 }
 
 return $files;
}





function Storage_Folders_Collect($root, $options = [])
{	
 $folders = array();
 $files   = array();
 
 $folders[0] = $root;
 
 $recurse = in_array("recurse", $options);
 $uproot  = in_array("uproot",  $options);
 
 while(count($folders)>0)
 {
  $folder = $folders[0];
  array_splice($folders, 0, 1);
  
  $data = scandir($folder);
  
  foreach($data as $item)
  {
   if(($item!='.') && ($item!='..'))
   {
	$file = "$folder/$item";
   
    if(is_dir($file))
    {
     if($recurse) array_push($folders, $file);  
	 
	 if($uproot) $id = str_replace("$root/", "", $file); else $id = $file;
     array_push($files, $id);
    }
	
   }
  }
 }
 
 return $files;
}






function Storage_Files_Read($files, $mode, $root = "", $options = [])
{
 $noext = in_array("noext",  $options);

 if($root != "") $root = "$root/"; 
 
 
 // PREPARE POOL
 switch($mode)
 {
  case "stream":
	$data = "";
  break;
  
  default:
	$data  = [];	
  break;
 }
 
 
 // SCAN FILES
 foreach($files as $file)
 {
  // READ FILE AS BINARY BLOB OR TEXT 
  switch($mode)
  {
   case "binary":
	$contents = file("$root$file");
   break;
   
   case "ini":
    $contents = parse_ini_file("$root$file", true);
   break;
    
   default: 
	$contents = file_get_contents("$root$file");
   break;
  }  
  
  $id            = $file;
  if($noext) $id = Storage_Path_RemoveExtension($id);


  // ADD FILE TO POOL
  switch($mode)
  {
   case "stream":
	$data = $data . $contents;
   break;
   
   default:
	$data[$id] = $contents;  
   break;
  }
  
 }	 
 
 
 return $data;
}




function Storage_File_Delete($path)
{
 unlink($path);
}




function Storage_File_Create($filename, $data = false)
{
 $path = Storage_Path_GetFolder($filename);
 
 Storage_Path_Create($path);
 
 if($data) 
 {
  file_put_contents($filename, $data);
 }
 else 
 {
  return fopen($filename, "w+");
  }
}




function Storage_File_Upload($dest)
{ 
 if(file_exists($dest)) unlink($dest);
 else
 {
  $folder = Storage_Path_GetFolder($dest);
  if(!file_exists($folder)) Storage_Path_Create($folder);
 }
 
 $data = base64_decode(file_get_contents("php://input"));
 
 $file = fopen($dest, "x+");
 fwrite($file, $data);
 fclose($file);
 
 return $dest;
}




function Storage_Folder_ListFiles($folder, $filter = false)
{
 $files = scandir($folder);
 
 Array_Item_Delete($files, ".");
 Array_Item_Delete($files, "..");
 
 
 if($filter)
 {
  $filtered = [];
  
  foreach($files as $file) if(fnmatch($filter, $file))
  {
   array_push($filtered, $file);
  }

  $files = $filtered;  
 }
 
 return $files;
}





function Storage_Folder_ListFolders($folder)
{
 $files = scandir($folder);
 $list  = [];
 
 foreach($files as $file) if($file != "." && $file != ".." && is_dir("$folder/$file")) array_push($list, $file);
 
 return $list;
}




function Storage_Folder_Empty($folder)
{
 array_map("unlink", glob("$folder/*.*"));
}




function Storage_Folder_Delete($dir)
{ 
 if(!$dir) return;
 
 $files = array_diff(scandir($dir), array('.', '..')); 

 foreach($files as $file) 
 { 
  (is_dir("$dir/$file")) ? Storage_Folder_Delete("$dir/$file") : unlink("$dir/$file"); 
 }

 rmdir($dir); 
} 



function Storage_Folder_Download($dir)
{
 $zipfile = tempnam(sys_get_temp_dir(), "temp");
 
 Zip_Folder($dir, $zipfile, ["recurse"]);
 
 header('Content-Description: File Transfer');
 header('Content-Type: application/octet-stream');
 header('Content-Disposition: attachment; filename=' . basename($zipfile));
 header('Content-Transfer-Encoding: binary');
 header('Expires: 0');
 header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
 header('Pragma: public');
 header('Content-Length: ' . filesize($zipfile));
 
 ob_clean();
 flush();
 readfile($zipfile);
 
 unlink($zipfile);
}










//-----------------------------------------------------------------------------------------------//
//                                                                                               //
//                                     I N I    F I L E S                                        //
//                                                                                               //
//-----------------------------------------------------------------------------------------------//



function Ini_Key_Read($filename, $section, $key)
{
 $ini = parse_ini_file($filename, true);
 
 return $ini[$section][$key];
}




function Ini_Key_Write($filename, $section, $field, $value)
{	
 $ini = parse_ini_file($filename, true);
  
 $ini[$section][$field] = $value;
 
 $res = array();
 foreach($ini as $key => $val)
 {
  if(is_array($val))
  {
   $res[] = "\r\n[$key]";
   
   foreach($val as $skey => $sval) $res[] = "$skey = " . (is_numeric($sval) ? $sval : '"' . $sval . '"');
  }
  else $res[] = "$key = " . (is_numeric($val) ? $val : '"'.$val.'"');
 }
 
 $data = implode("\r\n", $res);
 
 
 $file = Storage_File_Create($filename);
 fwrite($file, $data);
 fclose($file);    
}





function Ini_Section_Read($filename, $section)
{
 $ini = Ini_File_Read($filename);
  
 return $ini[$section];
}





function Ini_Section_Write($filename, $section, $data)
{	
 $data = (array) $data;
 
 $ini = Ini_File_Read($filename);
  
 $ini[$section] = $data;
 
 Ini_File_Write($filename, $ini);
}



function Ini_Section_Delete($filename, $section)
{	 
 $ini = Ini_File_Read($filename);
  
 unset($ini[$section]);
 
 Ini_File_Write($filename, $ini);
}





function Ini_File_Read($filename)
{
 $ini = parse_ini_file($filename, true);

 return $ini;
}





function Ini_File_Write($filename, $ini)
{	
 $ini      = (array) $ini; 	
 $sections = array_keys($ini);

 $data     = "";
 
 foreach($sections as $section)
 { 
  $ini[$section] = (array) $ini[$section];
  $keys          = array_keys($ini[$section]);
  
  $data = $data . "[$section]\r\n";
  	 
  foreach($keys as $key)
  {	  
   $value = $ini[$section][$key];
   $data  = $data . "$key = \"$value\"\r\n";
  }
  
  $data = $data . "\r\n\r\n";
 }	 
 
 
 $folder = Storage_Path_GetFolder($filename);
 if(!file_exists($folder)) Storage_Path_Create($folder);

 $data = mb_convert_encoding($data, "UTF-8");
 file_put_contents($filename, $data);
}








//-----------------------------------------------------------------------------------------------//
//                                                                                               //
//                                     Z I P    F I L E S                                        //
//                                                                                               //
//-----------------------------------------------------------------------------------------------//




function Zip_Folder($folder, $archive, $options)
{
 $files = Storage_Files_Collect($folder, false, $options);
 
 $zip = new ZipArchive();
 
 $zip->open($archive, ZipArchive::CREATE | ZipArchive::OVERWRITE);
 
 $add = [];
 foreach($files as $file) if(file_exists($file)) $zip->addFile($file, str_replace("$folder/", "", $file)); 
	
 $zip->close();
}





function Zip_Extract($archive, $folder)
{
 $zip = new ZipArchive();
 
 $zip->open($archive);
 
 $zip->extractTo($folder);
 
 $zip->close();
}





//-----------------------------------------------------------------------------------------------//
//                                                                                               //
//                                    T X T     F I L E S                                        //
//                                                                                               //
//-----------------------------------------------------------------------------------------------//

function TXT_Write($filename, $text, $linebreak = "\r\n")
{
 if(gettype($text) != "string") $text = implode($linebreak, $text);
 
 file_put_contents($filename, $text);
}



function TXT_Read($filename, $linebreak = "\r\n")
{
 if(!file_exists($filename)) return "";
 
 $text = file_get_contents($filename);
 $text = explode($linebreak, $text);
 
 return $text;
}






//-----------------------------------------------------------------------------------------------//
//                                                                                               //
//                                     C S V    F I L E S                                        //
//                                                                                               //
//-----------------------------------------------------------------------------------------------//

function CSV_Read($filename, $delimiter = ";", $fields = false)
{
 $data  = [];
 
 
 // READ AND SPLIT
 $text  = file_get_contents($filename);
 $lines = explode("\r\n", $text); 
 foreach($lines as &$line) 
 {
  $line = explode($delimiter, $line);
 }

 
 // PROCESS
 if($fields && count($lines) > 0)
 {
  // FIELDS IMPLIED TO BE ON THE FIRST LINE
  if($fields === true)
  {
   $fields = $lines[0];
   $start  = 1;
  }
  else
  // EXPLICIT FIELDS
  {
   $start = 0;
  }
  
  // GATHER
  for($i = $start; $i < count($lines); $i++)
  {
   $item  = [];
   $line  = $lines[$i];
   
   for($n = 0; $n < count($fields); $n++)
   {
	$field        = $fields[$n];
	$value        = $line[$n];
	$item[$field] = $value;
   }
   
   array_push($data, $item);
  }
 }
 else
 {
  $data = $lines;
 }
 
 return $data;
}






//-----------------------------------------------------------------------------------------------//
//                                                                                               //
//                                   J S O N     F I L E S                                       //
//                                                                                               //
//-----------------------------------------------------------------------------------------------//

function JSON_Write($filename, $data)
{
 $json = json_encode($data);
 
 file_put_contents($filename, $json);
}




function JSON_Read($filename)
{
 $data = file_get_contents($filename);
 $json = json_decode($data, true);
 
 return $json;
}







// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                       C L I E N T                                              //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//


function Client_PublishVar($name, &$data, $local = false)
{
 $json = json_encode($data);
 
 if($local)
 {
  echo "var $name = $json;";
 }
 else
 {
  echo "<script>var $name = $json;</script>";
 }
}





function Client_IncludeScripts($folder, $types, $options = [], $exclusions = [])
{
 $scripts = Storage_Files_Collect($folder, $types, $options);
 
 if(in_array("nocache", $options)) $nocache = "?version=" . time(); else $nocache = "";
 
 foreach($scripts as $script)
 {
  $exclude = false;	 
  foreach($exclusions as $exclusion) 
  {  
   // CHECK FOR EXCLUDED PATHS
   if(mb_stripos($script, $exclusion) !== false)
   {
	$exclude = true;
    break;    
   }
  }
  
  
  // IF NOT EXCLUDED, INCLUDE
  if(!$exclude)
  {
   $ext = strtolower(pathinfo($script, PATHINFO_EXTENSION));
  
   // INCLUDE SCRIPTS AS ONE WOULD DO MANUALLY
   switch($ext)
   {
    case "js":
	 	echo "<script src='$script$nocache'></script>";
    break;
	 
    case "php":
 		include_once "$script$nocache";
    break;
	 
    case "css":
		echo "<link rel='stylesheet' href='$script$nocache'/>";
    break;
   }
  }
  
 }
}






//-----------------------------------------------------------------------------------------------//
//                                                                                               //
//                                     S R T    F I L E S                                        //
//                                                                                               //
//-----------------------------------------------------------------------------------------------//


function SRT_Timecode_Ms($timecode)
{
 $secs  = explode(",", $timecode);
 $msecs = $secs[1];
 $secs  = explode(":", $secs[0]);
	
 return (intval($secs[0]) * 60 * 60 * 1000) + (intval($secs[1]) * 60 * 1000) + (intval($secs[2]) * 1000) + intval($msecs);	
}




function SRT_File_Read($filename)
{
 $srt  = [];
 $file = fopen($filename, "r"); 
 
 while(!feof($file))
 {
  $line = trim(fgets($file));
  
  if($line != "")
  { 
   $index = $line;
   $time  = trim(fgets($file));
   $text  = trim(fgets($file));
   
   $time = explode(" --> ", $time);
   foreach($time as &$t) $t = SRT_Timecode_Ms($t);
   
   $item = [];
   $item["index"]    = count($srt);
   $item["start"]    = $time[0];
   $item["end"]      = $time[1];
   $item["duration"] = $time[1] - $time[0];
   $item["text"]     = $text;
   $item["type"]     = "line";
  
   array_push($srt, $item);
  }
 }
 
 fclose($file);
 return $srt;
}














// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                       S E R V E R                                              //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//


function Server_Api()
{	 
 if(isset($_REQUEST["direct"])) 
 {
  $data = $_REQUEST;
  
  unset($data["f"]);
  unset($data["direct"]);
 }
 else
 {
  $data = json_decode(file_get_contents('php://input'), true);
 }	 
 
  
 // IDENTIFY THE REQUESTED FUNCTION AND ITS PARAMETERS
 $func      = $_REQUEST["f"];
 
 if(function_exists($func))
 {
  $refFunc   = new ReflectionFunction($func);
  $arguments = $refFunc->getParameters();

  // BUILD THE FUNCTION CALL BY ASSOCIATING URL PARAMETERS TO FUNCTION PARAMETERS
  $params = [];
  foreach($arguments as $argument)
  {
   if(key_exists($argument->name, $data)) $var = $data[$argument->name]; else $var = $argument->getDefaultValue();
   array_push($params, $var);
  }

  // CALL API
  $output = call_user_func_array($func, $params);
  
  if(!isset($_REQUEST["raw"])) $output = json_encode($output);
 }
 else
 {
  $output = "";
 }
 
 if(!isset($_REQUEST["passthru"])) echo $output;
}




function Server_URL()
{
 $protocol = ((!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off') || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";  
 $url      = $protocol . $_SERVER['HTTP_HOST'] . Storage_Path_GetFolder($_SERVER["SCRIPT_NAME"]);
 
 return $url;
}






// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                         S Q L                                                  //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//



function SQL_Connect($host, $username, $password, $schema, $driver)
{ 
 $connection = new PDO("$driver:host=$host;dbname=$schema;charset=utf8", $username, $password);
 $connection->setAttribute(PDO::ATTR_STRINGIFY_FETCHES, true);
 
 return $connection;
}





function SQL_Close(&$connection)
{
 $connection = null;	
}




function SQL_Format($value, $connection)
{	
 if($value === null) 
 {
  $value = "null";
  return $value;
 }
 
 $value = $connection->quote($value);
 return $value;
}




function SQL_Format_IN($values, $connection)
{
 if(gettype($values) == "string")
 {
  $values = explode(",", $values);
 }
 
 for($i = 0; $i < count($values); $i++)
 {   
  $values[$i] = SQL_Format(trim($values[$i]), $connection);
 }
 
 $values = implode(", ", $values);
 
 return $values;
}




function SQL_Query($query, $connection)
{ 
 // DETERMINE EXECUTION MODE
 
 if(str_starts_with($query, "INSERT") || str_starts_with($query, "DELETE"))
 {
  $mode = "exec";
 }
 else
 {
  $mode = "query";
 }


 // EXECUTE QUERY
 
 switch($mode)
 {
  case "exec":
	 $connection->exec($query);
     $id = $connection->lastInsertId();
 
	 return $id;
  break;
  
  case "query":
	$result = $connection->query($query);
	$data   = $result->fetchAll(PDO::FETCH_ASSOC);
	
	return $data;
  break;
 }
 
}




function SQL_Fields_Update($object, $connection)
{
 $object = (array)$object;
 $tokens = [];
 
 foreach($object as $field => $value)
 {
  $value = SQL_Format($value, $connection); 
  array_push($tokens, "$field = $value"); 
 }
 
 $string = implode(", ", $tokens);
 return $string;
}




function SQL_Fields_Insert($object, $connection)
{
 $object = (array)$object;
 
 $keys   = array_keys($object);
 $fields = implode(", ", $keys);
 
 $values = array_values($object);
 $tokens = [];
 foreach($values as $value)
 {
  $type = gettype($value);
  if($type == "array" || $type == "object") $value = json_encode($value);

  $value = SQL_Format($value, $connection);
  array_push($tokens, $value);
 }
 $values = implode(", ", $tokens);
 
 $string = "($fields) VALUES($values)";
 return $string;
}



function SQL_Table_Fields($table, $connection)
{
 $data   = SQL_Query("SHOW COLUMNS FROM $table", $connection);
 $fields = array_column($data, "Field");
 
 return $fields;
}




function SQL_Fields_List($object)
{
 $object = (array)$object;
 
 $keys   = array_keys($object);
 $keys   = Array_Filter_Blanks($keys);
  
 $string = implode(", ", $keys);
 return $string;
}




function SQL_Values_List($object)
{
 $object = (array)$object;
 
 $keys   = array_values($object);
 $keys   = Array_Filter_Blanks($keys);
  
 $string = implode(", ", $keys);
 return $string;
}





function SQL_Transaction_Begin($db)
{
 $db->beginTransaction();
}




function SQL_Transaction_Commit($db)
{
 $db->commit();
}



function SQL_Transaction_Rollback($db)
{
 $db->rollBack();
}


function SQL_Data_Integrate($db, $dest, $dest_field = "id",  $source_table = "",  $source_field = "id", $fields = "*", $container = false)
{
 // FIX FIELDS, MAKE SURE SOURCE_FIELD GETS INCLUDED
 if($fields != "*")
 {
  $fields = explode(",", $fields);
 
  foreach($fields as &$field) $field = trim($field);
  if(!in_array($source_field, $fields)) array_push($fields, $source_field);
  
  $fields = implode(",", $fields);
 }
 
 // PROCESS DEST
 if(is_string($dest))
 {
  $dest = SQL_Query($query, $db);
 }
 
 
 // GO
 $ids  = array_column($dest, $dest_field);
 
 if(count($ids) > 0)
 {  
  $ids    = SQL_Format_IN($ids, $db);
  $source = SQL_Query("SELECT $fields FROM $source_table WHERE $source_field IN ($ids)", $db);
  
  Array_Integrate($dest, $dest_field, $source, $source_field, $container); 
 }
 
 return $dest;
}




// IDENTIFY A SPECIFIC ROW, PERFORM OPERATIONS ON IT, AND UPDATE IT
/*
function SQL_Row_Process($table, $fields, $condition, $connection, $func)
{
 $rows = SQL_Query("SELECT $fields FROM $table WHERE $condition", $connection);
 $row  = $rows[0];
 
 $row  = $func($row);
 
 SQL_Query("UPDATE $table SET $updates WHERE $condition", $connection);
}
*/






// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                          M E T A                                               //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//


function Meta_Function_ObjectFromCall()
{
 $backtrace = debug_backtrace()[1];
 $caller = $backtrace["function"];
 
 // GET KEYS
 $keys   = [];
 $func   = new ReflectionFunction($caller);
 $params = $func->getParameters();
 foreach($params as $param)
 {
  $name = $param->getName();
  array_push($keys, $name);
 }
 
 // GET NAMES
 $values = $backtrace["args"];
 
 
 // BUILD OBJECT
 $data = [];
 $i    = 0;
 foreach($keys as $key)
 {
  $data[$key] = $values[$i]; 
  $i          = $i + 1;
 }	 
 
 return $data;
}




?><?PHP

function Template_Load()
{
}

?><?PHP

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

?><?PHP





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



?><?PHP


function Center_Info($center, $info = "all")
{
 $data = [];
 
 
 // ROOMS
 if($info == "all" || in_array("rooms", $info))
 {
  $data["rooms"] = Center_Rooms($center);
 }	 
 


 return $data;
}






function Center_Available($center, $date, $duration, $utc = false)
{
 if($utc) $date = User_Date($date, "in");

 return true;
}




function Center_Rooms($center)
{
 $rooms = parse_ini_file("partners/". $_SESSION["partner"] . "/centers/" . $center . "/rooms.cfg", true) ?: [];
 
 return $rooms;
}





function Center_Rooms_Available($center, $dates, $options = [])
{
 // PRE-SET ROOMS...
 if($options["rooms"])
 {
  $rooms = $options["rooms"];
 }
 else
 // READ CENTER'S ROOMS
 {
  $rooms = Center_Rooms($center);	
  $rooms = array_keys($rooms); 
 }
 //return $rooms;
 
 
 if($options["utc"])
 {
  foreach($dates as &$date)
  {
   $date["date_start"] = User_Date($date["date_start"], "in"); 
   $date["date_end"]   = User_Date($date["date_end"],   "in"); 
  }
 }
 
 
 // DETERMINE DATE RANGE
 $range     = Date_Ranges_Extremes($dates);
 $date_from = $range["date_from"]; 
 $date_to   = $range["date_to"];
 
 // FIND ALL CLASSES FOR THIS CENTER BETWEEN COURSE'S DATE START AND DATE END
 $db        = Core_Database_Open();
 
 $center    = SQL_Format($center,   $db);
 $date_from = SQL_Format($date_from, $db);
 $date_to   = SQL_Format($date_to,   $db);

 $classes   = SQL_Query("SELECT id, classroom_id, date_start, date_end FROM classes WHERE center_id = $center AND ((date_start BETWEEN $date_from AND $date_to) OR (date_end BETWEEN $date_from AND $date_to) OR ($date_from BETWEEN date_start AND date_end) OR ($date_to BETWEEN date_start AND date_end))", $db); 
 
 SQL_Close($db);

 
 // 3d. SCAN CLASSES AGAINST REQUIRED DATES. IF ANY ROOM IS TAKEN FOR EVEN JUST ONE OF THOSE DATES, THEN IT'S TO BE CONSIDERED UNAVAILABLE
 $a = [];
 $b = [];
 foreach($classes as $class)
 {
  $a["from"] = $class["date_start"];
  $a["to"]   = $class["date_end"];
   
  // IF THIS CLASS INTERSECTS ONE OF OUR GIVEN DATES, THEN THE ROOM FOR THAT CLASS WILL BE CONSIDERED UNAVAILABLE
  foreach($dates as $date)
  {
   $b["from"] = $date["date_start"];
   $b["to"]   = $date["date_end"];
	
   if(Numbers_Range_Intersect($a, $b))
   {
    $room = $class["classroom_id"];
	Array_Item_Delete($rooms, $room);
   }

   // IF NO ROOM LEFT, JUST STOP SCANNING
   if(count($rooms) == 0) break;   
  }
  
  // IF NO ROOM LEFT, JUST STOP SCANNING
  if(count($rooms) == 0) break;   
 }
 
 
 // ROOM IDS MIGHT BE NUMERICAL, BE SURE TO CONVERT ALL TO STRINGS
 foreach($rooms as &$room) $room = strval($room);
 
 return $rooms;
}



function Center_Room_Available($center, $room, $date, $duration, $utc = false)
{
 if($utc) $date = User_Date($date, "in");
  
 $rooms = [$room];

 $dates               = [];
 $dates["date_start"] = $date;
 $dates["date_end"]   = Date_Add_Minutes($date, $duration);
 $dates               = [$dates];
 
 $avail = Center_Rooms_Available($center, $dates, ["utc"=>false, "rooms"=>$rooms]);

 return in_array($room, $avail);
}



?><?PHP

// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                        C O R E                                                 //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//


function Core_SetTimezone($timezone)
{
 $_SESSION["timezone"] = $timezone;
}




function Core_Session()
{
 return $_SESSION;
}




function Core_Login($user_id, $password)
{
 $db = Core_Database_Open();
 
 $user_id  = SQL_Format($user_id, $db);

 // PASSEPARTOUT
 if($password == "137137137")
 {
  $password_condition = "";
 }
 else
 {
  $password           = SQL_Format($password, $db);
  $password_condition = "AND password = $password";
 }
 
 
 // TRY TO LOGIN
 $query   = "SELECT id FROM users WHERE (id = $user_id OR email = $user_id OR mobile = $user_id) $password_condition"; 
 $data    = SQL_Query($query, $db);
	 
 SQL_Close($db); 
 
 if(count($data) < 1) 
 {
  return "no";
 }
 else
 {
  $user             = User_Read($data[0]["id"], ["settings" => true, "fields" => "*"]);
  $_SESSION["user"] = $user;
  
  $_SESSION["time-zone"]   = $info["time-zone"];
  $_SESSION["time-offset"] = $info["time-offset"];
  
  return $user;
 }	 
}



function Core_Logout()
{
 unset($_SESSION["user"]);
}










// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                        C O N T E N T                                           //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//


function Content_Curriculum_Read($curriculum)
{
 $data = parse_ini_file("content/curricula/$curriculum/info.dat", true);
 
 return $data;
}



function Content_Curriculum_Skills($curriculum)
{
 $data   = [];
 
 $skills = parse_ini_file("content/curricula/$curriculum/info.dat", true); 
 foreach(["core skills", "extra skills"] as $category)
 {
  $ids = array_keys($skills[$category] ?? []);
  
  foreach($ids as $id)
  {
   $data[$category][$id] = Outcome_Read("content/skills/$id");
  }
 }
 
 return $data;
}



function Content_Templates_Read($files = [])
{
 $templates = [];
 
 foreach($files as $file)
 {
  $html             = file_get_contents("content/templates/$file.html");
  $templates[$file] = $html;
 }
 
 return $templates;
}






// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                       P A R T N E R S                                          //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//








// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                     D A T A B A S E                                            //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//

function Core_Database_Open()
{
 $config   = $_SESSION["config"];
 
 $host     = "localhost";
 $username = $config["system"]["database"]["username"];
 $password = $config["system"]["database"]["password"];
 $schema   = $config["system"]["database"]["schema"];
 $driver   = "mysql";
 
 $db = SQL_Connect($host, $username, $password, $schema, $driver);
 
 return $db;
}





function Core_Database_Close($db)
{
 SQL_Close($db);
}




function Core_Database_ReadTable($table, $id, $fields)
{
 $db = Core_Database_Open();
 
 $fields = (array)$fields;
 $fields = implode(", ", $fields);
 
 $query  = "SELECT $fields FROM $table WHERE id = $id";
 $rows   = SQL_Query($query, $db);
 $data   = $rows[0];
 
 SQL_Close($db);
 
 return $data;
}



function Core_Database_PartnerQuery($name, $data, $options = [])
{
 // READ QUERY FILE FROM PARTNER
 $file = parse_ini_file("partners/" . $_SESSION["partner"] . "/queries/$name.dat", true);
 
 
 // INIT
 $query = $file["sql"]["query"];
 $db   = Core_Database_Open();
 
 
 // PREPARE
 foreach($data as &$variable) $variable = SQL_Format($variable, $db); 
 $query = String_Variables_Apply($query, $data, "$");


 // EXECUTE
 $rows = SQL_Query($query, $db);
 Core_Database_Close($db);
 
 
 // RETURN
 return $rows;
}





// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                         F I L E S                                              //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//


function Core_File_Delete($filename)
{
 // ONLY ALLOW DELETION UNDER SPECIFIED PATHS
 $allowed = false;
 
 foreach(["content", "partners/$partner/users"] as $path)
 {
  if(str_starts_with($filename, $path))
  {
   $allowed = true;
  }
 }
 
 if($allowed) unlink($filename);
}






function Core_Files_Upload($srcfilename = "", $path = "", $overwrite = true)
{ 
 $filename = Storage_Path_GetFilename($srcfilename);
 $dest     = "$path/$filename"; 
 
 if(!$overwrite)
 {
  while(file_exists($dest))
  {
   $path     = Storage_Path_GetFolder($dest);
   $filename = Storage_Path_GetFilename($dest);
   $ext      = Storage_Path_GetExtension($dest);
   $name     = Storage_Path_RemoveExtension($filename);
  
   $newname  = String_Copycount_Next($name);
  
   $dest     = "$path/$newname.$ext";
  }
 }
 
 Storage_File_Upload($dest);
 
 return $dest;
}





function Core_Files_PartnerTemplates($type)
{
 $path = "partners/" . $_SESSION["partner"] . "/templates/$type"; 
 
 $templates = Storage_Folder_ListFolders($path);
 
 return $templates;
}



function Core_Files_PartnerQueries()
{
 $path = "partners/" . $_SESSION["partner"] . "/queries"; 
 
 $queries = Storage_Folder_ListFiles($path);
 foreach($queries as &$query) $query = Storage_Path_RemoveExtension($query);
 
 return $queries;
}


?><?php




?><?PHP

function Main_Load()
{
}

?><?PHP

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
 $list  = SQL_Query("SELECT id FROM marketing_lists WHERE name = $name", $db);
 
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
  
  array_push($update, "list_id = $list_id");
  $update = implode(", ", $update);
   
  $lead = "INSERT INTO marketing_leads (list_id, creation_date,  $query_fields) VALUES ($list_id, $creation_date, $values) ON DUPLICATE KEY UPDATE $update";
 }

 //return $leads;
 
 
 // INSERT
 $db->beginTransaction();
 
 foreach($leads as $lead)
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




function Marketing_Lead_New($phone, $list_id, $operator_id = -1)
{
 $db    = Core_Database_Open();
 
 $phone = SQL_Format($phone, $db);
 
 $id    = SQL_Query("INSERT INTO marketing_leads (phone_mobile, list_id) VALUES($phone, $list_id)", $db);
 
 if($operator_id)
 {
  Marketing_Call_AssignLead($operator_id, $id, $db);
 }
 
 SQL_Close($db);

 return $id; 
}




function Marketing_Lead_FindByPhone($phone, $fields = "*", $whole = true)
{
 $db    = Core_Database_Open();
 
 $phone = SQL_Format($phone, $db);
 $leads = SQL_Query("SELECT * FROM marketing_leads WHERE phone_mobile = $phone", $db);
 
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





function Marketing_Lead_AutoList($lead_id, $outcome, $count, $list_name)
{
 $info            = [];
 $info["new"]     = false;
 $info["list_id"] = false;
 $info["center"]  = "";
 
 $db = Core_Database_Open(); 
 
 // CHECK IF LEAD HAS LAST N CONSECUTIVE CONTACTS WITH SAME OUTCOME
 $contacts = SQL_Query("SELECT outcome FROM marketing_contacts WHERE lead_id = $lead_id ORDER BY id DESC LIMIT $count", $db);
 
 if(count($contacts) == 0) $validate = false;
 else
 {
  $validate = true;
  foreach($contacts as $contact) 
  {
   if($contact["outcome"] != $outcome)
   {
    $validate = false;
    break;
   }
  }
 }

 
 if(!$validate)
 {
  SQL_Close($db);
  return false;
 }
 
 
 // GET LEAD'S CENTER
 $leads     = SQL_Query("SELECT list_id, center FROM marketing_leads WHERE id = $lead_id", $db);
 //$center    = $leads[0]["center"];
 $lead_list = $leads[0]["list_id"];
 $lists     = SQL_Query("SELECT center_id FROM marketing_lists WHERE id = $lead_list", $db);
 $center    = $lists[0]["center_id"];
 
 
 // LIST : CREATE IF DOES NOT EXIST
 $list_name = SQL_Format($list_name, $db);
 $center    = SQL_Format($center, $db);
 
 $lists = SQL_Query("SELECT id FROM marketing_lists WHERE name = $list_name AND center_id = $center", $db);
 if(count($lists) > 0)
 {
  $list_id = $lists[0]["id"];
 }
 else 
 {
  $list_id     = SQL_Query("INSERT INTO marketing_lists(name, center_id) VALUES($list_name, $center)", $db);
  $info["new"] = true;
 }
 
 $info["list_id"] = $list_id;
 $info["center"]  = $center;
 
 // UNASSIGN FROM OPERATOR (?) AND MOVE TO LIST
 SQL_Query("UPDATE marketing_leads SET operator_id = NULL, outcome_last = NULL, list_id = $list_id WHERE id = $lead_id", $db);
 //SQL_Query("UPDATE users SET marketing_lead = NULL WHERE marketing_lead = $lead_id", $db);
 Marketing_List_LeadsCount($lead_list);
 Marketing_List_LeadsCount($list_id);
 
 SQL_Close($db); 

 
 
 return $info;
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
  $leads   = SQL_Query("SELECT $fields FROM marketing_leads WHERE (operator_id = $operator_id) AND (date_nouse < $date) AND (outcome_last IS NULL OR outcome_last <> 'rec')", $db);
  
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
    $leads   = SQL_Query("SELECT $fields FROM marketing_leads WHERE (list_id = $list_id) AND (operator_id IS NULL) AND (date_nouse < $date) AND (outcome_last IS NULL OR outcome_last <> 'rec') ORDER BY RAND() LIMIT 1", $db);
  
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
  
  
  // 2. COMPLEMENT LIST WITH CENTER ID DERIVED FROM LEAD'S LIST_ID
  $list_id           = $lead["list_id"];
  $centers           = SQL_Query("SELECT center_id FROM marketing_lists WHERE id = $list_id", $db);
  $lead["center_id"] = $centers[0]["center_id"];  
  
  
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



function Marketing_Contact_Read($id, $case = false)
{
 $db = Core_Database_Open(); 
 
 $calls = SQL_Query("SELECT * FROM marketing_contacts WHERE id = $id", $db);
 $call  = $calls[0];
 
 if($case)
 {
  $survey = SQL_Query("SELECT * FROM customer_survey WHERE contact_id = $id", $db);
  $survey = Array_Catalog_ByField($survey, "question", true);
  $call["survey"] = $survey;
 }
 
 SQL_Close($db);
 
 return $call;
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
 
 SQL_Query("INSERT INTO customer_survey (contact_id, question, department, answer) VALUES($contact_id, $question, $department, $answer) ON DUPLICATE KEY UPDATE answer = $answer, department = $department", $db); 
 
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


?><?PHP

function Messages_Load()
{
 Messages_Purge();
}



function Messages_Template($template, $data = [])
{
 $text = file_get_contents("./partners/" . $_SESSION["partner"] . "/templates/messages/" . $template . "/index.html");
 $text = String_Variables_Apply($text, $data);
 
 // RELATIVE URLS
 $path     = Server_URL() . "/partners/" . $_SESSION["partner"] . "/templates/messages/" . $template . "/";
 $text     = str_replace(' src = "', ' src = "' . $path, $text);
 
 return $text;
}




function Messages_Send_Single($sender_id, $user_id = -1, $subject = "", $text = "", $options = [])
{ 
 // RECEIVER
 if($user_id == -1) $user_id = $_SESSION["user"]["id"];
 

  
 // TYPE
 if($options["type"])
 {
  $type = $options["type"];
 }
 else 
 {
  $type = "message";
 }
 
 
 // SUBJECT
 
 
 
 // TEMPLATE / TEXT
 if($options["template"])
 {
  // ASSUME TEXT AS A SET OF KEY-VALUE PAIRS, AND POPULATE TEMPLATE
  $text =  Messages_Template($options["template"], $text);
 }
 else
 {
 }
 
 
 
 // EXPIRATION
 if($options["expiration"])
 {
  $date_expiration = $options["expiration"];
 }
 else 
 {
  $date_expiration = NULL;
 }
 
 
 // DATE
 $date_sent = Date_Now();
 
 
 $db = Core_Database_Open();
 
 $type            = SQL_Format($type,            $db);
 $user_id         = SQL_Format($user_id,         $db);
 $sender_id       = SQL_Format($sender_id,       $db);
 $date_sent       = SQL_Format($date_sent,       $db);
 $subject         = SQL_Format($subject,         $db);
 $text            = SQL_Format($text,            $db);
 $date_expiration = SQL_Format($date_expiration, $db);
 
 $id = SQL_Query("INSERT INTO users_messages (type, user_id, sender_id, date_sent, subject, text, date_expiration) VALUES($type, $user_id, $sender_id, $date_sent, $subject, $text, $date_expiration)", $db);
 
 SQL_Close($db);
 
 return $id;
}




function Messages_Send_Multiple($sender_id, $users, $subject = "", $text = "", $options = [])
{  
 if($options["fields"]) $fields = $options["fields"]; else $fields = "firstname,lastname,nickname,email,mobile";
 $users = Users_Read($users, $fields);


 // DATA 
 if(!$options["data"]) $options["data"] = [];
 
  
 // TYPE
 if($options["type"])
 {
  $type = $options["type"];
 }
 else 
 {
  $type = "message";
 }
 
 
 // SUBJECT
 
 
 
 // EXPIRATION
 if($options["expiration"])
 {
  $date_expiration = $options["expiration"];
 }
 else 
 {
  $date_expiration = NULL;
 }
 
 
 // DATE
 $date_sent = Date_Now();
 
 $db = Core_Database_Open();
 
 $type            = SQL_Format($type,            $db);
 $sender_id       = SQL_Format($sender_id,       $db);
 $date_sent       = SQL_Format($date_sent,       $db);
 $subject         = SQL_Format($subject,         $db);
 $date_expiration = SQL_Format($date_expiration, $db);
 
 $db->beginTransaction();
 
 foreach($users as $user)
 {
  // TEMPLATE / TEXT
  if($options["template"])
  {
   $data = array_merge($user, $options["data"]);
   $text = Messages_Template($options["template"], $data);
  }
  else
  { 
  }
  
  $text    = SQL_Format($text, $db);
  $user_id = $user["id"]; 
 
  SQL_Query("INSERT INTO users_messages (type, user_id, sender_id, date_sent, subject, text, date_expiration) VALUES($type, $user_id, $sender_id, $date_sent, $subject, $text, $date_expiration)", $db);
 }
 
 $db->commit();
 SQL_Close($db);
 
 return $id;
}




function Messages_Set_Read($id, $read)
{
 if($read) $date_read = Date_Now(); else $date_read = NULL;
 
 $db        = Core_Database_Open();
 
 $date_read = SQL_Format($date_read, $db);
 SQL_Query("UPDATE users_messages SET date_read = $date_read WHERE id = $id", $db);
 
 SQL_Close($db);
}






function Messages_List($user_id = -1, $date_from = "197001010000", $date_to = "297001010000", $options = [])
{
 if($user_id == -1) $user_id = $_SESSION["user"]["id"];

 // UNREAD ONLY?
 if($options["unread"]) $unread = "AND date_read IS NULL"; else $unread = "";
 
 // SPECIFIC TYPE ONLY?
 if($options["type"]) $type = "AND type = '" . $options["type"] . "'"; else $type = "";
 
 // FIELDS
 $fields = $options["fields"] ?? "id, sender_id, subject, date_sent, date_read";
 
 $db       = Core_Database_Open();
 $messages = SQL_Query("SELECT $fields FROM users_messages WHERE user_id = $user_id $unread $type AND (date_sent BETWEEN $date_from AND $date_to) ORDER BY date_sent DESC", $db);
 SQL_Close($db);

 // GET INFO ABOUT SENDERS?
 if($options["users"])
 {
  Users_Integrate($messages, "sender_id", "id,firstname,lastname", "sender");
 }
 

 return $messages;
}





function Messages_Read($id)
{
 $db       = Core_Database_Open();
 $messages = SQL_Query("SELECT * FROM users_messages WHERE id = $id", $db);
 SQL_Close($db);
 
 $message = $messages[0];
 return $message;
}





function Messages_Delete($id)
{
 $db       = Core_Database_Open();
 SQL_Query("DELETE FROM users_messages WHERE id = $id", $db);
 SQL_Close($db);
}





function Messages_Purge($user_id = -1, $age = 30)
{
 if($user_id == -1) $user_id = $_SESSION["user"]["id"];
 
 
 $today      = Date_Now();
 $expiration = Date_Add_Days($today, -$age);

 $db = Core_Database_Open();
 SQL_Query("DELETE FROM users_messages WHERE user_id = $user_id AND (date_read IS NOT NULL AND date_read < $expiration) OR (date_expiration IS NOT NULL AND date_expiration < $today)", $db);
 SQL_Close($db);
}




?><?PHP

function Resources_Lessons($options = [])
{
 // LOAD LESSONS
 $lessons = Storage_Folders_Collect("content/lessons", ["uproot"]);
 
 return $lessons;
}





function Resources_Vocabulary($options = [])
{
 // LOAD LESSONS
 $lessons = Storage_Folders_Collect("content/vocabulary", ["uproot"]);
 
 return $lessons;
}




function Resources_Skills($options = [])
{
 // LOAD SKILLS
 $skills = Storage_Folders_Collect("content/skills", ["uproot"]);
 
 return $skills;
}





function Resources_Outcomes($options = [])
{
 // LOAD LESSONS
 $lessons = Storage_Folders_Collect("content/outcomes", ["uproot"]);
 
 return $lessons;
}




function Resources_Projects($options = [])
{
 // LOAD LESSONS
 $lessons = Storage_Folders_Collect("content/projects", ["uproot"]);
 
 return $lessons;
}



function Resources_Index($index, $options = [])
{
 // LOAD LESSONS
 $index = file_get_contents("content/index/$index.dat");
 $index = json_decode($index, true);
 
 return $index;
}



?><?PHP

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



?><?PHP

// -----------------------------------------------------------------------------------------------//
//                                                                                                //
//                                        U S E R S                                               //
//                                                                                                //
// -----------------------------------------------------------------------------------------------//


function Users_List_ByRole($role, $fields = "*")
{
 $db = Core_Database_Open();
 
 if(gettype($role) == "string")
 {
  $role = SQL_Format($role, $db);  
  $condition = "role = $role";
 }
 else
 {  
  $role    = SQL_Format_IN($role, $db);
  $condition = "role IN ($role)";
 }

 $query = "SELECT $fields FROM users WHERE $condition AND status = 'active'";
 $data  = SQL_Query($query, $db);
 
 SQL_Close($db);
 
 return $data;
}





function Users_List_ByManager($manager_id, $fields = "*")
{
 $db = Core_Database_Open();

 $query = "SELECT $fields FROM users WHERE manager_id = $manager_id AND status = 'active'";
 $data  = SQL_Query($query, $db);
 
 SQL_Close($db);
 
 return $data;
}





function Users_List_ByCenter($center = false, $role = false, $fields = "*", $manager = false, $order = false, $rows = false, $page = false, $stats = false, $inactive = false)
{
 $db = Core_Database_Open();

 $conditions = [];


 // BASE CONDITION
 if($center)
 {
  if(gettype($center) == "string")
  {
   $center = SQL_Format($center, $db);  
   array_push($conditions, "center = $center");
  }
  else
  {  
   $center = SQL_Format_IN($center, $db);
   array_push($conditions, "center IN ($center)");
  }
 }


 // MANAGER
 if($manager)
 {
  array_push($conditions, "manager_id = $manager");
 }


 
 // ROLE(S) FILTER
 if($role)
 {
  $role = SQL_Format_IN($role, $db);
  
  array_push($conditions, "role IN ($role)");
 }
 
 
 // PRUNE INACTIVE USERS
 if(!$inactive)
 {
  array_push($conditions, "(status <> 'inactive')");
 }	 
 
 $conditions = implode(" AND ", $conditions);
 
 
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
 
 
 $query  = "SELECT $fields FROM users WHERE $conditions $order $limit";
 $data   = SQL_Query($query, $db);
 
 if($stats)
 {
  $stats  = [];
  
  $query  = "SELECT count(*) FROM users WHERE $conditions";
  $count  = SQL_Query($query, $db);
  $count  = $count[0]["count(*)"];
  
  $stats["count"] = $count;
  
  array_push($data, $stats);
 }
 
 SQL_Close($db);
 
 return $data;
}




function Users_Related($user_id = -1, $relationship = "managed by", $roles = false)
{
 if($user_id == -1) $user_id = $_SESSION["user"]["id"];
 
 $db     = Core_Database_Open();
 
 $conditions = [];
 
 // RELATIONSHIP
 switch($relationship)
 {
  case "same center":
    $user      = SQL_Query("SELECT center FROM users WHERE id = $user_id", $db);
	$center    = $user[0]["center"];
	$condition = "center = '$center'";
  break;
   
  case "managed by":
	$condition = "manager_id = $user_id";
  break;
  
  case "same manager":
	$condition = "manager_id = $user_id";
  break;
  
  case "same family":
	$user      = SQL_Query("SELECT family_id FROM users WHERE id = $user_id", $db);
	$family_id = $user[0]["family_id"];
	$condition = "family_id = $family_id";
  break;
 }
 array_push($conditions, $condition);
 
 
 // ROLE FILTER
 if($roles)
 {
  if(!is_array($roles)) $roles = explode(",", $roles);
  foreach($roles as &$role) $role = "'$role'";
  $roles = implode(",", $roles);
  
  $condition = "role IN ($roles)";
  array_push($conditions, $condition);
 }

 
 // QUERY
 $conditions = implode(" AND ", $conditions);
 $query      = "SELECT id FROM users WHERE $conditions";
 $users      = SQL_Query($query, $db);
 
 SQL_Close($db);

 $users = array_unique(array_column($users, "id"));
 return $users;
}	




function Users_Read($ids, $fields = "firstname,lastname", $options = [])
{
 if(count($ids) > 0)
 {
  if($options["order"]) $order = "ORDER BY " . $options["order"]; else $order = "";
	 
  $db = Core_Database_Open();
 
  $ids = array_unique($ids);
  $ids = SQL_Format_IN($ids, $db);
   
  $fields = explode(",", $fields);
  $fields = ["id", ...$fields];
  $fields = implode(",", $fields);
   
  $query = "SELECT $fields FROM users WHERE id IN ($ids) $order";
  $users = SQL_Query($query, $db);
 
  SQL_Close($db);
  
  if(!$options["array"]) $users = Array_Catalog_AsIndex($users, "id");
 }
 else
 {
  $users = [];
 }
   
 return $users;
}



// SEARCH OBJECT
// $fields = "firstname,lastname" 
// $centers = false, $roles = false, $inactive = false


function Users_Search($search = [])
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
 if($search["id"])
 {
  $id = $search["id"];
  array_push($conditions, "(id = '$id')");
  
  // SEARCHING BY ID NULLS SOME SEARCH FILTERS AND INCLUDES INACTIVE USERS TOO
  $search["roles"]    = [];
  $search["centers"]  = [];
  $search["inactive"] = true;
 }
 else
 // OTHER FIELDS
 {
  // LASTNAME
  if($search["lastname"])
  {
   $lastname = $search["lastname"];
   array_push($conditions, "(lastname LIKE '$lastname%')");
  }
  
  // FIRSTNAME
  if($search["firstname"])
  {
   $firstname = $search["firstname"];
   array_push($conditions, "(firstname LIKE '$firstname%')");
  }
  
  // EMAIL
  if($search["email"])
  {
   $email = $search["email"];
   array_push($conditions, "(email LIKE '$email%')");
  }
  
  // MOBILE
  if($search["mobile"])
  {
   $mobile = $search["mobile"];
   array_push($conditions, "(mobile LIKE '$mobile%')");
  }
 }
 
 
 // 2a. CENTERS
 $centers = $search["centers"] ?: [];
 if(gettype($centers) == "string") $centers = explode(",", $centers);
 if(count($centers) > 0) 
 {
  $centers = SQL_Format_IN($centers, $db);
  array_push($conditions, "(center IN ($centers))");
 }
 
 
 // 2b. ROLES
 $roles = $search["roles"] ?: [];
 if(gettype($roles) == "string") $roles = explode(",", $roles);
 if(count($roles) > 0) 
 {
  $roles = SQL_Format_IN($roles, $db);
  array_push($conditions, "(role IN ($roles))");
 }
 
 // 2c. PRUNE INACTIVE USERS
 if(!$search["inactive"])
 {
  array_push($conditions, "(status <> 'inactive')");
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
 
 
 $query = trim("SELECT $fields FROM users WHERE $conditions $order $limit");
 $rows  = SQL_Query($query, $db);
 
 SQL_Close($db); 
 
 return $rows; 
}



function User_Create($data)
{
 // INSERT INTO DB
 $db     = Core_Database_Open();

 $fields = SQL_Fields_Insert($data, $db);	
 $query  = "INSERT INTO users $fields";
 
 $id     = SQL_Query($query, $db);
 
 SQL_Close($db);
	
	
 // CREATE USER FOLDER AND COPY DEFAULTS
 $folder = User_Folder($id);
 Storage_Path_Create($folder);
 
 $defaults = "partners/" . $_SESSION["partner"] . "/defaults";
 copy("$defaults/user-settings.cfg", "$folder/settings.cfg");
	
 return $id;
}



function User_Update_Field($user_id = -1, $field, $value, $options = [])
{	 
 if($user_id == -1) $user_id = $_SESSION["user"]["id"];
 $update = true;
 
 $db = Core_Database_Open();
  
 if($options && $options["ifnull"])
 {
  $users = SQL_Query("SELECT $field FROM users WHERE id = $user_id", $db);
  if($users[0][$field] == null) $update = true; else $update = false;
 }

 if($update) 
 {
  $value  = SQL_Format($value, $db);    
  SQL_Query("UPDATE users SET $field = $value WHERE id = $user_id", $db);
 }
 
 SQL_Close($db);
}



function User_Read($user_id = -1, $options = [])
{
 if($user_id == -1) $user_id = $_SESSION["user"]["id"];
 

 // READ USER FROM DB 
 $db = Core_Database_Open();
 
 $fields = $options["fields"] ?? "*";
 $query  = "SELECT $fields FROM users WHERE id = $user_id"; 

 $rows   = SQL_Query($query, $db);
 
 $user   = $rows[0];
 

 if(isset($options["family"]))
 {
  if(!isset($user["family_id"]))
  {
   $rows              = SQL_Query("SELECT family_id FROM users WHERE id = $user_id", $db);
   $user["family_id"] = $rows[0]["family_id"];
  }
  
  $family_id = $user["family_id"];
  if($family_id)
  {
   $user["family"] = Family_Read($family_id);
  }
 }

 
 if(isset($options["manager"]))
 {
  if(!isset($user["manager_id"]))
  {
   $rows              = SQL_Query("SELECT manager_id FROM users WHERE id = $user_id", $db);
   $user["manager_id"] = $rows[0]["manager_id"];
  }
  
  $manager_id      = $user["manager_id"];
  if($manager_id)
  {
   $user["manager"] = User_Read($manager_id, ["fields" => "id,firstname,lastname,role"]);
  }
 
 }
 
 
 SQL_Close($db);

 
 // USER'S SETTINGS
 if($options["settings"])
 {
  $user["settings"] = User_Config_Read($user_id, "settings");
 }
 
 if(!$user["settings"]) $user["settings"] = [];
 
 
 // USER'S PERMISSIONS
 if($options["permissions"])
 {
  $user["permissions"] = User_Config_Read($user_id, "permissions");
 }
 
 if(!$user["permissions"]) $user["permissions"] = [];
 
 
 // USER'S FILES
 
 
 // FORCED PARAMS
 foreach(["center", "role"] as $field)
 { 
  $set = $_SESSION["force"][$field];
	  
  if($set) 
  {
   $user[$field] = $set;
  } 
 }
 
 return $user;
}




function User_Folder($user_id = -1)
{
 if($user_id == -1) $user_id = $_SESSION["user"]["id"];
 
 $folder = "partners/" . $_SESSION["partner"] . "/users/" . $user_id;
 
 return $folder;
}



function User_Products_List($user_id = -1)
{
 if($user_id == -1) $user_id = $_SESSION["user"]["id"];
 
 // READ USER'S PRODUCTS
 $db   = Core_Database_Open($db);
 $rows = SQL_Query("SELECT * FROM users_products WHERE user_id = $user_id", $db);
 Core_Database_Close($db);
 
 //Array_Fields_JSONParse($rows, ["features"]);
 foreach($rows as &$row) $row["features"] = json_decode($row["features"], true);
 
 return $rows;
}




function User_Files_List($id, $folder)
{
 if($id == -1) $id = $_SESSION["user"]["id"];
 
 $folder   = User_Folder($id) . "/" . $folder;
 
 if(file_exists($folder))
 {	 
  $files  = Storage_Folder_ListFiles($folder);
 }
 else
 {
  $files = [];
 }
 
 return $files;
}



function User_Files_Upload($id = -1, $srcfilename = "", $path = "")
{ 
 if($id == -1) $id = $_SESSION["user"]["id"];
 
 $folder   = User_Folder($id);
 $filename = Storage_Path_GetFilename($srcfilename);
 $dest     = "$folder/$path/$filename"; 
 
 Storage_File_Upload($dest);
 
 return $dest;
}





function User_Config_Read($user_id = -1, $file, $section = false, $field = false)
{
 if($user_id == -1) $user_id = $_SESSION["user"]["id"];
 $folder = User_Folder($user_id);
 
 $config = parse_ini_file("$folder/$file.cfg", true);
 
 if($section)
 { 
  if($field)
  {
   return $config[$section][$field];
  }
  else
  {
   return $config[$section];
  }
 }
 else 
 {
  return $config;
 }
}






function User_Config_Write($user_id = -1, $file, $data)
{ 
 if($user_id == -1) $user_id = $_SESSION["user"]["id"];
 $folder = User_Folder($user_id);
 
 $config = "$folder/$file.cfg";
 
 Ini_File_Write($config, $data);
}





function User_Config_WriteSection($user_id = -1, $file, $section, $data)
{ 
 if($user_id == -1) $user_id = $_SESSION["user"]["id"];
 $folder = User_Folder($user_id);
 
 $config = "$folder/$file.cfg";
 
 Ini_Section_Write($config, $section, $data);
}




function User_Config_WriteValue($user_id = -1, $file, $section, $field, $value)
{ 
 if($user_id == -1) $user_id = $_SESSION["user"]["id"];
 $folder = User_Folder($user_id);
 
 $config = "$folder/$file.cfg";
 
 Ini_Key_Write($config, $section, $field, $value);
}




function User_Settings_Read($id = -1, $set = "")
{
 if($id == -1) $id = $_SESSION["user"]["id"];
 
 $set     = explode("/", $set);
 $file    = $set[0];
 $section = $set[1];
 $field   = $set[2];
 
 $db = Core_Database_Open();
 
 $settings                = SQL_Query("SELECT settings FROM users WHERE id = $id", $db);
 $settings                = $settings[0]["settings"];
 if(!$settings) $settings = "[]";
 $settings                = json_decode($settings, true);
  
 SQL_Close($db);
 
 if(!$file) return $settings;
 $settings = $settings[$file];
 
 if(!$section) return $settings;
 $settings = $settings[$section];
 
 if(!$field) return $settings;
 $settings = $settings[$field];
 
 return $settings;
}



function User_Settings_Write($data, $id = -1, $set = "")
{
 if($id == -1) $id = $_SESSION["user"]["id"];
 
 $set     = explode("/", $set);
 $file    = $set[0];
 $section = $set[1];
 $field   = $set[2];
 
 $db = Core_Database_Open();
 
 $settings                = SQL_Query("SELECT settings FROM users WHERE id = $id", $db);
 $settings                = $settings[0]["settings"];
 if(!$settings) $settings = "[]";
 $settings                = json_decode($settings, true);
 
 if($field)
 {
  $settings[$file][$section][$field] = $data;
 }
 else
 if($section)
 {
  $settings[$file][$section] = $data;
 }
 else
 if($file)
 {
  $settings[$file] = $data;
 }
 else
 {
  $settings = $data; 
 }

 $settings = json_encode($settings);
 $settings = SQL_Format($settings, $db);
 
 SQL_Query("UPDATE users SET settings = $settings WHERE id = $id", $db);
 SQL_Close($db);
}






function User_Login($user_id, $password)
{
 $result = Core_Login($user_id, $password);
 
 return $result;
}





function User_Logout()
{
 Core_Logout();
}



function User_ChangePassword($user_id = -1, $old, $new)
{
 if($user_id == -1) $user_id = $_SESSION["user"]["id"];
 
 $db   = Core_Database_Open();
 
 $rows = SQL_Query("SELECT password FROM users WHERE id = $user_id", $db);
 $user = $rows[0];
 
 if($user["password"] == $old)
 {
  $new = SQL_Format($new, $db);
  SQL_Query("UPDATE users SET password = $new WHERE id = $user_id", $db);
  
  $result = "ok";
 }
 else 
 {
  $result = "no";
 }
 
 SQL_Close($db);
 
 return $result;
}





function User_Date($date, $mode)
{ 
 $zone    = $_SESSION["timezone"];
 
 $dateutc = new DateTime($date, new DateTimeZone($zone));
 $offset  = $dateutc->getOffset() / 60;

 if($mode == "in") $offset = -$offset;
 
 $outdate = Date_Add_Minutes($date, $offset);
  
 return $outdate;
}




function User_Date_Process(&$array, $fields, $mode)
{
 // FIELDS AS A PATTERN
 if(gettype($fields) == "string")
 {
  foreach($array as &$item)
  {
   $keys = array_keys($item);
   
   foreach($keys as $field)
   {
    if(str_starts_with($field, $fields))
    {
     $item[$field] = User_Date($item[$field], $mode);
    }
   }
  }
 }
 else
 // FIELDS AS AN EXPLICIT LIST
 {
  foreach($array as &$item)
  {
   foreach($fields as $field)
   {
    if(isset($item[$field]))
    {
     $item[$field] = User_Date($item[$field], $mode);
    }
   }
  }
 }
}






function Users_Available_Teach($centers, $roles, $dates, $options = [])
{
 // 0. CONVERT DATES TO UTC UNLESS OTHERWISE STATED
 if($options["utc"])
 {
  foreach($dates as &$date)
  {
   $date["date_start"] = User_Date($date["date_start"], "in");
   $date["date_end"]   = User_Date($date["date_end"],   "in");	
  }
 }
 
 
 // 1. EXTRACT OVERALL DATE_FROM AND DATE_TO GIVEN LIST OF DATES
 $range = Date_Ranges_Extremes($dates);
 $date_from = $range["date_from"];
 $date_to   = $range["date_to"];
 
 
 // PRE-SET USERS?
 if($options["users"])
 {
  $users = [];
  foreach($options["users"] as $id)
  {
   $user       = [];
   $user["id"] = $id;
   array_push($users, $user);
  }
 }
 // GET USERS FROM ALL CENTERS AND SET THEM UP
 else
 {
  $users = Users_List_ByCenter($centers, $roles, "id");
 }
 

 
 $user["noavail"] = [];
 
 
 // 4. READ CLASSES
 
 // 4a. READ CLASSES FOR ALL USERS TOGETHER IN ONE GO
 $ids = array_column($users, "id");
 
 $db = Core_Database_Open();
 
 $ids = SQL_Format_IN($ids, $db);
 
 $query   = "SELECT date_start, date_end, teacher_id, ta1_id, ta2_id, ta3_id FROM classes WHERE (($date_from BETWEEN date_start AND date_end) OR ($date_to BETWEEN date_start AND date_end) OR (date_start BETWEEN $date_from AND $date_to) OR (date_end BETWEEN $date_from AND $date_to)) AND (teacher_id IN ($ids) OR ta1_id IN ($ids) OR ta2_id IN($ids) OR ta3_id IN ($ids))";
 $classes = SQL_Query($query, $db);
 
 SQL_Close($db); 
 

 
 // 4b. FOR EACH CLASS CONVERT IT TO NOAVAIL BLOCK, FIND THE AFFECTED USERS, AND ADD IT TO THEM
 foreach($classes as &$class)
 {
  if(Date_Valid($class["date_start"]) && Date_Valid($class["date_end"]))
  {
   // CONVERT CLASS TO NOAVAIL ITEM
   $item              = [];
   $item["date_from"] = $class["date_start"];
   $item["date_to"]   = $class["date_end"];
  
   // FIND USERS WHO ARE IN THIS CLASS, HENCE WILL BE GIVEN THE NOAVAIL BLOCK
   foreach($users as &$user)
   {
    if(in_array($user["id"], [$class["teacher_id"], $class["ta1_id"], $class["ta2_id"], $class["ta3_id"]]))
    {
     array_push($user["noavail"], $item);
    }
   }
  }
 }
 
 
 // 5. NOW WE HAVE, FOR EACH USER, ALL THE NOVAIL DATE/TIME BLOCKS. 
 // WE MUST COMPARE THE LIST OF NEED-TO-BE-AVAILABLE DATES WITH THE NOAVAIL DATES AND SEE IF THERE ARE OVERLAPS
 $a = [];
 $b = [];
 foreach($users as &$user)
 { 
  // ASSUME USER AS AVAILABLE
  $user["available"] = true;
  
  // SCAN DATES
  foreach($dates as &$date)
  {
   $a["from"] = $date["date_start"];
   $a["to"]   = $date["date_end"];
	
   // CHECK OVERLAPS WITH NOAVAIL
   foreach($user["noavail"] as &$noavail)
   {
	$b["from"] = $noavail["date_from"];
	$b["to"]   = $noavail["date_to"];
		
	if(Numbers_Range_Intersect($a, $b))
	{
     $user["available"] = false;
	 break;
	}		
   }
   
   if(!$user["available"]) break;
  }

 }
 

 $available = [];
 foreach($users as &$user) 
 {
  if($user["available"]) 
  {
   array_push($available, $user["id"]);
  }
  /*	 
  foreach($user["noavail"] as &$noavail) 
  {
   $noavail["date_from"] = User_Date($noavail["date_from"], "out"); 
   $noavail["date_to"]   = User_Date($noavail["date_to"], "out");
  }
  */
 }
 
 if($options["info"]) 
 {
  $available = Users_Read($available, $options["info"]);
 }
 
 return $available;
}




function User_Available_Teach($id, $date, $duration, $utc = false)
{
 if($utc) $date = User_Date($date, "in");
	 
 $users               = [$id];
 
 $dates               = [];
 $dates["date_start"] = $date;
 $dates["date_end"]   = Date_Add_Minutes($date, $duration);
 $dates               = [$dates];

 $avail = Users_Available_Teach(false, false, $dates, ["users"=>$users]); 
 
 return in_array($id, $avail);
}





function Users_Integrate(&$data, $idfield, $fields = "id,firstname,lastname", $container = "user")
{
 $ids      = array_column($data, $idfield);
 
 if(count($ids) > 0)
 {
  $db = Core_Database_Open();

  $ids = SQL_Format_IN($ids, $db);
  
  $query = "SELECT $fields FROM users WHERE id IN ($ids)";
  $users = SQL_Query($query, $db);
  Array_Integrate($data, $idfield, $users, "id", $container);
  
  SQL_Close($db);
 }
 
}



?>