<?php

if (isset($_GET["suchbegriff"])) {

	header('Content-Type: text/plain; charset=utf-8');
	
	$verbindung = new PDO("mysql:host=localhost;dbname=****", "*****", "");
	  
	$befehl = $verbindung->prepare("SELECT * FROM lime_survey_873595 WHERE `token` = :suchbegriff");
	$befehl->bindValue(':suchbegriff', $_GET["suchbegriff"]);
	$befehl->execute();
	
	$datensaetze = $befehl->fetchAll(PDO::FETCH_OBJ);
	$datensaetze = json_decode(json_encode($datensaetze[0]), true);
	
	$final = array();
	
	$count = 0;
	foreach($datensaetze as $x => $x_value){
		if (strpos($x, '873595X149X1220S') !== false && $x_value !== "" && $x_value !== null ) {
			$final[$count] = $x_value;
			$count++; 
		}		
	}
	$return1 = $final; //json_encode($final);
	
	//$verbindung = null;
	
	//$verbindung = new PDO("mysql:host=localhost;dbname=survey", "root", "");
						
	
	$befehl = $verbindung->prepare("SELECT * FROM lime_survey_873595 WHERE `token` = :suchbegriff");
	$befehl->bindValue(':suchbegriff', $_GET["suchbegriff"]);
	$befehl->execute();
	
	$datensaetze = $befehl->fetchAll(PDO::FETCH_OBJ);
	$datensaetze = json_decode(json_encode($datensaetze[0]), true);
	 
	$final = array();
	
	$count = 0;
	foreach($datensaetze as $x => $x_value){
		if (strpos($x, '873595X149X1228S') !== false && $x_value !== "" && $x_value !== null ) {
			$regex  =  preg_match('/\w+SQa/',$x, $m) ? true : false;
			if($regex){
				continue;
			}
			$final[$count] = $x_value;
			$count++; 
		}		
	}
	$return2 = $final;//json_encode($final);
	//print_r($return);
	//print_r($datensaetze[$fCode]);
	
	
	/////////________gewichtung:__________________________________________(Funktioniert noch nicht)
	
	$befehl = $verbindung->prepare("SELECT * FROM lime_survey_873595 WHERE `token` = :suchbegriff");
	$befehl->bindValue(':suchbegriff', $_GET["suchbegriff"]);
	$befehl->execute();
	
	$datensaetze = $befehl->fetchAll(PDO::FETCH_OBJ);
	$datensaetze = json_decode(json_encode($datensaetze[0]), true);
	
	$final = array();
	
	$count = 0;
	foreach($datensaetze as $x => $x_value){
		if (strpos($x, '873595X158X7889SQ') !== false && strpos($x, '_SQ11') !== false && $x_value !== "" && $x_value !== null ) {
			$final[$count] = $x_value;
			$count++; 
		}		
	}
	
	$gewicht = $final;
	
	
	// alt
	///|
	///v 
	
	/*
	$befehl = $verbindung->prepare("SELECT * FROM lime_survey_873595 WHERE `token` = :suchbegriff");
	$befehl->bindValue(':suchbegriff', $_GET["suchbegriff"]);
	$befehl->execute();
	
	$datensaetze = $befehl->fetchAll(PDO::FETCH_OBJ);
	$datensaetze = json_decode(json_encode($datensaetze[0]), true);
	
	$final = array();
	
	$count = 0;
	foreach($datensaetze as $x => $x_value){
		if (strpos($x, '873595X155X6636SQ01_SQ') !== false && $x_value !== "" && $x_value !== null ) {
			$final[$count] = $x_value;
			$count++; 
		}		
	}
	
	$gewicht = $final;
	*/
	/////////////------------------------------------------------
	//////////____________________ 
	
	$final = array(array(),array(),array(),array(),array(),array(),array(),array(),array(),array());
	$count = 0;
	
	$c2 = 0;
	//nicht bearbeiten ------------->
	foreach($datensaetze as $x => $x_value){
		if (strpos($x, '873595X154X5418S') !== false && $x_value !== "" && $x_value !== null && $x_value !== "Gewichtete bewertung" && $x_value !== "Punkte" /*&& $x_value !== "NaN" */) {
			$num  =  preg_match('/\d+/',explode("_",$x)[1], $m) ? $m[0] : '';
			if($num % 2 != 0){ 
				if ($count == 10 /*$response2.length */){ 
					$c2 = $c2 + 1;
					$count = 0;
				}
				$final[$count][$c2] = $x_value /** $gewicht[$c2]*/;
				$count++;
			}
		}		
	}
	$return3 = $final;//json_encode($final);
	//print_r($return);
	//print_r($datensaetze[$fCode]);
	//// 			<-------------
	////////----------------------
	///////gewichtete punkte
	$count = 0;
	$final = [];
	foreach($datensaetze as $x => $x_value){
		if (strpos($x, '873595X154X5418S') !== false && $x_value !== "" && $x_value !== null && $x_value !== "Gewichtete bewertung" && $x_value !== "Punkte" /*&& $x_value !== "NaN" */) {
			$num  =  preg_match('/\d+/',explode("_",$x)[1], $m) ? $m[0] : '';
			if($num % 2 == 0){ //code für response4 erstellen != in == umwandeln für gewichtete punkte; das ist dann $return4; damit dann diagramm zeichnen; dadurch kann die array multiplikation in dem diagramm code übersprungen werden 
				
				if ($count == /*10*/ count($return2) ){ //morgen weiterarbeiten
					$c2 = $c2 + 1;
					$count = 0;
				}
				$final[$count][$c2] = $x_value /** $gewicht[$c2]*/;
				$count++;
			}
		}		
	}
	$return4 =  $final;//json_encode($final);
	////////_______________________
	$returnArr = array($return1,$return2,$return3,$gewicht,$return4);
	
	$returnArr = json_encode($returnArr);
	print_r($returnArr);
}
?>