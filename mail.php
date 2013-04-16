<?php
	$email = $_POST["email"];

	if ($pos = strpos($email, "@")) {
		$host = substr($email, $pos + 1);
	}

	$res = getmxrr($host, $mxhosts);

	if (!$mxhosts) {
		echo "Nope";
	}
?>