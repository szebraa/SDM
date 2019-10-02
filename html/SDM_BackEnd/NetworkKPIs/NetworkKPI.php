<?php


//This echo is needed to actually process the ajax request, so that the method "testing" is actually successfully called
//echo $_POST["method"]();
echo $_POST["method"]();


//write options: w = write to file (overwrite), a = append to file, w+ = open file for reading and writing, r+ = open file for reading and writing

function OW_NDS_TPS_status()
{
	$txt = $_POST["payload"];
	//$_SERVER['DOCUMENT_ROOT'] = /var/www/html/ 
	//WONT BE ABLE TO WRITE TO A FOLDER UNLESS THE PERMISSIONS ARE 777!!
	$file = fopen($_SERVER['DOCUMENT_ROOT'] . "/OneNDS_TPS_Status/NDS_tps_status.txt","w+");
	fwrite($file,$_POST["payload"]);
	fclose($file);
	//return success message upon completion 
	$return->success = true;
	$json = json_encode($return);
	echo $json;
	echo $txt; //for debugging

}


//clears the OneNDS TPS KPI status file
function clr_NDS_TPS_status()
{
	$txt = $_POST["payload"];
	//WONT BE ABLE TO WRITE TO A FOLDER UNLESS THE PERMISSIONS ARE 777!!
	$file = fopen($_SERVER['DOCUMENT_ROOT'] . "/OneNDS_TPS_Status/NDS_tps_status.txt","w+");
	fwrite($file,$_POST["payload"]);
	fclose($file);
	
     
	//return success message upon completion 
	$return->success = true;
	$json = json_encode($return);
	echo $json;
	echo $txt; //for debugging
	
}




?>