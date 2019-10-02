<?php


//This echo is needed to actually process the ajax request, so that the method "testing" is actually successfully called
echo $_POST["method"]();


//functions below are for OneNDS Live Alarms only
function outEffectiveNDSAlarms()
{
	$txt = $_POST["payload"];
	$file = fopen($_SERVER['DOCUMENT_ROOT'] . "/OneNDSAlarmsAfterFilter/oneNDSAlarms.txt","w+");
	fwrite($file,$_POST["payload"]);
	fclose($file);
	$return->success = true;
	$json = json_encode($return);
	echo $json;
	echo $txt; //for debugging
	
}




//write options: w = write to file (overwrite), a = append to file, w+ = open file for reading and writing, r+ = open file for reading and writing
function overwriteAlarmTxtFilter()
{
	
	//$txt = json_decode($_POST['payload'],true); 
	$txt = $_POST["payload"];
	if($txt!="")
	{
		//$_SERVER['DOCUMENT_ROOT'] = /var/www/html/ 
		//WONT BE ABLE TO WRITE TO A FOLDER UNLESS THE PERMISSIONS ARE 777!!
		$file = fopen($_SERVER['DOCUMENT_ROOT'] . "/AlarmFilterTxtFiles/filters.txt","w+");
		fwrite($file,$_POST["payload"]);
		fclose($file);
		
		
		/*
		$file = fopen($_SERVER['DOCUMENT_ROOT'] . "/AlarmFilterTxtFiles/filters.txt","a+");
		$result = fwrite($file, "unrelated");
		fclose($file);
		*/
		 
		
	}
	//return success message upon completion 
	$return->success = true;
	$json = json_encode($return);
	echo $json;
	echo $txt; //for debugging

}


function appendAlarmTxtFilter()
{
	$txt = $_POST["payload"];
	
	//$_SERVER['DOCUMENT_ROOT'] = /var/www/html/ 
	//WONT BE ABLE TO WRITE TO A FOLDER UNLESS THE PERMISSIONS ARE 777!!
	$file = fopen($_SERVER['DOCUMENT_ROOT'] . "/AlarmFilterTxtFiles/filters.txt","a+");
	//Add new line if file is not empty
	if(filesize($_SERVER['DOCUMENT_ROOT'] . "/AlarmFilterTxtFiles/filters.txt")!=0 and $txt!="")
		fwrite($file,"\n");
	fwrite($file,$_POST["payload"]);
	fclose($file);
	
	$return->success = true;
	$json = json_encode($return);
	echo $json;
	echo $txt; //for debugging

}



function clearAlarmTxtFilter()
{
	$txt = $_POST["payload"];
	
	//$_SERVER['DOCUMENT_ROOT'] = /var/www/html/ 
	//WONT BE ABLE TO WRITE TO A FOLDER UNLESS THE PERMISSIONS ARE 777!!
	$file = fopen($_SERVER['DOCUMENT_ROOT'] . "/AlarmFilterTxtFiles/filters.txt","w+");
	fwrite($file,$_POST["payload"]);
	fclose($file);
	
     
	//return success message upon completion 
	$return->success = true;
	$json = json_encode($return);
	echo $json;
	echo $txt; //for debugging
	
}


function overwriteNodeTxtFilter()
{
	
	//$txt = json_decode($_POST['payload'],true); 
	$txt = $_POST["payload"];
	if($txt!="")
	{
		//$_SERVER['DOCUMENT_ROOT'] = /var/www/html/ 
		//WONT BE ABLE TO WRITE TO A FOLDER UNLESS THE PERMISSIONS ARE 777!!
		$file = fopen($_SERVER['DOCUMENT_ROOT'] . "/NodeFiltersTxtFiles/filters.txt","w+");
		fwrite($file,$_POST["payload"]);
		fclose($file);
		
		
		/*
		$file = fopen($_SERVER['DOCUMENT_ROOT'] . "/NodeFiltersTxtFiles/filters.txt","a+");
		$result = fwrite($file, "unrelated");
		fclose($file);
		*/
	}
	//return success message upon completion 
	$return->success = true;
	$json = json_encode($return);
	echo $json;
	echo $txt; //for debugging

}


function appendNodeTxtFilter()
{
	$txt = $_POST["payload"];
	
	//$_SERVER['DOCUMENT_ROOT'] = /var/www/html/ 
	//WONT BE ABLE TO WRITE TO A FOLDER UNLESS THE PERMISSIONS ARE 777!!
	$file = fopen($_SERVER['DOCUMENT_ROOT'] . "/NodeFiltersTxtFiles/filters.txt","a+");
	//Add new line if file is not empty
	if(filesize($_SERVER['DOCUMENT_ROOT'] . "/NodeFiltersTxtFiles/filters.txt")!=0 and $txt!="")
		fwrite($file,"\n");
	fwrite($file,$_POST["payload"]);
	fclose($file);
	
	$return->success = true;
	$json = json_encode($return);
	echo $json;
	echo $txt; //for debugging

}


function clearNodeFilterText()
{
	
	//$txt = json_decode($_POST['payload'],true); 
	$txt = $_POST["payload"];
	
	//$_SERVER['DOCUMENT_ROOT'] = /var/www/html/ 
	//WONT BE ABLE TO WRITE TO A FOLDER UNLESS THE PERMISSIONS ARE 777!!
	$file = fopen($_SERVER['DOCUMENT_ROOT'] . "/NodeFiltersTxtFiles/filters.txt","w+");
	fwrite($file,$_POST["payload"]);
	fclose($file);
	
	
	//return success message upon completion 
	$return->success = true;
	$json = json_encode($return);
	echo $json;
	echo $txt; //for debugging

}


//functions below here are for history of OneNDS alarms

//overwrite alarm filter text for OneNDS alarm history only
function OW_NDSAlarmHistTxtFilter()
{
	
		//$txt = json_decode($_POST['payload'],true); 
	$txt = $_POST["payload"];
	if($txt!="")
	{
		//$_SERVER['DOCUMENT_ROOT'] = /var/www/html/ 
		//WONT BE ABLE TO WRITE TO A FOLDER UNLESS THE PERMISSIONS ARE 777!!
		$file = fopen($_SERVER['DOCUMENT_ROOT'] . "/OneNDS_Alarm_Txt_History_Filter/filters.txt","w+");
		fwrite($file,$_POST["payload"]);
		fclose($file);
		
		
		/*
		$file = fopen($_SERVER['DOCUMENT_ROOT'] . "/OneNDS_Alarm_Txt_History_Filter/filters.txt","a+");
		$result = fwrite($file, "unrelated");
		fclose($file);
		*/
		 
		
	}
	//return success message upon completion 
	$return->success = true;
	$json = json_encode($return);
	echo $json;
	echo $txt; //for debugging
}



//append alarm filter text for OneNDS alarm history only
function AP_NDSAlarmHistTxtFilter()
{
	$txt = $_POST["payload"];
	
	//$_SERVER['DOCUMENT_ROOT'] = /var/www/html/ 
	//WONT BE ABLE TO WRITE TO A FOLDER UNLESS THE PERMISSIONS ARE 777!!
	$file = fopen($_SERVER['DOCUMENT_ROOT'] . "/OneNDS_Alarm_Txt_History_Filter/filters.txt","a+");
	//Add new line if file is not empty
	if(filesize($_SERVER['DOCUMENT_ROOT'] . "/OneNDS_Alarm_Txt_History_Filter/filters.txt")!=0 and $txt!="")
		fwrite($file,"\n");
	fwrite($file,$_POST["payload"]);
	fclose($file);
	
	$return->success = true;
	$json = json_encode($return);
	echo $json;
	echo $txt; //for debugging	
	
	
}


//clear alarm filter text for OneNDS alarm history only
function CLR_NDSAlarmHistTxtFilter()
{
	$txt = $_POST["payload"];
	
	//$_SERVER['DOCUMENT_ROOT'] = /var/www/html/ 
	//WONT BE ABLE TO WRITE TO A FOLDER UNLESS THE PERMISSIONS ARE 777!!
	$file = fopen($_SERVER['DOCUMENT_ROOT'] . "/OneNDS_Alarm_Txt_History_Filter/filters.txt","w+");
	fwrite($file,$_POST["payload"]);
	fclose($file);
	
     
	//return success message upon completion 
	$return->success = true;
	$json = json_encode($return);
	echo $json;
	echo $txt; //for debugging
	
}


//overwrite node filter text for OneNDS alarm history only 
function OW_NDSNodeHistTxtFilter()
{
	//$txt = json_decode($_POST['payload'],true); 
	$txt = $_POST["payload"];
	if($txt!="")
	{
		//$_SERVER['DOCUMENT_ROOT'] = /var/www/html/ 
		//WONT BE ABLE TO WRITE TO A FOLDER UNLESS THE PERMISSIONS ARE 777!!
		$file = fopen($_SERVER['DOCUMENT_ROOT'] . "/OneNDS_Node_Txt_History_Filter/filters.txt","w+");
		fwrite($file,$_POST["payload"]);
		fclose($file);
		
		
		/*
		$file = fopen($_SERVER['DOCUMENT_ROOT'] . "/OneNDS_Node_Txt_History_Filter/filters.txt","a+");
		$result = fwrite($file, "unrelated");
		fclose($file);
		*/
	}
	//return success message upon completion 
	$return->success = true;
	$json = json_encode($return);
	echo $json;
	echo $txt; //for debugging	
	
	
}

//append node filter text for OneNDS alarm history only 
function AP_NDSNodeHistTxtFilter()
{
	$txt = $_POST["payload"];
	
	//$_SERVER['DOCUMENT_ROOT'] = /var/www/html/ 
	//WONT BE ABLE TO WRITE TO A FOLDER UNLESS THE PERMISSIONS ARE 777!!
	$file = fopen($_SERVER['DOCUMENT_ROOT'] . "/OneNDS_Node_Txt_History_Filter/filters.txt","a+");
	//Add new line if file is not empty
	if(filesize($_SERVER['DOCUMENT_ROOT'] . "/OneNDS_Node_Txt_History_Filter/filters.txt")!=0 and $txt!="")
		fwrite($file,"\n");
	fwrite($file,$_POST["payload"]);
	fclose($file);
	
	$return->success = true;
	$json = json_encode($return);
	echo $json;
	echo $txt; //for debugging	
	
}


//clear node filter text for OneNDS alarm history only
function CLR_NDSNodeHistTxtFilter()
{
	//$txt = json_decode($_POST['payload'],true); 
	$txt = $_POST["payload"];
	
	//$_SERVER['DOCUMENT_ROOT'] = /var/www/html/ 
	//WONT BE ABLE TO WRITE TO A FOLDER UNLESS THE PERMISSIONS ARE 777!!
	$file = fopen($_SERVER['DOCUMENT_ROOT'] . "/OneNDS_Node_Txt_History_Filter/filters.txt","w+");
	fwrite($file,$_POST["payload"]);
	fclose($file);
	
	
	//return success message upon completion 
	$return->success = true;
	$json = json_encode($return);
	echo $json;
	echo $txt; //for debugging	
	
}

?>