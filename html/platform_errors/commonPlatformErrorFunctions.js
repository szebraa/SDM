/*
if (window.performance) 
{
  if (performance.navigation.type == 1) 
  {
	 
    
  } else 
  {
    alert( "This page is not reloaded");
  }
}
*/

function sortAlarmHistory()
{
	let tag_selected = document.getElementById("OneNDS_History_Alarm_Sorting");
	let selectedValue = tag_selected.options[tag_selected.selectedIndex].value;
	let history_table = document.getElementById("OneNDSHistoryTable");
	let history_table_rows = document.getElementById("OneNDSHistoryTable").getElementsByTagName("tr").length;
	
	//range of table rows should be 1 - history_table_rows -1 (row 0 contains the the title of the table)
	//alert(tag_selected.options[tag_selected.selectedIndex].value);
	//alert(history_table_rows);
	//alert(history_table.rows[history_table_rows-1].innerHTML);
	
	//only action if table already exists
	if(history_table_rows>1)
	{
		let i = 1;
		let str_NDS_History =  "";
		while(i<history_table_rows)
		{
			if(i == history_table_rows - 1)
				str_NDS_History+=history_table.rows[i].innerHTML;
			else
				str_NDS_History+=history_table.rows[i].innerHTML + "\n";
			i++;
		}
		
		i = 0;
		let arr_NDS_History = str_NDS_History.split("\n");
		let len_NDS_History = arr_NDS_History.length;
		/*
		"<b>Alarm cleared at:</b> " + split_by_newline_today[i].split(",")[1] + " <b>Generic Condition:</b> " + split_by_newline_today[i].split(",")[6] + 
								" <b>Severity:</b> " + "<span style=" + "\"color: green\"" + ">" + "<b>" + split_by_newline_today[i].split(",")[3] + "</b>" +"</span>" + " <b>Affected Hosts:</b> " + 
								x + " <b>Alarm text:</b> " + split_by_newline_today[i].split(",")[7] + " <b>Alarm description:</b> " + 
								split_by_newline_today[i].split("\"")[3] + " <b>Instance Count:</b> " + split_by_newline_today[i].split("\"").slice(-1)[0].split(",").slice(-1)[0] + 
								" <b>Unique Alarm ID:</b> " + split_by_newline_today[i].split("\"").slice(-1)[0].split(",").slice(-3,-1)[0]
		*/
		
		//severity = arr_NDS_History[i].split("<b>").slice(4)[0].split("</b>").slice(0)[0]
		//Alarm cleared/raised at = arr_NDS_History[i].split("<b>").slice(1)[0].split("</b>")[1]
		//Generic condition = arr_NDS_History[i].split("<b>").slice(2)[0].split("</b>")[1]
		//Affected Hosts = arr_NDS_History[i].split("<b>").slice(5)[0].split("</b>")[1]
		//Alarm Text = arr_NDS_History[i].split("<b>").slice(6)[0].split("</b>")[1]
		//Alarm Description = arr_NDS_History[i].split("<b>").slice(7)[0].split("</b>")[1] //index = 0,1 has strange <operation type=""> tag... Not sure if this will affect anything
		//Unique ID = ff3f4943-cc0a-4ea0-a0c2-cbb0f91b5213 (MAJOR)
		//instance count =  arr_NDS_History[i].split("<b>").slice(8)[0].split("</b>")[1]
		//Unique Alarm ID = arr_NDS_History[i].split("<b>").slice(9)[0].split("</b>")[1].split("</operation>")[0].split("</td>")[0]
		
		
		arr_NDS_History = (selectedValue === UNIQUE_ALARM_ID_A_TO_Z)? mergeSort(arr_NDS_History,UNIQUE_ALARM_ID_A_TO_Z,ONE_NDS_HISTORY_ALARMS):
						  (selectedValue === UNIQUE_ALARM_ID_Z_TO_A)? mergeSort(arr_NDS_History,UNIQUE_ALARM_ID_Z_TO_A,ONE_NDS_HISTORY_ALARMS):
						  (selectedValue === DATE_OLD_TO_NEW)? mergeSort(arr_NDS_History,DATE_OLD_TO_NEW, ONE_NDS_HISTORY_ALARMS):(selectedValue === DATE_NEW_TO_OLD)? 
						  mergeSort(arr_NDS_History,DATE_NEW_TO_OLD, ONE_NDS_HISTORY_ALARMS):(selectedValue === GENERIC_COND_A_TO_Z)? 
						  mergeSort(arr_NDS_History,GENERIC_COND_A_TO_Z, ONE_NDS_HISTORY_ALARMS):(selectedValue === GENERIC_COND_Z_TO_A)? 
						  mergeSort(arr_NDS_History,GENERIC_COND_Z_TO_A, ONE_NDS_HISTORY_ALARMS):(selectedValue === SEVERITY_A_TO_Z)?
						  mergeSort(arr_NDS_History,SEVERITY_A_TO_Z, ONE_NDS_HISTORY_ALARMS):(selectedValue === SEVERITY_Z_TO_A)? 
						  mergeSort(arr_NDS_History,SEVERITY_Z_TO_A, ONE_NDS_HISTORY_ALARMS):(selectedValue === AFFECTED_HOSTS_A_TO_Z)? 
						  mergeSort(arr_NDS_History,AFFECTED_HOSTS_A_TO_Z, ONE_NDS_HISTORY_ALARMS):(selectedValue === AFFECTED_HOSTS_Z_TO_A)? 
						  mergeSort(arr_NDS_History,AFFECTED_HOSTS_Z_TO_A, ONE_NDS_HISTORY_ALARMS):(selectedValue === ALARM_DESC_A_TO_Z)? 
						  mergeSort(arr_NDS_History,ALARM_DESC_A_TO_Z, ONE_NDS_HISTORY_ALARMS):(selectedValue === ALARM_DESC_Z_TO_A)? 
						  mergeSort(arr_NDS_History,ALARM_DESC_Z_TO_A, ONE_NDS_HISTORY_ALARMS):(selectedValue === ALARM_TEXT_A_TO_Z)? 
						  mergeSort(arr_NDS_History,ALARM_TEXT_A_TO_Z, ONE_NDS_HISTORY_ALARMS):(selectedValue === ALARM_TEXT_Z_TO_A)?
						  mergeSort(arr_NDS_History,ALARM_TEXT_Z_TO_A, ONE_NDS_HISTORY_ALARMS):(selectedValue === INST_COUNT_MOST_TO_LEAST)? 
						  mergeSort(arr_NDS_History,INST_COUNT_MOST_TO_LEAST, ONE_NDS_HISTORY_ALARMS):(selectedValue === INST_COUNT_LEAST_TO_MOST)? 
						  mergeSort(arr_NDS_History,INST_COUNT_LEAST_TO_MOST, ONE_NDS_HISTORY_ALARMS):mergeSort(arr_NDS_History,UNIQUE_ALARM_ID_A_TO_Z, ONE_NDS_HISTORY_ALARMS);
						  				  
						  
		//logic to clear table rows whenever new click is submitted (to get rid of other history searched)
		while(history_table_rows>1)
		{
			history_table.deleteRow(history_table_rows-1);
			history_table_rows--;
			//alert(history_table_rows);
		}
		
		
		while(i<len_NDS_History)
		{
			history_table.insertRow(history_table_rows).insertCell(0).innerHTML = arr_NDS_History[i];
			history_table_rows++;
			i++;
		}
		
		//alert(arr_NDS_History[0].split("<b>").slice(7)[0].split("</b>")[1]);

	}
}



//open or switches tabs
function switchTab(evt,tabNameHead,tabNameBody)
{
	//hideTextArea("LIVE_ONE_NDS_ALARMS_HEAD");
	//hideTextArea("LIVE_ONE_NDS_ALARMS_BODY");
	//hideTextArea("ONE_NDS_ALARM_HISTORY_HEAD");
	//hideTextArea("ONE_NDS_ALARM_HISTORY_BODY");
	//if($(".on").is(":visible"))
	//{
		//showTextArea("HLR_HSS_ALARM_HISTORY_HEAD");
		//showTextArea("HLR_HSS_ALARM_HISTORY_BODY");
	//}
	//else
	//{
		//showTextArea("LIVE_HLR_HSS_ALARMS_HEAD");
		//showTextArea("LIVE_HLR_HSS_ALARMS_BODY");
	//}
	var i, tabcontent, tablinks;
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
	  tabcontent[i].style.display = "none";
	}
	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
	  tablinks[i].className = tablinks[i].className.replace(" active", "");
	}
	document.getElementById(tabNameHead).style.display = "block";
	document.getElementById(tabNameBody).style.display = "block";
	evt.currentTarget.className += " active";
    if($(".off").is(":visible"))
		document.getElementById('live_or_history_id').click();

	
	
}
function toggleLiveOrHistory()
{
	//will need logic here to tell which tab is open (i.e.: OneNDS tab, HLR/HSS/EFE tab, NEMA tab , etc)
	//this can be done by checking which element is currently visable
	
	//use this to find the tab which has been clicked/is active (syntax is: $(.classoftab .active).text())
	let active_tab = $('.tab .active').text();
	var toHide = [LIVE_ONE_NDS_ALARMS_HEAD,LIVE_ONE_NDS_ALARMS_BODY,LIVE_HLR_HSS_ALARMS_HEAD,LIVE_HLR_HSS_ALARMS_BODY ,LIVE_EIR_ALARMS_HEAD ,LIVE_EIR_ALARMS_BODY ,LIVE_CISCO_ALARMS_HEAD 
				  ,LIVE_CISCO_ALARMS_BODY ,ONE_NDS_ALARM_HISTORY_HEAD ,ONE_NDS_ALARM_HISTORY_BODY ,HLR_HSS_ALARM_HISTORY_HEAD ,HLR_HSS_ALARM_HISTORY_BODY ,EIR_ALARM_HISTORY_HEAD 
				  ,EIR_ALARM_HISTORY_BODY ,CISCO_ALARM_HISTORY_HEAD,CISCO_ALARM_HISTORY_BODY ];
	var toShow;
	//alert(active_tab == "OneNDS");
	//simple logic for just 1 page (OneNDS page)
	
	//current state is on "live", so transition from live to history
	if($(".on").is(":visible"))
	{
		toShow = (active_tab == "OneNDS")?[ONE_NDS_ALARM_HISTORY_HEAD,ONE_NDS_ALARM_HISTORY_BODY]:(active_tab == "HLR/HSS")?[HLR_HSS_ALARM_HISTORY_HEAD,HLR_HSS_ALARM_HISTORY_BODY]
				: (active_tab == "EIR")?[EIR_ALARM_HISTORY_HEAD,EIR_ALARM_HISTORY_BODY]:[CISCO_ALARM_HISTORY_HEAD,CISCO_ALARM_HISTORY_BODY];
		for(i=0;i<toHide.length;i++)
		{
			hideTextArea(toHide[i]);
		}
		/*
		hideTextArea("LIVE_ONE_NDS_ALARMS_HEAD");
		hideTextArea("LIVE_ONE_NDS_ALARMS_BODY");
		hideTextArea("ONE_NDS_ALARM_HISTORY_HEAD");
		hideTextArea("ONE_NDS_ALARM_HISTORY_BODY");
		
		showTextArea("ONE_NDS_ALARM_HISTORY_HEAD");
		showTextArea("ONE_NDS_ALARM_HISTORY_BODY");
		*/
	}
	//current state is on "history", so transition from history to live
	else
	{
		/*
		hideTextArea("ONE_NDS_ALARM_HISTORY_HEAD");
		hideTextArea("ONE_NDS_ALARM_HISTORY_BODY");
		showTextArea("LIVE_ONE_NDS_ALARMS_HEAD");
		showTextArea("LIVE_ONE_NDS_ALARMS_BODY");
		*/
		toShow = (active_tab == "OneNDS")?[LIVE_ONE_NDS_ALARMS_HEAD,LIVE_ONE_NDS_ALARMS_BODY]:(active_tab == "HLR/HSS")?[LIVE_HLR_HSS_ALARMS_HEAD,LIVE_HLR_HSS_ALARMS_BODY]
		: (active_tab == "EIR")?[LIVE_EIR_ALARMS_HEAD,LIVE_EIR_ALARMS_BODY]:[LIVE_CISCO_ALARMS_HEAD,LIVE_CISCO_ALARMS_BODY];
		for(i=0;i<toHide.length;i++)
		{
			hideTextArea(toHide[i]);
		}	
	}
	showTextArea(toShow[0]);
	showTextArea(toShow[1]);
	
}

//function for returning the date in a particular format
function getCorrectDate(subtract_by)
{
  var reqDate = new Date();
  reqDate.setDate(reqDate.getDate() - subtract_by);
  var dd_reqDate = reqDate.getDate()<10? '0'+reqDate.getDate():reqDate.getDate();
  var mm_reqDate = (reqDate.getMonth()+1)<10? '0'+(reqDate.getMonth()+1):reqDate.getMonth()+1;
  var yyyy_reqDate = reqDate.getFullYear();
  reqDate = yyyy_reqDate + "-" + mm_reqDate + "-" + dd_reqDate;
  return(reqDate);
	
}

function historyTranslationTable(x)
{
	x.indexOf('nice') != -1
	var toReturn = x;
	
	toReturn = (x.indexOf(SDN_NAME_OF_BDSTOR011) != -1 || x.indexOf(HOSTNAME_BDSTOR011) != -1)? HOSTNAME_BDSTOR011:
			   (x.indexOf(SDN_NAME_OF_BDSTOR013) != -1 || x.indexOf(HOSTNAME_BDSTOR013) != -1)? HOSTNAME_BDSTOR013:
			   (x.indexOf(SDN_NAME_OF_BDSTOR021) != -1 || x.indexOf(HOSTNAME_BDSTOR021) != -1)? HOSTNAME_BDSTOR021:
			   (x.indexOf(SDN_NAME_OF_BDSTOR023) != -1 || x.indexOf(HOSTNAME_BDSTOR023) != -1)? HOSTNAME_BDSTOR023:
			   (x.indexOf(SDN_NAME_OF_BDSTOR031) != -1 || x.indexOf(HOSTNAME_BDSTOR031) != -1)? HOSTNAME_BDSTOR031:
			   (x.indexOf(SDN_NAME_OF_BDSTOR033) != -1 || x.indexOf(HOSTNAME_BDSTOR033) != -1)? HOSTNAME_BDSTOR033:
			   (x.indexOf(SDN_NAME_OF_BDSTOR041) != -1 || x.indexOf(HOSTNAME_BDSTOR041) != -1)? HOSTNAME_BDSTOR041:
			   (x.indexOf(SDN_NAME_OF_BDSTOR043) != -1 || x.indexOf(HOSTNAME_BDSTOR043) != -1)? HOSTNAME_BDSTOR043:
			   (x.indexOf(SDN_NAME_OF_BDSTOR051) != -1 || x.indexOf(HOSTNAME_BDSTOR051) != -1)? HOSTNAME_BDSTOR051:
			   (x.indexOf(SDN_NAME_OF_BDSTOR053) != -1 || x.indexOf(HOSTNAME_BDSTOR053) != -1)? HOSTNAME_BDSTOR053:
			   (x.indexOf(SDN_NAME_OF_BDSTOR061) != -1 || x.indexOf(HOSTNAME_BDSTOR061) != -1)? HOSTNAME_BDSTOR061:
			   (x.indexOf(SDN_NAME_OF_BDSTOR063) != -1 || x.indexOf(HOSTNAME_BDSTOR063) != -1)? HOSTNAME_BDSTOR063:
			   (x.indexOf(SDN_NAME_OF_BDSMTLl012) != -1 || x.indexOf(HOSTNAME_BDSMTL012) != -1)? HOSTNAME_BDSMTL012:
			   (x.indexOf(SDN_NAME_OF_BDSMTLl014) != -1 || x.indexOf(HOSTNAME_BDSMTL014) != -1)? HOSTNAME_BDSMTL014:
			   (x.indexOf(SDN_NAME_OF_BDSMTL022) != -1 || x.indexOf(HOSTNAME_BDSMTL022) != -1)? HOSTNAME_BDSMTL022:
			   (x.indexOf(SDN_NAME_OF_BDSMTL024) != -1 || x.indexOf(HOSTNAME_BDSMTL024) != -1)? HOSTNAME_BDSMTL024:
			   (x.indexOf(SDN_NAME_OF_BDSMTL032) != -1 || x.indexOf(HOSTNAME_BDSMTL032) != -1)? HOSTNAME_BDSMTL032:
			   (x.indexOf(SDN_NAME_OF_BDSMTL034) != -1 || x.indexOf(HOSTNAME_BDSMTL034) != -1)? HOSTNAME_BDSMTL034:
			   (x.indexOf(SDN_NAME_OF_BDSMTL042) != -1 || x.indexOf(HOSTNAME_BDSMTL042) != -1)? HOSTNAME_BDSMTL042:
			   (x.indexOf(SDN_NAME_OF_BDSMTL044) != -1 || x.indexOf(HOSTNAME_BDSMTL044) != -1)? HOSTNAME_BDSMTL044:
			   (x.indexOf(SDN_NAME_OF_BDSMTL052) != -1 || x.indexOf(HOSTNAME_BDSMTL052) != -1)? HOSTNAME_BDSMTL052:
			   (x.indexOf(SDN_NAME_OF_BDSMTL054) != -1 || x.indexOf(HOSTNAME_BDSMTL054) != -1)? HOSTNAME_BDSMTL054:
			   (x.indexOf(SDN_NAME_OF_BDSMTL062) != -1 || x.indexOf(HOSTNAME_BDSMTL062) != -1)? HOSTNAME_BDSMTL062:
			   (x.indexOf(SDN_NAME_OF_BDSMTL064) != -1 || x.indexOf(HOSTNAME_BDSMTL064) != -1)? HOSTNAME_BDSMTL064:
			   (x.indexOf(SDN_NAME_OF_FDSTOR001) != -1 || x.indexOf(HOSTNAME_FDSTOR001) != -1)? HOSTNAME_FDSTOR001:
			   (x.indexOf(SDN_NAME_OF_FDSTOR002) != -1 || x.indexOf(HOSTNAME_FDSTOR002) != -1)? HOSTNAME_FDSTOR002:
			   (x.indexOf(SDN_NAME_OF_FDSTOR003) != -1 || x.indexOf(HOSTNAME_FDSTOR003) != -1)? HOSTNAME_FDSTOR003:
			   (x.indexOf(SDN_NAME_OF_FDSTOR004) != -1 || x.indexOf(HOSTNAME_FDSTOR004) != -1)? HOSTNAME_FDSTOR004:
			   (x.indexOf(SDN_NAME_OF_FDSMTL001) != -1 || x.indexOf(HOSTNAME_FDSMTL001) != -1)? HOSTNAME_FDSMTL001:
			   (x.indexOf(SDN_NAME_OF_FDSMTL002) != -1 || x.indexOf(HOSTNAME_FDSMTL002) != -1)? HOSTNAME_FDSMTL002:
			   (x.indexOf(SDN_NAME_OF_FDSMTL003) != -1 || x.indexOf(HOSTNAME_FDSMTL003) != -1)? HOSTNAME_FDSMTL003:
			   (x.indexOf(SDN_NAME_OF_FDSMTL004) != -1 || x.indexOf(HOSTNAME_FDSMTL004) != -1)? HOSTNAME_FDSMTL004:
			   (x.indexOf(SDN_NAME_OF_PGDTOR011) != -1 || x.indexOf(SDN_NAME_OF_PGDTOR011_NTF) != -1 || x.indexOf(HOSTNAME_PGDTOR011) != -1)? HOSTNAME_PGDTOR011:
			   (x.indexOf(SDN_NAME_OF_PGDTOR013) != -1 || x.indexOf(SDN_NAME_OF_PGDTOR013_NTF) != -1 || x.indexOf(HOSTNAME_PGDTOR013) != -1)? HOSTNAME_PGDTOR013:
			   (x.indexOf(SDN_NAME_OF_PGDMTL012) != -1 || x.indexOf(SDN_NAME_OF_PGDMTL012_NTF) != -1 || x.indexOf(HOSTNAME_PGDMTL012) != -1)? HOSTNAME_PGDMTL012:
			   (x.indexOf(SDN_NAME_OF_PGDMTL014) != -1 || x.indexOf(SDN_NAME_OF_PGDMTL014_NTF) != -1 || x.indexOf(HOSTNAME_PGDMTL014) != -1)? HOSTNAME_PGDMTL014:
			   (x.indexOf(SDN_NAME_OF_DBMMTL001) != -1 || x.indexOf(SDN_NAME_OF_DBMMTL001_SS) != -1 || x.indexOf(HOSTNAME_DBMMTL001) != -1)? HOSTNAME_DBMMTL001:
			   (x.indexOf(SDN_NAME_OF_DBMTOR001) != -1 || x.indexOf(SDN_NAME_OF_DBMTOR001_SS) != -1 || x.indexOf(HOSTNAME_DBMTOR001) != -1)? HOSTNAME_DBMTOR001:
			   (x.indexOf(SDN_NAME_OF_DBMTOR002) != -1 || x.indexOf(SDN_NAME_OF_DBMTOR002_SS) != -1 || x.indexOf(HOSTNAME_DBMTOR002) != -1)? HOSTNAME_DBMTOR002:
			   (x.indexOf(SDN_NAME_OF_PGWTOR001) != -1 || x.indexOf(HOSTNAME_PGWTOR001) != -1)? HOSTNAME_PGWTOR001:
			   (x.indexOf(SDN_NAME_OF_PGWTOR002) != -1 || x.indexOf(HOSTNAME_PGWTOR002) != -1)? HOSTNAME_PGWTOR002:
			   (x.indexOf(SDN_NAME_OF_PGWMTL001) != -1 || x.indexOf(HOSTNAME_PGWMTL001) != -1)? HOSTNAME_PGWMTL001:
			   (x.indexOf(SDN_NAME_OF_PGWMTL002) != -1 || x.indexOf(HOSTNAME_PGWMTL002) != -1)? HOSTNAME_PGWMTL002:
			   (x.indexOf(HOSTNAME_DISTOR001) != -1 )? HOSTNAME_DISTOR001: (x.indexOf(HOSTNAME_DISMTL001) != -1)? HOSTNAME_DISMTL001:toReturn;
	return toReturn;
}

//remove duplicate values from a table (used in OneNDS alarm history)
function removeDuplicateRows($table){
    function getVisibleRowText($row){
        return $row.find('td:visible').text().toLowerCase();
    }

    $table.find('tr').each(function(index, row){
        var $row = $(row);
        $row.nextAll('tr').each(function(index, next){
            var $next = $(next);
            if(getVisibleRowText($next) == getVisibleRowText($row))
                $next.remove();
        })
    });
}





//This function makes a ajax call to the server side code (Filter.php), to write to a txt file what should be filtered
function ajaxPostOnClick(func,id)
{
	if(id!='clear')
		var txtToFilter = document.getElementById(id).value;
	else
		var txtToFilter = '';
	//alert(txtToFilter);
	
	var FunctionToCall = func;
	
	$.ajax({
		type: "POST",
		url: 'http://10.55.105.249/SDM_BackEnd/alarms/Filter.php',
		dataType: 'json',
		async: false,
		data: {"method": FunctionToCall, "payload": txtToFilter},

		success: function (obj, textstatus) {
					  if( !('error' in obj) ) {
						  yourVariable = obj.result;
					  }
					  else {
						  console.log(obj.error);
					  }
				}
	});
	//clear textarea after ajax post to file
	/*
	if(id!='clear')
		document.getElementById(id).value = "";*/

	location.reload(true);
}

//find all arr elements where strings (from arr1) are present in another array (arr2) - used for filter in feature NDS Alarm History (assumes sorted lists a-z) 
function getFilterInMatches(arr1, arr2, type) 
{
    var ele = []; 
	let i = 0, j= 0;
    while(i < arr1.length)
	{
		if(type == ALARM_TEXT_A_TO_Z)
		{
			if(j>=arr2.length)
				break;
			//console.log(arr2[j].split("<b>").slice(6)[0].split("</b>")[1]);
			if (arr1[i] === arr2[j].split("<b>").slice(6)[0].split("</b>")[1].trim().replace(/['"]+/g, '')) 
			{
				ele.push(arr2[j]);
				j++;
			}
			else
			{
				if (arr1[i] > arr2[j].split("<b>").slice(6)[0].split("</b>")[1].trim().replace(/['"]+/g, ''))
					j++;
				else
					i++;
			}
		}
		
		if(type == AFFECTED_HOSTS_A_TO_Z)
		{
			if(j>=arr2.length)
				break;
			if (arr1[i] === arr2[j].split("<b>").slice(5)[0].split("</b>")[1].trim().replace(/['"]+/g, ''))
			{
				ele.push(arr2[j]);
				j++;
			}
			else
			{
				if (arr1[i] > arr2[j].split("<b>").slice(5)[0].split("</b>")[1].trim().replace(/['"]+/g, ''))
					j++;
				else
					i++;
			}
		}

	}
	
    return ele;
}

//intention for these 2 functions is that whenever the page is reloaded/filters are submitted, it will reappear in the text area
/*
window.onbeforeunload = function() {
localStorage.setItem("AlarmFilters", $('#alarmsTextFilter').val());
localStorage.setItem("NodeFilters", $('#nodeFilter').val());
// ...
}
*/

//logic used to write alarm and node filters to the text areas on the web page upon submission/refresh (used for NDS Live and NDS History)
window.onload = function() 
{

	//var AlarmFilters = localStorage.getItem("AlarmFilters");
	//var NodeFilters = localStorage.getItem("NodeFilters");
	
	//For Live OneNDS Alarm filtering
	let alarms_txt_to_filter_arr = readFileAndSort(LIVE_ALARMS_TXT_FILTER_PATH,GENERIC_SORT_A_TO_Z);
	let sizeOfArrTxtToFilter = alarms_txt_to_filter_arr.length;
	let alarms_txt_to_filter_str = "";
	let nodes_txt_to_filter_arr = readFileAndSort(LIVE_NODE_TXT_FILTER_PATH,GENERIC_SORT_A_TO_Z);
	let sizeOfArrNodeToFilter = nodes_txt_to_filter_arr.length;
	let nodes_txt_to_filter_str = "";
	
	//For OneNDS Alarm History filtering (no modifications to readFileAndSort needed... uses the generic sort from live alarms)
	let hist_alarm_txt_to_filter_arr = readFileAndSort(HIST_ALARMS_TXT_FILTER_PATH,GENERIC_SORT_A_TO_Z);
	let sizeOfHistArrTxtToFilter = hist_alarm_txt_to_filter_arr.length;
	let hist_alarm_txt_to_filter_str = "";
	let hist_nodes_txt_to_filter_arr = readFileAndSort(HIST_NODE_TXT_FILTER_PATH,GENERIC_SORT_A_TO_Z);
	let sizeOfHistArrNodeToFilter = hist_nodes_txt_to_filter_arr.length;
	let hist_nodes_txt_to_filter_str = "";
	
	
	//needed to generate unique download file each time (to see what filter settings are already set (for live and history)
	let rand1 = Math.floor((Math.random() * 100000) + 1);
	let rand2 = Math.floor((Math.random() * 100000) + 1);
	let rand3 = Math.floor((Math.random() * 100000) + 1);
	let rand4 = Math.floor((Math.random() * 100000) + 1);
	
	let i = 0;
	//logic for displaying alarm filters for OneNDS LIVE alarms
	//Alarm filters logic (LIVE)
	if(sizeOfArrTxtToFilter>0)
	{
		while(i<sizeOfArrTxtToFilter)
		{
			if(i == sizeOfArrTxtToFilter -1)
				alarms_txt_to_filter_str += alarms_txt_to_filter_arr[i];
			else
				alarms_txt_to_filter_str += alarms_txt_to_filter_arr[i] + "\n";
			i++;
		}
		i = 0;
		$('#alarmsTextFilter').val(alarms_txt_to_filter_str);
		alarms_txt_to_filter_str = "";
	}

	else
		$('#alarmsTextFilter').val("");

	//Node filters logic (LIVE)
	if(sizeOfArrNodeToFilter>0)
	{
		while(i<sizeOfArrNodeToFilter)
		{
			if(i == sizeOfArrNodeToFilter -1)
				nodes_txt_to_filter_str += nodes_txt_to_filter_arr[i];
			else
				nodes_txt_to_filter_str += nodes_txt_to_filter_arr[i] + "\n";		
			i++;
		}
		i = 0;
		$('#nodeFilter').val(nodes_txt_to_filter_str);
		nodes_txt_to_filter_str = "";
	}

	else
		$('#nodeFilter').val("");
	
	//logic for displaying alarm filters for OneNDS alarm HISTORY
	
	//Alarms filter logic (HISTORY)
	if(sizeOfHistArrTxtToFilter>0)
	{
		while(i<sizeOfHistArrTxtToFilter)
		{
			if(i == sizeOfHistArrTxtToFilter -1)
				hist_alarm_txt_to_filter_str += hist_alarm_txt_to_filter_arr[i];
			else
				hist_alarm_txt_to_filter_str += hist_alarm_txt_to_filter_arr[i] + "\n";
			i++;
		}
		i = 0;
		$('#NDSalarmsHistoryTextFilter').val(hist_alarm_txt_to_filter_str);
		hist_alarm_txt_to_filter_str = "";
	}

	else
		$('#NDSalarmsHistoryTextFilter').val("");
	
	
	//Node filter logic (HISTORY)
	if(sizeOfHistArrNodeToFilter>0)
	{
		while(i<sizeOfHistArrNodeToFilter)
		{
			if(i == sizeOfHistArrNodeToFilter -1)
				hist_nodes_txt_to_filter_str += hist_nodes_txt_to_filter_arr[i];
			else
				hist_nodes_txt_to_filter_str += hist_nodes_txt_to_filter_arr[i] + "\n";		
			i++;
		}
		i = 0;
		$('#NDShistoryNodeFilter').val(hist_nodes_txt_to_filter_str);
		hist_nodes_txt_to_filter_str = "";
	}

	else
		$('#NDShistoryNodeFilter').val("");	
	
	
	//needed to generate a unique download (i.e.: ensures downloadable file actually updates) for filter txt files
	$("#DOWNLOAD_NDS_LIVE_ALARM_TXT_FILTER").attr("href",LIVE_ALARMS_TXT_FILTER_PATH + "?" + rand1);
	$("#DOWNLOAD_NDS_LIVE_NODE_ALARM_FILTER").attr("href",LIVE_NODE_TXT_FILTER_PATH + "?" + rand2);
	$("#DOWNLOAD_NDS_HISTORY_ALARM_TXT_FILTER").attr("href",HIST_ALARMS_TXT_FILTER_PATH + "?" + rand3);
	$("#DOWNLOAD_NDS_HISTORY_NODE_ALARM_FILTER").attr("href",HIST_NODE_TXT_FILTER_PATH + "?" + rand4);
	/*$('#alarmsTextFilter').val(alarms_txt_to_filter_arr);
	$('#nodeFilter').val(nodes_txt_to_filter_arr);
	*/
}








//used to send payload to backend code which will write the OneNDS alarms after filtering to a txt file (so that the main page can process it)
function ajaxWriteOneNDSAlarms(func,alarms)
{
	var FunctionToCall = func;
	$.ajax({
		type: "POST",
		url: 'http://10.55.105.249/SDM_BackEnd/alarms/Filter.php',
		async: false,
		dataType: 'json',
		data: {"method": FunctionToCall, "payload": alarms},

		success: function (obj, textstatus) {
					  if( !('error' in obj) ) {
						  yourVariable = obj.result;
					  }
					  else {
						  console.log(obj.error);
					  }
				}
	});
	
}

//ajax call (jquery) to read txt file 
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

//these 2 functions will show/hide textArea for filters depending on which button is pressed
function showTextArea(id)
{
	document.getElementById(id).style.display = 'block';
}

function hideTextArea(id)
{
	document.getElementById(id).style.display = 'none';
}

//ajax call (jquery) to read a txt file, then sort in a specific way
function readFileAndSort(path,sort_by)
{
	var my_str = '';
	var my_arr = [];
	//needs to be asynchronous so that the return is successful
    $.ajax({
        url: path,
		cache: false,
        type: 'get',
        dataType: 'text',
        async: false,
        success: function(data) {
            my_str = data;
        } 
    });
	my_arr = my_str.split("\n");
	//remove blank entries
	for(var i = my_arr.length-1; i--;)
	{
		if ( my_arr[i] === '') my_arr.splice(i, 1);
	}
	my_arr = mergeSort(my_arr,sort_by, ONE_NDS_LIVE_ALARMS);
	return my_arr;

}

//used to keep the state of toggle switch upon refresh
function displayOnPage()
{
	//will need logic here to tell which tab is open (i.e.: OneNDS tab, HLR/HSS/EFE tab, NEMA tab , etc)
	//this can be done by checking which element is currently visable
	
	
	//simple logic for just 1 page (OneNDS page)
	
	//current state is on "live"
	if($(".on").is(":visible"))
	{
		hideTextArea("ONE_NDS_ALARM_HISTORY_HEAD");
		hideTextArea("ONE_NDS_ALARM_HISTORY_BODY");
		showTextArea("LIVE_ONE_NDS_ALARMS_HEAD");
		showTextArea("LIVE_ONE_NDS_ALARMS_BODY");
	}
	//current state is on "history"
	else
	{
		hideTextArea("LIVE_ONE_NDS_ALARMS_HEAD");
		hideTextArea("LIVE_ONE_NDS_ALARMS_BODY");
		showTextArea("ONE_NDS_ALARM_HISTORY_HEAD");
		showTextArea("ONE_NDS_ALARM_HISTORY_BODY");	
	}
	
}



// Split the array into halves and merge them recursively 
function mergeSort (arr, fieldToSort, platform_type) {
  if (arr.length === 1) {
    // return once we hit an array with a single item
    return arr
  }
  const middle = Math.floor(arr.length / 2) // get the middle item of the array rounded down
  const left = arr.slice(0, middle) // items on the left side
  const right = arr.slice(middle) // items on the right side
  return merge(
    mergeSort(left,fieldToSort, platform_type),
    mergeSort(right, fieldToSort, platform_type), 
	fieldToSort, platform_type
  )
}

// compare the arrays item by item and return the concatenated result
function merge (left, right, fieldToSort, platform_type) {
  let result = []
  let indexLeft = 0
  let indexRight = 0

  while (indexLeft < left.length && indexRight < right.length) 
  {
	if(platform_type == ONE_NDS_HISTORY_ALARMS)
	{		
		//sort by Unique Alarm ID A to Z (ONLY FOR OneNDS History) (DEFAULT CASE)... Used only before table is generated... When table is already generated, other cases below are used
		if(fieldToSort === DEFAULT)
		{
			if (left[indexLeft].split("<b>").slice(-1)[0].split("</b>").slice(-1)[0] < right[indexRight].split("<b>").slice(-1)[0].split("</b>").slice(-1)[0]) {
			  result.push(left[indexLeft])
			  indexLeft++
			} else {
			  result.push(right[indexRight])
			  indexRight++
			}
			//alert("sort by Alarm desc Z to A");
		}
		
		//sort by Unique Alarm ID A to Z (ONLY FOR OneNDS History)
		if(fieldToSort === UNIQUE_ALARM_ID_A_TO_Z)
		{
			if (left[indexLeft].split("<b>").slice(9)[0].split("</b>")[1] < 
				right[indexRight].split("<b>").slice(9)[0].split("</b>")[1]) {
			  result.push(left[indexLeft])
			  indexLeft++
			} else {
			  result.push(right[indexRight])
			  indexRight++
			}
			//alert("sort by Alarm desc Z to A");
		}			
		
		//sort by Unique Alarm ID Z to A (ONLY FOR OneNDS History)
		if(fieldToSort === UNIQUE_ALARM_ID_Z_TO_A)
		{
			if (left[indexLeft].split("<b>").slice(9)[0].split("</b>")[1] > 
				right[indexRight].split("<b>").slice(9)[0].split("</b>")[1]) {
			  result.push(left[indexLeft])
			  indexLeft++
			} else {
			  result.push(right[indexRight])
			  indexRight++
			}
			//alert("sort by Alarm desc Z to A");
		}

		//Sort by oldest date to newest date
		if(fieldToSort === DATE_OLD_TO_NEW)
		{
			if (left[indexLeft].split("<b>").slice(1)[0].split("</b>")[1] < right[indexRight].split("<b>").slice(1)[0].split("</b>")[1]) {
			  result.push(left[indexLeft])
			  indexLeft++
			} else {
			  result.push(right[indexRight])
			  indexRight++
			}
			//alert("date old to new");
		}
		
		//sort by newest date to oldest date
		if(fieldToSort === DATE_NEW_TO_OLD)
		{
			if (left[indexLeft].split("<b>").slice(1)[0].split("</b>")[1] > right[indexRight].split("<b>").slice(1)[0].split("</b>")[1]) {
			  result.push(left[indexLeft])
			  indexLeft++
			} else {
			  result.push(right[indexRight])
			  indexRight++
			}
			//alert("date new to old");
		}
		
		//sort A to Z Generic condition
		if(fieldToSort === GENERIC_COND_A_TO_Z)
		{
			if (left[indexLeft].split("<b>").slice(2)[0].split("</b>")[1] < right[indexRight].split("<b>").slice(2)[0].split("</b>")[1]) {
			  result.push(left[indexLeft])
			  indexLeft++
			} else {
			  result.push(right[indexRight])
			  indexRight++
			}
			//alert("sort A to Z Generic condition");
		}
		
		//sort Z to A Generic condition
		if(fieldToSort === GENERIC_COND_Z_TO_A)
		{
			if (left[indexLeft].split("<b>").slice(2)[0].split("</b>")[1] > right[indexRight].split("<b>").slice(2)[0].split("</b>")[1]) {
			  result.push(left[indexLeft])
			  indexLeft++
			} else {
			  result.push(right[indexRight])
			  indexRight++
			}
			//alert("sort Z to A Generic condition");
		}

		//sort A to Z Severity
		if(fieldToSort === SEVERITY_A_TO_Z)
		{
			if (left[indexLeft].split("<b>").slice(4)[0].split("</b>").slice(0)[0] < right[indexRight].split("<b>").slice(4)[0].split("</b>").slice(0)[0]) {
			  result.push(left[indexLeft])
			  indexLeft++
			} else {
			  result.push(right[indexRight])
			  indexRight++
			}
			//alert("sort A to Z Severity");
		}
		//sort Z to A Severity
		if(fieldToSort === SEVERITY_Z_TO_A)
		{
			if (left[indexLeft].split("<b>").slice(4)[0].split("</b>").slice(0)[0] > right[indexRight].split("<b>").slice(4)[0].split("</b>").slice(0)[0]) {
			  result.push(left[indexLeft])
			  indexLeft++
			} else {
			  result.push(right[indexRight])
			  indexRight++
			}
			//alert("sort Z to A Severity");
		}
		
		//sort A to Z Affected Hosts
		if(fieldToSort === AFFECTED_HOSTS_A_TO_Z)
		{
			if (left[indexLeft].split("<b>").slice(5)[0].split("</b>")[1] < right[indexRight].split("<b>").slice(5)[0].split("</b>")[1]) {
			  result.push(left[indexLeft])
			  indexLeft++
			} else {
			  result.push(right[indexRight])
			  indexRight++
			}
			
			//alert("sort A to Z Affected Hosts");
		}
		//sort Z to A Affected Hosts
		if(fieldToSort === AFFECTED_HOSTS_Z_TO_A)
		{
			if (left[indexLeft].split("<b>").slice(5)[0].split("</b>")[1] > right[indexRight].split("<b>").slice(5)[0].split("</b>")[1]) {
			  result.push(left[indexLeft])
			  indexLeft++
			} else {
			  result.push(right[indexRight])
			  indexRight++
			}
			//alert("sort Z to A Affected Hosts");
		}
		
		//Sort by Alarms A to Z
		if(fieldToSort === ALARM_TEXT_A_TO_Z)
		{
			if (left[indexLeft].split("<b>").slice(6)[0].split("</b>")[1] < right[indexRight].split("<b>").slice(6)[0].split("</b>")[1]) {
			  result.push(left[indexLeft])
			  indexLeft++
			} else {
			  result.push(right[indexRight])
			  indexRight++
			}
			//alert("Sort by Alarms A to Z");
		}
		
		//sort by Alarms Z to A
		if(fieldToSort === ALARM_TEXT_Z_TO_A)
		{
			if (left[indexLeft].split("<b>").slice(6)[0].split("</b>")[1] > right[indexRight].split("<b>").slice(6)[0].split("</b>")[1]) {
			  result.push(left[indexLeft])
			  indexLeft++
			} else {
			  result.push(right[indexRight])
			  indexRight++
			}
			//alert("sort by Alarms Z to A");
		}
		
		//Sort by Alarm description A to Z
		if(fieldToSort === ALARM_DESC_A_TO_Z)
		{
			if (left[indexLeft].split("<b>").slice(7)[0].split("</b>")[1] < right[indexRight].split("<b>").slice(7)[0].split("</b>")[1]) {
			  result.push(left[indexLeft])
			  indexLeft++
			} else {
			  result.push(right[indexRight])
			  indexRight++
			}
			//alert("Sort by Alarm desc A to Z");
		}
		
		//sort by Alarms Z to A
		if(fieldToSort === ALARM_DESC_Z_TO_A)
		{
			if (left[indexLeft].split("<b>").slice(7)[0].split("</b>")[1] > right[indexRight].split("<b>").slice(7)[0].split("</b>")[1]) {
			  result.push(left[indexLeft])
			  indexLeft++
			} else {
			  result.push(right[indexRight])
			  indexRight++
			}
			//alert("sort by Alarm desc Z to A");
		}
		
		//Sort by Instance Count Most to Least
		if(fieldToSort === INST_COUNT_MOST_TO_LEAST)
		{
			if (left[indexLeft].split("<b>").slice(8)[0].split("</b>")[1] > right[indexRight].split("<b>").slice(8)[0].split("</b>")[1]) {
			  result.push(left[indexLeft])
			  indexLeft++
			} else {
			  result.push(right[indexRight])
			  indexRight++
			}
			//alert("Sort by Instance Count Most to Least");
		}
		
		//Sort by Instance Count Least to Most
		if(fieldToSort === INST_COUNT_LEAST_TO_MOST)
		{
			if (left[indexLeft].split("<b>").slice(8)[0].split("</b>")[1] < right[indexRight].split("<b>").slice(8)[0].split("</b>")[1]) {
			  result.push(left[indexLeft])
			  indexLeft++
			} else {
			  result.push(right[indexRight])
			  indexRight++
			}
			//alert("Sort by Instance Count Least to Most");
		}		
		
		
		
		
	}	
	  
	  
	if(platform_type == ONE_NDS_LIVE_ALARMS)
	{	
		//Sort by oldest date to newest date
		if(fieldToSort === DATE_OLD_TO_NEW)
		{
			if (left[indexLeft].split("|")[0] < right[indexRight].split("|")[0]) {
			  result.push(left[indexLeft])
			  indexLeft++
			} else {
			  result.push(right[indexRight])
			  indexRight++
			}
			//alert("date old to new");
		}
		
		//sort by newest date to oldest date
		if(fieldToSort === DATE_NEW_TO_OLD)
		{
			if (left[indexLeft].split("|")[0] > right[indexRight].split("|")[0]) {
			  result.push(left[indexLeft])
			  indexLeft++
			} else {
			  result.push(right[indexRight])
			  indexRight++
			}
			//alert("date new to old");
		}
		
		//sort A to Z Generic condition
		if(fieldToSort === GENERIC_COND_A_TO_Z)
		{
			if (left[indexLeft].split("|")[1] < right[indexRight].split("|")[1]) {
			  result.push(left[indexLeft])
			  indexLeft++
			} else {
			  result.push(right[indexRight])
			  indexRight++
			}
			//alert("sort A to Z Generic condition");
		}
		
		//sort Z to A Generic condition
		if(fieldToSort === GENERIC_COND_Z_TO_A)
		{
			if (left[indexLeft].split("|")[1] > right[indexRight].split("|")[1]) {
			  result.push(left[indexLeft])
			  indexLeft++
			} else {
			  result.push(right[indexRight])
			  indexRight++
			}
			//alert("sort Z to A Generic condition");
		}

		//sort A to Z Severity
		if(fieldToSort === SEVERITY_A_TO_Z)
		{
			if (left[indexLeft].split("|")[2] < right[indexRight].split("|")[2]) {
			  result.push(left[indexLeft])
			  indexLeft++
			} else {
			  result.push(right[indexRight])
			  indexRight++
			}
			//alert("sort A to Z Severity");
		}
		//sort Z to A Severity
		if(fieldToSort === SEVERITY_Z_TO_A)
		{
			if (left[indexLeft].split("|")[2] > right[indexRight].split("|")[2]) {
			  result.push(left[indexLeft])
			  indexLeft++
			} else {
			  result.push(right[indexRight])
			  indexRight++
			}
			//alert("sort Z to A Severity");
		}
		
		//sort A to Z Affected Hosts
		if(fieldToSort === AFFECTED_HOSTS_A_TO_Z)
		{
			if (left[indexLeft].split("|")[6] < right[indexRight].split("|")[6]) {
			  result.push(left[indexLeft])
			  indexLeft++
			} else {
			  result.push(right[indexRight])
			  indexRight++
			}
			
			//alert("sort A to Z Affected Hosts");
		}
		//sort Z to A Affected Hosts
		if(fieldToSort === AFFECTED_HOSTS_Z_TO_A)
		{
			if (left[indexLeft].split("|")[6] > right[indexRight].split("|")[6]) {
			  result.push(left[indexLeft])
			  indexLeft++
			} else {
			  result.push(right[indexRight])
			  indexRight++
			}
			//alert("sort Z to A Affected Hosts");
		}
		
		//Sort by Alarms A to Z
		if(fieldToSort === ALARM_TEXT_A_TO_Z)
		{
			if (left[indexLeft].split("|")[7] < right[indexRight].split("|")[7]) {
			  result.push(left[indexLeft])
			  indexLeft++
			} else {
			  result.push(right[indexRight])
			  indexRight++
			}
			//alert("Sort by Alarms A to Z");
		}
		
		//sort by Alarms Z to A
		if(fieldToSort === ALARM_TEXT_Z_TO_A)
		{
			if (left[indexLeft].split("|")[7] > right[indexRight].split("|")[7]) {
			  result.push(left[indexLeft])
			  indexLeft++
			} else {
			  result.push(right[indexRight])
			  indexRight++
			}
			//alert("sort by Alarms Z to A");
		}
		
		
		
		
		//Sort by Alarm description A to Z
		if(fieldToSort === ALARM_DESC_A_TO_Z)
		{
			if (left[indexLeft].split("|")[8] < right[indexRight].split("|")[8]) {
			  result.push(left[indexLeft])
			  indexLeft++
			} else {
			  result.push(right[indexRight])
			  indexRight++
			}
			//alert("Sort by Alarm desc A to Z");
		}
		
		//sort by Alarms Z to A
		if(fieldToSort === ALARM_DESC_Z_TO_A)
		{
			if (left[indexLeft].split("|")[8] > right[indexRight].split("|")[8]) {
			  result.push(left[indexLeft])
			  indexLeft++
			} else {
			  result.push(right[indexRight])
			  indexRight++
			}
			//alert("sort by Alarm desc Z to A");
		}
		
		
		
		//Sort by Instance Count Most to Least
		if(fieldToSort === INST_COUNT_MOST_TO_LEAST)
		{
			if (left[indexLeft].split("|")[13] > right[indexRight].split("|")[13]) {
			  result.push(left[indexLeft])
			  indexLeft++
			} else {
			  result.push(right[indexRight])
			  indexRight++
			}
			//alert("Sort by Instance Count Most to Least");
		}
		
		//Sort by Instance Count Least to Most
		if(fieldToSort === INST_COUNT_LEAST_TO_MOST)
		{
			if (left[indexLeft].split("|")[13] < right[indexRight].split("|")[13]) {
			  result.push(left[indexLeft])
			  indexLeft++
			} else {
			  result.push(right[indexRight])
			  indexRight++
			}
			//alert("Sort by Instance Count Least to Most");
		}
		
		//Generic sort for arrays that can't be split (e.g.: filter array)
		if(fieldToSort === GENERIC_SORT_A_TO_Z)
		{
			if (left[indexLeft] < right[indexRight]) {
			  result.push(left[indexLeft])
			  indexLeft++
			} else {
			  result.push(right[indexRight])
			  indexRight++
			}
			//alert("Generic mergeSort");
		}
	}
	
	
  }
  
  return result.concat(left.slice(indexLeft)).concat(right.slice(indexRight))
}



