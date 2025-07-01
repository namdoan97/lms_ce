<?PHP

// use PHPMailer\PHPMailer\PHPMailer;
// use PHPMailer\PHPMailer\Exception;

// require 'PHPMailer/Exception.php';
// require 'PHPMailer/PHPMailer.php';
// require 'PHPMailer/SMTP.php';

chdir("../..");
include "services/sendmail/phpmailer/SMTP.php";
include "services/sendmail/phpmailer/PHPMailer.php";
require 'services/sendmail/phpmailer/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;


function String_ReplaceVariables($string, $variables, $delimiter)
{
 if(!$delimiter) $delimiter = "$";
 
 $keys = array_keys($variables ?? []);
 
 foreach($keys as $key)
 {
  $value  = $variables[$key];
  
  $string = str_replace($delimiter . $key . $delimiter, $value, $string);
 }
 
 return $string;
}




// READ SERVICE CONFIGURATION
$config = parse_ini_file("service.cfg", true);




$email    = json_decode(file_get_contents('php://input'), true);
$from     = explode(";", $email["from"]); 
$toList   = $email["to"];
$subject  = $email["subject"];
$template = $email["template"];
$data     = $email["data"];


// GET EMAIL TEMPLATE AND FILL IT
$html = file_get_contents("services/sendmail/templates/$template.html");
echo('template:'."templates/$template.html:");print_r($html);echo('<br>');
$html = String_ReplaceVariables($html, $data, "$");
 
  
 
// CONFIGURE MAILER
$mail = new PHPMailer;

// SMTP
$mail->isSMTP();
$mail->mailer =  "smtp";  
$mail->SMTPAuth   = true;                               
//$mail->SMTPSecure = 'ssl';  
$mail->SMTPSecure = 'tls';  
$mail->SMTPDebug   = 2;

// Support UTF-8 for Vietnamese
$mail->CharSet = "utf-8";

// SENDER CREDENTIALS                             
$mail->Host       = $config["smtp"]["host"];                                               
//$mail->Port       = 465;
$mail->Port       = intval($config["smtp"]["port"]);
$mail->Username   = $config["smtp"]["username"];          
$mail->Password   = $config["smtp"]["password"]; 

// EMAIL CONFIG
//$mail->isHTML(false);
$mail->isHTML(true);
//$mail->WordWrap = 50;          
$mail->setFrom($from[1], $from[0]);   

$toList = explode(",", $toList);

foreach($toList as $key=>$to)
{
 $mail->addAddress(trim($to), trim($to));
}
//$mail->addAddress('thanhtran@ilavietnam.edu.vn', 'Thanh');
$mail->addCC('ce@ilavietnam.edu.vn', 'CE Group');
$mail->addCC('todd@ilavietnam.edu.vn', 'Todd');
//$mail->addCC('anastasiaromashova@ilavietnam.edu.vn', 'Ana');
//$mail->addCC('trungnguyen@ilavietnam.edu.vn', 'Trung');
$mail->Subject = $subject;
$mail->Body    = $html;
                

// SEND 
if(!$mail->send()) 
{
 echo 'Message could not be sent.';
 echo 'Mailer Error: ' . $mail->ErrorInfo;
 exit;
}
 
echo 'Message has been sent';

?>