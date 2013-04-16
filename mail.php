<?php
	$email   = $_POST["email"];
	$name    = $_POST["name"];
	$message = $_POST["message"];

	if (preg_match_all("/(\.\w{2,5})/", $email) && $pos = strpos($email, "@")) {
		$host = substr($email, $pos + 1);
	} else {
		echo "hihii";
		return false;
	}

	$res = getmxrr($host, $mxhosts);

	if (!$mxhosts) {
		echo "false";
	} else {
		echo "true";
	}
?>