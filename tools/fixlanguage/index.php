<?php

ini_set("max_execution_time", "0"); 
set_time_limit(0);

chdir("../..");

include "application/lib/utils.php";

$files =  Storage_Files_Collect(".", ["dat", "cfg"], ["recurse"]);

foreach($files as $file)
{
 echo "$file<br>";
 
 $data = Ini_File_Read($file);
 
 if($data && is_array($data))
 {
  $sections = array_keys($data);
  foreach($sections as $section)
  {
   if(isset($data[$section]["it"])) 
   {
	echo "Found at $file / $section<br>";
    unset($data[$section]["it"]);
   }
  }
  
  Ini_File_Write($file, $data);
 }
}

print_r($files);



?>