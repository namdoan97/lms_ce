<?php

chdir("../..");

include ".\application\lib\utils.php";


if(isset($_REQUEST["limit"])) $limit = $_REQUEST["limit"]; else $limit = false;

$files   = [];

if($limit) 
{
 $path = ".\application\modules\\" . $limit;
}
else 
{
 $path = ".\application\modules";
}

$found = Storage_Files_Collect($path, ["dat", "cfg"], ["recurse"]);
$files = array_merge($files, $found);


if(!$limit)
{
 $found = Storage_Files_Collect(".\partners\default", ["dat", "cfg"]);
 $files = array_merge($files, $found);
}


foreach($files as &$file) 
{
 $item         = [];
 $item["name"] = str_replace(".\\", "", $file);
 $item["data"] = parse_ini_file($file, true);

 $file         = $item;
}

Client_PublishVar("files", $files);

?>


<head>
	<link rel  = "stylesheet" href = "../../application/css/structure.css" />
	<link rel  = "stylesheet" href = "../../application/css/styles.css" />
	<link rel  = "stylesheet" href = "../../application/css/elements.css" />
	<script src = "../../application/lib/utils.js"></script>
	<script src = "../../application/lib/document.js"></script>
</head>


<style>

.title-file
{
 font-family:    segoe ui;
 font-size:      24px;
 font-weight:    bold;
 padding:        8px;
 text-transform: uppercase;
}



.title-section
{
 font-family:    segoe ui;
 font-size:      16px;
 font-weight:    bold;
 padding:        6px;
 text-transform: capitalize;
}



.box
{
 display:          flex;
 flex-direction:   column;
 padding:          8px;
 gap:              8px;
 xwidth:            576px;
 border:           1px solid silver;
 box-shadow:       0px 11px 15px 2px rgba(0,0,0,0.21);
 background-color: #F1E4D6;
}



.edit
{  
 font-family:     segoe ui;
 width:           100%;
 display:         flex;
 flex-direction:  row;
 padding:         4px;
 gap:             8px;
 justify-content: flex-start;
 align-items:     center;
}



.input-complete
{
 font-family:     segoe ui;
 width:           250px;
 padding:         4px;
 border:          1px solid silver;
}



.input-missing    
{
 font-family:      segoe ui;
 width:            250px;
 padding:          4px;
 border:           1px solid silver;
 background-color: #FFB8C8;
 color:            white;
}

</style>




<body style = "display:flex; flex-direction:column; overflow:hidden; gap:16px; padding:16px; background-color:#FEE3C6; height:100%; width:100%">

	<div id = "container" style = "display:flex; flex-direction:row; flex-grow:1; flex-wrap:wrap; overflow:hidden auto; padding:16px; gap:16px; width:100%">
	</div>

	<div id = "options"  style = "display:flex; align-items:center; flex-direction:row; overflow:hidden; padding:8px; gap:16px; height:32px; flex-shrink:0; width:100%">
	
		<input type = "checkbox" onclick = "UI_HideShowCompleted(event)" /> <b>Hide Completed Translations</b>
	
	</div>

</body>


<script src = "../.././application/lib/utils.js">         </script>
<script src = "../.././application/modules/core/core.js"> </script>

<script>



function UI_HideCompleted()
{
 var boxes = Document_Element_FindChildren(document.body, "type", "box", ["recurse"]);

 for(var box of boxes)
 {
  box_complete = true;
    
  var wrappers = Document_Element_FindChildren(box, "type", "wrapper", ["recurse"]);
  for(var wrapper of wrappers)
  {
   var wrapper_complete = true;
      
   var inputs = Document_Element_FindChildren(wrapper, "type", "input", ["recurse"]);
   for(var input of inputs) 
   {
    if(input.value === "") wrapper_complete = false;
   }     
 
   if(wrapper_complete) wrapper.style.display = "none"; else box_complete = false;
  }

  if(box_complete) box.style.display = "none";
 }
 
}



function UI_ShowCompleted()
{
 var boxes = Document_Element_FindChildren(document.body, "type", "box", ["recurse"]);
 for(var box of boxes) if(box.style.display == "none") box.style.display = "flex";
 
 var wrappers = Document_Element_FindChildren(document.body, "type", "wrapper", ["recurse"]);
 for(var wrapper of wrappers) if(wrapper.style.display == "none") wrapper.style.display = "flex";
}



function UI_HideShowCompleted(event)
{
 var input = event.target;
 if(input.checked) UI_HideCompleted(); else UI_ShowCompleted();
}



async function Core_Api(func, params = {}, options = {type:"json"})
{
 var url      = Path_Folder(document.location.origin + document.location.pathname.replace("tools/translate", "")) + "/api.php?f=" + func;  
 var response = await Request_Post(url, params, options["type"]);
 
 return response;
}


function Input_Class(input)
{
 if(input.value) input.className = "input-complete"; else input.className = "input-missing";
}



function Input_Update(event)
{
 var input = event.currentTarget;
 
 Input_Class(input);
 
 var filename = input.getAttribute("filename");
 var section  = input.getAttribute("section");
 var field    = input.getAttribute("field");
 var value    = input.value;
 
 Core_Api("Ini_Key_Write", {filename, section, field, value});

 console.log(filename, section, field);
}



function Clean_Text(text)
{
 text = text.replace("application/modules/", "");
 text = text.replace("partners/", "");
 text = text.replace(".dat", "");
 
 return text;
}



var translate = {};
var languages = ["en", "vn"];

// SCAN ALL FILES
for(var file of files)
{
 var filename = file["name"];
 var data     = file["data"];
 
 // SCAN SECTIONS IN FILE
 for(var section in data)
 {
  // IF A SECTION HAS "EN" THEN IT COULD REQUIRE TRANSLATION
  if(data[section]["en"])
  {
   data[section]["section"] = section;
   
   if(!translate[filename]) translate[filename] = [];
   translate[filename].push(data[section]);
  }
 }
}


for(var filename in translate)
{  
 var box        = document.createElement("div");
 box.className  = "box";
 
 // FILE NAME
 var file       = document.createElement("div");
 file.className = "title-file";
 file.innerHTML = Clean_Text(filename);
 box.appendChild(file);
 
 
 // SECTIONS
 var sections = translate[filename];
 for(var section of sections)
 {
  var wrapper      = document.createElement("div");
  wrapper.style    = "display:flex; flex-direction:column";
  Document_Element_SetData(wrapper, "type", "wrapper");
  
  var header       = document.createElement("div");
  header.className = "title-section";
  header.innerHTML = section["section"]; ;
  wrapper.appendChild(header);
  
  var edit       = document.createElement("div");
  edit.className = "edit";
  
  for(var language of languages)
  {
   var input         = document.createElement("input");
   input.placeholder = language;
   input.value       = section[language] || ""; 
   
   Input_Class(input);
   input.onchange = Input_Update;
   
   input.setAttribute("filename", filename);
   input.setAttribute("section",  section["section"]);
   input.setAttribute("field",    language);
   
   Document_Element_SetData(input, "type", "input");
   edit.appendChild(input);
  }
  
  wrapper.appendChild(edit);
  
  box.appendChild(wrapper);
 }
 
 Document_Element_SetData(box, "type", "box");
 document.getElementById("container").appendChild(box);
}




</script>