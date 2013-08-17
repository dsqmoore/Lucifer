<?php

ini_set('display_errors','Off');
error_reporting(E_ALL);

$email   = $_POST["email"];
$name    = $_POST["name"];
$message = $_POST["message"];

if (preg_match_all("/(\.\w{2,5})/", $email, $inst) && $pos = strpos($email, "@")) {
    $host = substr($email, $pos + 1);
} else {
    echo $email;
    return false;
}

$res = getmxrr($host, $mxhosts);

if (!$mxhosts) {
    echo "false";
    return;
} else if (!$name || !$message) {
    echo "true";
    return;
} else {
    $to      = 'notrtq@gmail.com';
    $subject = $name . " sent a message";
    $headers = 'From: "' . $name . '" <' . $email . '>' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

    if (mail($to,$subject,$message,$headers)) {
        echo "sent";
        return;
    } else {
        die("Message was not sent");
    }
}

?>