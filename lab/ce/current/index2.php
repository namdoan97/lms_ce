<?PHP 
	session_start();

    // SET PARTNER
    $_SESSION["partner"] = $_REQUEST["partner"] ?? "default";

    // SET APPLICATION MODE
	$_SESSION["mode"]    = $_REQUEST["mode"]    ?? "dev";
	
	// INIT ACCORDING TO APPLICATION MODE
	include_once "application/init-" . $_SESSION["mode"] . ".php";
	
	// AUTOLOGIN USER IF REQUESTED
    if(isset($_REQUEST["autologin"]))
	{
     include_once "api.php";
	 Core_Login($_REQUEST["autologin"], "137137137");
	}
	
	// FORCE INTERNAL DATE IF REQUESTED
	if(isset($_REQUEST["forcetime"]))
	{
	 if($_REQUEST["forcetime"] == "no") 
	 {
	  unset($_SESSION["forcetime"]);
	 }
	 else
	 {
	  $_SESSION["forcetime"] = $_REQUEST["forcetime"];
	 }
	}
	
	unset($_SESSION["forcetime"]);
?>


<!DOCTYPE html>

<html>
    <head>
		<link rel  = "stylesheet" href = "partners/<?PHP echo $_SESSION["partner"]; ?>/style.css" />
		<link rel  = "manifest"   href = "app-manifest.php?version=<?php echo time(); ?>" />
	</head>
	
	<body style = "border:0px; margin:0px; padding:0px;">
	</body>
</html>


<script>   


   <?PHP 	
		// DETERMINE INITIAL PAGE
		if(isset($_SESSION["user"]))  
		{
		 $value = $_REQUEST["framework"] ?? "main";
		}
		else 
	    // IF NO USER SET, GO TO LOGIN
		{
		 $value = "login";
		}		   
		
		// INITIAL PAGE
		Client_PublishVar("initial_page", $value, true);
		
		
		// OPTIONAL MODULE INITIALIZATION
		$flag = isset($_REQUEST["init"]);
	    Client_PublishVar("module_init", $flag, true);
	?>
      
   // DISABLE CONTEXT MENUS
   document.body.oncontextmenu = 
   function(event)
   {
	event.preventDefault(); 
	event.stopPropagation; 
	return false;
   }
   
   
   // INITIAL MODULE, INITIAL PAGE    
   var module = "call";	
   var page   = Client_Location_Parameter("page");	
 
   // DETERMINE PLATFORM
   var platform = Client_Location_Parameter("platform") || "desktop";	
   Core_State_Set("core", "platform", platform);   
 
   
   // INITIALIZATION
   Core_Init("<?PHP echo $_SESSION['partner']; ?>");
   Core_State_Set("core", ["initial-page"], initial_page);
  
 
   // "STRUCTURE" MODULE LOAD
   Module_Load(initial_page, document.body).then(
   async function()
   {
	await Core_Api("Core_SetTimezone", {timezone:Date_Timezone()});
	
	// LOAD MODULE
    if(module)
    {
     // LOAD 
 	 await Module_Load(module);
    }
   });
	
   
</script>