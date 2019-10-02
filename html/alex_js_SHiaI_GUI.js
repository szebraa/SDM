//Note that since my html file inherits the script in the alarms subpages, and the js code on the subpage defines these variables, they can't be redefined, but can be used on this page
/*
const ACTIVE_MOUNT_POINT_DIR = 'what_is_mounted.txt';
const PRIMARY_MOUNT_POINT = "root@dbmtor002:/opt/mgtservices/statusService/live/"; //translates to /var/www/html/SS_Alarms_Mount_Point
const BACKUP1_MOUNT_POINT = "root@dbmtor001:/opt/mgtservices/statusService/live/"; //translates to /var/www/html/SS_Alarms_Mount_Point_Backup1
const BACKUP2_MOUNT_POINT = "root@dbmmtl001:/opt/mgtservices/statusService/live/"; //translates to /var/www/html/SS_Alarms_Mount_Point_Backup2
*/
const ONE_NDS_ALARMS_AFTER_FILTER = '/OneNDSAlarmsAfterFilter/oneNDSAlarms.txt';
const TPS_NETWORK_KPI = '/OneNDS_TPS_Status/NDS_tps_status.txt';
var Alarms_Url_To_Open = 'http://10.55.105.249/';
var Network_KPI_Url_To_Open = 'http://10.55.105.249/';

function readTxtFile(path)
{
	var my_str = '';
	//needs to be asynchronous so that the return is successful
    $.ajax({
        url: path,
        type: 'get',
		cache: false,
        dataType: 'text',
        async: false,
        success: function(data) {
            my_str = data;
        } 
    });
	return my_str;
}


function createBoxes() 
{	
	var table = document.getElementById("myTable" );
	var row = table.insertRow(1);
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	var cell3 = row.insertCell(2);
	 
	
	//Set default view of cells (Green boxes, with hyperlinks that lead right back to the current page)

	//set default color of boxes (green)
	cell1.style.backgroundColor = 'green'; //change background of rows
	cell1.style.color = 'white'; //change texts of cell
	cell2.style.backgroundColor = 'green'; //change background of rows
	cell2.style.color = 'white'; //change texts of cell
	cell3.style.backgroundColor = 'green'; //change background of rows
	cell3.style.color = 'white'; //change texts of cell
	var cells = row.getElementsByTagName("td"); // needed to split the cells up into an array
  
	//processing for ALARMS Box
	//turn box red & create hyperlink to subpage
	var One_NDS_Alarms = readTxtFile(ONE_NDS_ALARMS_AFTER_FILTER);
	var sizeof_One_NDS_Alarms = One_NDS_Alarms.length;
	if(sizeof_One_NDS_Alarms > 0)
	{
		Alarms_Url_To_Open = 'http://10.55.105.249/platform_errors/';
		cell1.style.backgroundColor = 'red';
		cells[0].style.cursor = "pointer";
	}

	//turn box green & remove hyperlink to subpage
	else
	{
		Alarms_Url_To_Open = 'http://10.55.105.249/';
		cell1.style.backgroundColor = 'green';
		cells[0].style.cursor = "default";
		
	}
	
	//Set default URL of boxes' hyperlink (leads right back to current page - the main page)

	$(cells[0]).click(function()
	{
	// Perform your action on click here, like redirecting to a new url
	if(Alarms_Url_To_Open=='http://10.55.105.249/platform_errors/')
		window.open('http://10.55.105.249/platform_errors/', '_blank');
		
	});
	
	
	
	//processing for Network KPIs Box
	//turn box red & create hyperlink to subpage
	
	var TPS_KPI = readTxtFile(TPS_NETWORK_KPI);
	var sizeof_tps_kpi = TPS_KPI.length;
	if(sizeof_tps_kpi>0)
	{
		Network_KPI_Url_To_Open = 'http://10.55.105.249/network_KPIs/';
		cell2.style.backgroundColor = 'red';
		cells[1].style.cursor = "pointer";
	}
	
	//turn box green & remove hyperlink to subpage
	else
	{
		Network_KPI_Url_To_Open = 'http://10.55.105.249/';
		cell2.style.backgroundColor = 'green';
		cells[1].style.cursor = "default";
		
	}
	
	
	

	$(cells[1]).click(function()
	{
	// Perform your action on click here, like redirecting to a new url
	if(Network_KPI_Url_To_Open=='http://10.55.105.249/network_KPIs/')
		window.open('http://10.55.105.249/network_KPIs/', '_blank');
	});


	$(cells[2]).click(function()
	{
	window.location='';
	});
	

	//loop every 5 seconds
	setInterval(function()
	{	
		//processing for ALARMS Box
		//turn box red & create hyperlink to subpage
		var One_NDS_Alarms = readTxtFile(ONE_NDS_ALARMS_AFTER_FILTER);
		var sizeof_One_NDS_Alarms = One_NDS_Alarms.length;
		
		if(sizeof_One_NDS_Alarms > 0)
		{
			cell1.style.backgroundColor = 'red';
			cells[0].style.cursor = "pointer";
			Alarms_Url_To_Open = 'http://10.55.105.249/platform_errors/';
		}
		
		//turn box green & remove hyperlink to subpage
		else
		{
			cell1.style.backgroundColor = 'green';
			cells[0].style.cursor = "default";
			Alarms_Url_To_Open = 'http://10.55.105.249';
		}
		
		//processing for Network KPIs Box
		//turn box red & create hyperlink to subpage
		
		var TPS_KPI = readTxtFile(TPS_NETWORK_KPI);
		var sizeof_tps_kpi = TPS_KPI.length;
		if(sizeof_tps_kpi > 0)
		{
			Network_KPI_Url_To_Open = 'http://10.55.105.249/network_KPIs/';
			cell2.style.backgroundColor = 'red';
			cells[1].style.cursor = "pointer";
		}

		//turn box green & remove hyperlink to subpage
		else
		{
			Network_KPI_Url_To_Open = 'http://10.55.105.249/';
			cell2.style.backgroundColor = 'green';
			cells[1].style.cursor = "default";
			
		}
		
		//location.reload(true);
		history.go(0);
		
	}, 5000); //this is a very useful line for performing an action over and over again (e.g.: reading a file) : 5000 (5 seconds refresh)
	
	
	
}



function myFunction2() 
{	
  var i = 1;

    while(i<10)
	{
	  var table = document.getElementById("myTable2" );
	  var row = table.insertRow(1);
	  var cell1 = row.insertCell(0);
	  cell1.style.backgroundColor = 'red'; //change background of rows
	  cell1.style.color = 'white'; //change texts of cell
	  cell1.innerHTML = "NEW CELL " +i;
	  i++;
	}
}

//function needed to perform static var count
function countMyself() {
    // Check to see if the counter has been initialized
    if (typeof countMyself.counter == 'undefined')
        countMyself.counter = 1;
    return countMyself.counter++;
}


//used as a sleep function (call by using "await sleep(2000);" for 2s delay)
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/*
function test()
{
	//problem with importing a specific variable from the other js file (alex_platform_errors.js)
	//var myModule = require('./platform_errors/platform_errors.js'); 
	//window.alert(require('./var/www/html/platform_errors/platform_errors.js'));
	// name is a member of myModule due to the export above
	//var name = myModule.test;
	//window.alert(name);
	//window.alert('hi');
	//if(name == true)
		//return false;
	//window.alert(globalVariable.x);
	
}
*/