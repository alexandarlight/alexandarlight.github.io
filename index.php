
<?php

	if (file_exists("index.html")) {
		$fp = fopen("index.html","r");
		while (!feof($fp)) {
			$line = fgets($fp, 2048);
			echo $line . "<br>";
		}
		fclose($fp);
	} else {
		echo "greske";
	}
	
?>
