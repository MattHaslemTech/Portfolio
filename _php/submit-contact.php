<?php

  $name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
  $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
  $phone = filter_var($_POST['phone'], FILTER_SANITIZE_STRING);
  $preferred_contact = filter_var($_POST['contact-method'], FILTER_SANITIZE_STRING);
  $message = filter_var($_POST['message'], FILTER_SANITIZE_STRING);

  $content = "
          Name: {$name}\n
          Email: {$email}\n
          Phone #: {$phone}\n
          Preferred Contact: {$preferred_contact}\n
          \n
          Message: \n
          {$message}
          ";

  $content = wordwrap($content,70);

  if(mail("matt.haslem@maxxpotential.com","MESSAGE FROM WEBSITE FROM {$name}",$content))
  {
    echo "Message sent. ";
  }
  else
  {
    echo "shite";
  }

  echo $content;
