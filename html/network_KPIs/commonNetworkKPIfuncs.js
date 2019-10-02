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



function ajaxPost(func,str)
{
	var FunctionToCall = func;
	$.ajax({
		type: "POST",
		url: 'http://10.55.105.249/SDM_BackEnd/NetworkKPIs/NetworkKPI.php',
		async: false,
		dataType: 'json',
		data: {"method": FunctionToCall, "payload": str},

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


function appendToDict(arr,len,statsType)
{
	let fds = "fds";
    let bdsa = "bdsa";
	let i = 0;
	let time_arr = [];
	let TPS_arr = [];
	while(i<len)
	{
		let tmp_arr = arr[i].split(" ");
		tmp_arr = tmp_arr.filter(Boolean);
		//console.log(tmp_arr[1]);
		time_arr.push(tmp_arr[1]);
		if(statsType == bdsa)
			TPS_arr.push(parseInt(tmp_arr[3]));
		if(statsType == fds)
		    TPS_arr.push(parseInt(tmp_arr[5]));
		i++;
	}
	//console.log(TPS_arr);
	return [time_arr,TPS_arr];
}

//Generate layout for all TPS graphs to be generated
function genLayoutDict(tps_thresh,graph_title,x_title,y_title,w,h)
{
	var layout = 
	{
		
		title:graph_title,
		
		xaxis: {
			title: x_title,
			zeroline: false
		},
	    yaxis: {
			title: y_title 
		},
		
		autosize: false,
		width: w,
		height: h,
		

		
		shapes: 
		[
			//x0 and x1 NEED to be set at 0 and 1 respectively, y1, and y0 should be set at the same value
			{
			type: 'line',
			xref: 'paper',
			x0: 0,
			y0: tps_thresh,
			x1: 1,
			y1: tps_thresh,
				line:
				{
					color: 'rgb(255, 0, 0)',
					width: 4,
					dash:'dot'
				}
			}
		]	
	
	};
	return layout;
}


//Split string by newline, splice array (start and end) by a specified number, then return array and length or array
function splitAndSpliceArr(aStr,splitBy,startInd,numToRemove)
{
	arr = aStr.split(splitBy);
    arr.splice(startInd,numToRemove)	
	let size = arr.length;
	arr.splice(size-numToRemove,numToRemove);
	size = arr.length;
	return [arr,size];
}

//these 2 functions will show/hide textArea
function showTextArea(id)
{
	document.getElementById(id).style.display = 'block';
}

function hideTextArea(id)
{
	document.getElementById(id).style.display = 'none';
}



//function to determine which bdsas TPS KPIs to display
function dsToDisplay(check_id,bdsa_div_id)
{
	// it is checked
	if ($('#'+check_id).is(":checked"))
		showTextArea(bdsa_div_id);
	else
		hideTextArea(bdsa_div_id);
}
/*
window.onload = function() 
{
	let bdsa_base = "bdsa";
	let i = 2;
	while(i<=NUM_OF_DSA)
	{
		let check_id = "";
		let bdsa_div_id = "";
		check_id = bdsa_base + String(i) + "_on_off";
		bdsa_div_id = bdsa_base + String(i) + "Div";
		dsToDisplay(check_id,bdsa_div_id);
		i++;
	}
	
}*/


//open or switches tabs
function switchTab(evt,tabNameHead,tabNameBody)
{
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
	genTPSKPIGraph();
	
}


function genTPSGraph(filePath,tps_threshold,divToPlotTo,graph_title,x_title,y_title,w,h,fds_or_bdsa)
{
	
	
	let ds_KPI_str = readTxtFile(filePath);
	var ds_KPI_arr, ds_KPI_len;
	[ds_KPI_arr,ds_KPI_len] = splitAndSpliceArr(ds_KPI_str,"\n",0,12);
	var ds_data = {
	  x: [],
	  y: [],
	  //type: 'scatter',
	};
	[ds_data["x"],ds_data["y"]] = appendToDict(ds_KPI_arr,ds_KPI_len,fds_or_bdsa);
	var ds_layout = genLayoutDict(tps_threshold,graph_title,x_title,y_title,w,h);
	var ds_data_to_plot = [ds_data];
	Plotly.newPlot(divToPlotTo, ds_data_to_plot, ds_layout, {showSendToCloud: true});
	
}



//function to process all BDSA/FDS TPS, and determine if they are above a threshold, then to call another function to overwrite the tps status file if conditions are method
//need to read the status file first, then check if "above" is already written there... if it is, dont write anything to it, else write "above" if graph goes above threshold

//we should be observing only times that are >= 30 minutes ago to determine if threshold has been passed


function isDSAaboveThreshold(filePath,tps_threshold,fds_or_bdsa)
{
	let ds_KPI_str = readTxtFile(filePath);
	var ds_KPI_arr, ds_KPI_len;
	[ds_KPI_arr,ds_KPI_len] = splitAndSpliceArr(ds_KPI_str,"\n",0,12);
	var ds_data = {
	  x: [],
	  y: [],
	  //type: 'scatter',
	};
	[ds_data["x"],ds_data["y"]] = appendToDict(ds_KPI_arr,ds_KPI_len,fds_or_bdsa);
	
	let i = 0;
	let GMT_time_30_mins_ago = getTime(4,30);
	/*
	FOR TESTING PURPOSES ONLY TO TEST IF THRESHOLDS WORK
	ds_data["y"].push("8000");
	ds_data["x"].push("23:40:00");
	ds_data["y"].push("1345");
	ds_data["x"].push("23:59:59");
	ds_data["y"].push("600");
	ds_data["x"].push("00:21:00");
	ds_KPI_len+=3;
	GMT_time_30_mins_ago = "23:00:00"
	//alert(GMT_time_30_mins_ago<=ds_data["x"][ds_KPI_len-3] && GMT_time_30_mins_ago <= "23:30:00" && GMT_time_30_mins_ago > "01:30:00");
	*/
	var cond1, cond2, cond3;
	while(i<ds_KPI_len)
	{
		cond1 = GMT_time_30_mins_ago<=ds_data["x"][i] && GMT_time_30_mins_ago < "23:30:00" && GMT_time_30_mins_ago > "01:30:00";
		cond2 = GMT_time_30_mins_ago >= "23:30:00" && (ds_data["x"][i]<= "00:29:00" || ds_data["x"][i] >= GMT_time_30_mins_ago);
		cond3 = GMT_time_30_mins_ago >= "00:00:00" && GMT_time_30_mins_ago <= "01:30:00" && ds_data["x"][i] <= "22:00:00" && ds_data["x"][i] >= GMT_time_30_mins_ago;
		if(String(ds_data["y"][i])>= tps_threshold && ((cond1) || (cond2) || (cond3)))
			return true;
		
		i++;
	}
	return false;
}






function getTime(hoursOffset,minutesOffset){
    var date = new Date();
	date.setMinutes(date.getMinutes() - minutesOffset);
	date.setHours(date.getHours() + hoursOffset);
    var hh = date.getHours();
    var mm = date.getMinutes();
	var ss = date.getSeconds();
	
    hh = hh < 10 ? '0'+hh : hh; 
    mm = mm < 10 ? '0'+mm : mm;
	ss = ss < 10 ? '0'+ss : ss;
    curr_time = hh+':'+mm + ':' +ss;
    return curr_time;
}

