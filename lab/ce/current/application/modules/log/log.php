<?php

function Sendmail_Fail_Log($subject,$to,$cc,$body,$error,$options = [])
{
  try {

    $user_id = $_SESSION["user"]["id"] ?? 0;
    $db     = Core_Database_Open();

    $subjectFormat = SQL_Format($subject,$db);

    $toFormat = json_encode([$to]);
    $toFormat = SQL_Format($toFormat,$db);
    
    $ccFormat = json_encode([$cc]);
    $ccFormat = SQL_Format($ccFormat,$db);
    
    $bodyFormat = json_encode([$body]);
    $bodyFormat = SQL_Format($bodyFormat,$db);
    
    $errorFormat = json_encode([$error]);
    $errorFormat = SQL_Format($errorFormat,$db);

    SQL_Query("INSERT INTO sendmail_fail(user_id,subject,to,cc,body,error) VALUES($user_id,$subjectFormat,$toFormat,$ccFormat,$bodyFormat,$errorFormat)",$db);
  } catch (\Throwable $th) {
    die($th);
  }

}

?>