<?php

  $name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
  $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
  $phone = filter_var($_POST['phone'], FILTER_SANITIZE_STRING);
  $preferred_contact = filter_var($_POST['contact-method'], FILTER_SANITIZE_STRING);
  $message = filter_var($_POST['message'], FILTER_SANITIZE_STRING);

  $content = "
          Name: {$name}</br>
          Email: {$email}</br>
          Phone #: {$phone}</br>
          Preferred Contact: {$preferred_contact}</br>
          </br></br>
          Message: </br>
          {$message}
          ";

  $content = wordwrap($content,70);

 // Using the PHPMailer tool as explained here: https://help.dreamhost.com/hc/en-us/articles/360031174411-PHPMailer-Installing-on-a-Shared-server

 // Import PHPMailer classes into the global namespace
 // These must be at the top of your script, not inside a function
 use PHPMailer\PHPMailer\PHPMailer;
 use PHPMailer\PHPMailer\Exception;

 require '/home/matthewhaslem/PHPMailer/src/Exception.php';
 require '/home/matthewhaslem/PHPMailer/src/PHPMailer.php';
 require '/home/matthewhaslem/PHPMailer/src/SMTP.php';



 $host = $config['host'];
 $username = $config['username'];
 $pass = $config['password'];


 $mail = new PHPMailer(true);                              // Passing `true` enables exceptions
 try {
     //Server settings
     $mail->SMTPDebug = 2;                                 // Enable verbose debug output
     $mail->isSMTP();                                      // Set mailer to use SMTP
     $mail->Host = $host;                  // Specify main and backup SMTP servers
     $mail->SMTPAuth = true;                               // Enable SMTP authentication
     $mail->Username = $username;             // SMTP username
     $mail->Password = $pass;                           // SMTP password
     $mail->SMTPSecure = 'ssl';                            // Enable SSL encryption, TLS also accepted with port 465
     $mail->Port = 465;                                    // TCP port to connect to

     //Recipients
     $mail->setFrom('matt@matthaslem.tech', 'MattHaslem.tech');          //This is the email your form sends From
     $mail->addAddress($username, 'MattHaslem.tech'); // Add a recipient address
     //$mail->addAddress('contact@example.com');               // Name is optional
     //$mail->addReplyTo('info@example.com', 'Information');
     //$mail->addCC('cc@example.com');
     //$mail->addBCC('bcc@example.com');

     //Attachments
     //$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
     //$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name

     //Content
     $mail->isHTML(true);                                  // Set email format to HTML
     $mail->Subject = "New Message From {$name}";
     $mail->Body    = $content;
     //$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

     $mail->send();
     echo 'Message has been sent';
 } catch (Exception $e) {
     echo 'Message could not be sent.';
     echo 'Mailer Error: ' . $mail->ErrorInfo;
 }
 ?>
