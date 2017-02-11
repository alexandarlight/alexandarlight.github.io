
<?php

	if (file_exists("site.html")) {
		$fp = fopen("site.html","r");
		while (!feof($fp)) {
			$line = fgets($fp, 2048);
			echo $line . "<br>";
		}
		fclose($fp);
	} else {
		echo "greske";
	}
	
?>
