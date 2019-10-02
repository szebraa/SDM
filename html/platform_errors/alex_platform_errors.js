//The purpose of this file is to generate a table "on the fly"
//A table will only generate if there are any alarms to show
var globalVariable = {
	x: 1
};
//date functionality of this needs to be changed... Currently the dates being checked are the dates it actually gets logged.... We want the date it actually gets raised/cleared
function genOneNDSAlarmHistoryTable()
{
	var form = document.getElementById('OneNDSAlarmHistoryRange'); //correct element selected
	var history_table = document.getElementById("OneNDSHistoryTable");
	history_table.deleteRow(1);
	var history_table_rows = document.getElementById("OneNDSHistoryTable").getElementsByTagName("tr").length;
	var adm_to_use = ''; //either: 1) DBMTOR002 , 2) DBMTOR001 , 3) DBMMTL001
	var dir_mounted = '';
	var date_interval_case = 'default'; //should be at least 5 cases 1) default case (nothing entered), 2) Invalid entries , 3)Date only, 4) time only , 5) date and time
	var start_date = '';
	var start_date_input = '';
	var end_date = '';
	var end_date_input = '';
	var start_time = '';
	var start_time_copy = '';
	var start_time_input = '';
	var end_time = '';
	var end_time_copy = '';
	var end_time_input = '';
	var date_and_time_scenario = '';
	var file_7_days_ago = '';
	var file_6_days_ago = '';
	var file_5_days_ago = '';
	var file_4_days_ago = '';
	var file_3_days_ago = '';
	var file_2_days_ago = '';
	var file_1_day_ago = '';
	var file_today = '';
	
	var split_by_newline_7_days_ago = '';
	var split_by_newline_6_days_ago = '';
	var split_by_newline_5_days_ago = '';
	var split_by_newline_4_days_ago = '';
	var split_by_newline_3_days_ago = '';
	var split_by_newline_2_days_ago = '';
	var split_by_newline_1_day_ago = '';
	var split_by_newline_today = '';
	
	var size_of_arr_7_days_ago = 0;
	var size_of_arr_6_days_ago = 0;
	var size_of_arr_5_days_ago = 0;
	var size_of_arr_4_days_ago = 0;
	var size_of_arr_3_days_ago = 0;
	var size_of_arr_2_days_ago = 0;
	var size_of_arr_1_day_ago = 0;
	var size_of_arr_today = 0;
	
	var requested_history = '';
	var requested_history_split = [];
	

	
	
	//account for cases where history tab is refreshed
	if (window.performance) 
	{
	  if (performance.navigation.type == 1) 
	  {
		$("#OneNDSAlarmHistoryRange #start_date").val("yyyy-mm-dd");
		$("#OneNDSAlarmHistoryRange #start_date").css("color","#BBB");
		$("#OneNDSAlarmHistoryRange #start_time").val("HH:MM:SS");
		$("#OneNDSAlarmHistoryRange #start_time").css("color","#BBB"); 
		$("#OneNDSAlarmHistoryRange #end_time").val("HH:MM:SS");
		$("#OneNDSAlarmHistoryRange #end_time").css("color","#BBB"); 		
		$("#OneNDSAlarmHistoryRange #end_date").val("yyyy-mm-dd");
		$("#OneNDSAlarmHistoryRange #end_date").css("color","#BBB");   
		
	  } else 
	  {
		console.log("Just loaded page");
	  }
	}
	
	
	//If this is within the setInterval, it will detect 1 submit as multiple submits for some reason...
	//Logic for handling history will go here!
	form.addEventListener("submit", function() 
	{
		//For OneNDS Alarm History filtering (no modifications to readFileAndSort needed... uses the generic sort from live alarms)
		let hist_alarm_txt_to_filter_arr = readFileAndSort(HIST_ALARMS_TXT_FILTER_PATH,GENERIC_SORT_A_TO_Z);
		let sizeOfHistArrTxtToFilter = (hist_alarm_txt_to_filter_arr[0] == "")? 0:hist_alarm_txt_to_filter_arr.length;
		let hist_nodes_txt_to_filter_arr = readFileAndSort(HIST_NODE_TXT_FILTER_PATH,GENERIC_SORT_A_TO_Z);
		let sizeOfHistArrNodeToFilter = (hist_nodes_txt_to_filter_arr[0] == "")? 0:hist_nodes_txt_to_filter_arr.length;
		
		//need to clear all the arrays so that the number of alarms doesn't increase every click
		if(requested_history_split.length > 0)
			requested_history_split.splice(0,requested_history_split.length);
		if(size_of_arr_7_days_ago > 0)
			split_by_newline_7_days_ago.splice(0,size_of_arr_7_days_ago);
		if(size_of_arr_6_days_ago > 0)
			split_by_newline_6_days_ago.splice(0,size_of_arr_6_days_ago);		
		if(size_of_arr_5_days_ago > 0)
			split_by_newline_5_days_ago.splice(0,size_of_arr_5_days_ago);
		if(size_of_arr_4_days_ago > 0)
			split_by_newline_4_days_ago.splice(0,size_of_arr_4_days_ago);		
		if(size_of_arr_3_days_ago > 0)
			split_by_newline_3_days_ago.splice(0,size_of_arr_3_days_ago);		
		if(size_of_arr_2_days_ago > 0)
			split_by_newline_2_days_ago.splice(0,size_of_arr_2_days_ago);		
		if(size_of_arr_1_day_ago > 0)
			split_by_newline_1_day_ago.splice(0,size_of_arr_1_day_ago);	
		if(size_of_arr_today > 0)
			split_by_newline_today.splice(0,size_of_arr_today);
		if(requested_history.length > 0)
			requested_history = '';
		//alert("Form Submitted!");
		//alert(document.getElementById("OneNDSHistoryTable").getElementsByTagName("tr").length);
		//alert($("#OneNDSAlarmHistoryRange #start_date").val());
		
		//logic to clear table rows whenever new click is submitted (to get rid of other history searched)
		while(history_table_rows>1)
		{
			history_table.deleteRow(history_table_rows-1);
			history_table_rows--;
			//alert(history_table_rows);
		}
			
		//alert(history_table_rows);
		
		
		//find out which adm is mounted properly onto SHiaI
		dir_mounted = readTxtFile(ACTIVE_MOUNT_POINT_DIR);
		adm_to_use = dir_mounted.indexOf(PRIMARY_MOUNT_POINT)>=0? 'dbmtor002':dir_mounted.indexOf(BACKUP1_MOUNT_POINT)>=0?
					'dbmtor001':dir_mounted.indexOf(BACKUP2_MOUNT_POINT)>=0? 'dbmmtl001' : adm_to_use === ''? 
					'dbmmtl001' : adm_to_use; 
					
		//find out which files to use
		file_7_days_ago = adm_to_use==='dbmtor002'? PRIMARY_RSYNC_ALARM_HISTORY_FILE_7_DAYS_AGO:adm_to_use==='dbmtor001'?
						  BACKUP1_RSYNC_ALARM_HISTORY_FILE_7_DAYS_AGO: BACKUP2_RSYNC_ALARM_HISTORY_FILE_7_DAYS_AGO;
		file_6_days_ago = adm_to_use==='dbmtor002'? PRIMARY_RSYNC_ALARM_HISTORY_FILE_6_DAYS_AGO:adm_to_use==='dbmtor001'?
						  BACKUP1_RSYNC_ALARM_HISTORY_FILE_6_DAYS_AGO: BACKUP2_RSYNC_ALARM_HISTORY_FILE_6_DAYS_AGO;
		file_5_days_ago = adm_to_use==='dbmtor002'? PRIMARY_RSYNC_ALARM_HISTORY_FILE_5_DAYS_AGO:adm_to_use==='dbmtor001'?
						  BACKUP1_RSYNC_ALARM_HISTORY_FILE_5_DAYS_AGO: BACKUP2_RSYNC_ALARM_HISTORY_FILE_5_DAYS_AGO;
		file_4_days_ago = adm_to_use==='dbmtor002'? PRIMARY_RSYNC_ALARM_HISTORY_FILE_4_DAYS_AGO:adm_to_use==='dbmtor001'?
						  BACKUP1_RSYNC_ALARM_HISTORY_FILE_4_DAYS_AGO: BACKUP2_RSYNC_ALARM_HISTORY_FILE_4_DAYS_AGO;
		file_3_days_ago = adm_to_use==='dbmtor002'? PRIMARY_RSYNC_ALARM_HISTORY_FILE_3_DAYS_AGO:adm_to_use==='dbmtor001'?
						  BACKUP1_RSYNC_ALARM_HISTORY_FILE_3_DAYS_AGO: BACKUP2_RSYNC_ALARM_HISTORY_FILE_3_DAYS_AGO;
		file_2_days_ago = adm_to_use==='dbmtor002'? PRIMARY_RSYNC_ALARM_HISTORY_FILE_2_DAYS_AGO:adm_to_use==='dbmtor001'?
						  BACKUP1_RSYNC_ALARM_HISTORY_FILE_2_DAYS_AGO: BACKUP2_RSYNC_ALARM_HISTORY_FILE_2_DAYS_AGO;
		file_1_day_ago = adm_to_use==='dbmtor002'? PRIMARY_RSYNC_ALARM_HISTORY_FILE_1_DAY_AGO:adm_to_use==='dbmtor001'?
						  BACKUP1_RSYNC_ALARM_HISTORY_FILE_1_DAY_AGO: BACKUP2_RSYNC_ALARM_HISTORY_FILE_1_DAY_AGO;
		file_today = adm_to_use==='dbmtor002'? PRIMARY_RSYNC_ALARM_HISTORY_FILE_TODAY:adm_to_use==='dbmtor001'?
						  BACKUP1_RSYNC_ALARM_HISTORY_FILE_TODAY: BACKUP2_RSYNC_ALARM_HISTORY_FILE_TODAY;
		
		//find out what user input 1) default case (no entries), 2) Only date (either start or end or both specified) 
		//3) Only time (either start or end or both specified), 4) Both Date and time specified 
		date_interval_case = ($("#OneNDSAlarmHistoryRange #start_date").val() === "yyyy-mm-dd" && $("#OneNDSAlarmHistoryRange #start_time").val() === "HH:MM:SS"
		   && $("#OneNDSAlarmHistoryRange #end_date").val() === "yyyy-mm-dd" && $("#OneNDSAlarmHistoryRange #end_time").val() === "HH:MM:SS")? DEFAULT:
		   ($("#OneNDSAlarmHistoryRange #start_date").val() != "yyyy-mm-dd" || $("#OneNDSAlarmHistoryRange #end_date").val() != "yyyy-mm-dd")
		   && ($("#OneNDSAlarmHistoryRange #start_time").val() === "HH:MM:SS" && $("#OneNDSAlarmHistoryRange #end_time").val() === "HH:MM:SS")? DATE_ONLY:
		   ($("#OneNDSAlarmHistoryRange #start_date").val() === "yyyy-mm-dd" && $("#OneNDSAlarmHistoryRange #end_date").val() === "yyyy-mm-dd")
		   && ($("#OneNDSAlarmHistoryRange #start_time").val() != "HH:MM:SS" || $("#OneNDSAlarmHistoryRange #end_time").val() != "HH:MM:SS")? TIME_ONLY:
		   DATE_AND_TIME;
		
		let font_color_used = '';
		let raised_or_cleared = '';
		//should check here whether entries inputted are valid based on data_interval_case result, we know what to check   
		if(date_interval_case === DEFAULT)
		{
			start_time = '00:00:00';
			end_time = '23:59:59';
			
			
			split_by_newline_7_days_ago = readTxtFile(file_7_days_ago).split("\n");
			split_by_newline_7_days_ago = split_by_newline_7_days_ago.slice(1,split_by_newline_7_days_ago.length-1);
			size_of_arr_7_days_ago = split_by_newline_7_days_ago.length;
			
			split_by_newline_6_days_ago = readTxtFile(file_6_days_ago).split("\n");
			split_by_newline_6_days_ago = split_by_newline_6_days_ago.slice(1,split_by_newline_6_days_ago.length-1);
			size_of_arr_6_days_ago = split_by_newline_6_days_ago.length;
			
			split_by_newline_5_days_ago = readTxtFile(file_5_days_ago).split("\n");
			split_by_newline_5_days_ago = split_by_newline_5_days_ago.slice(1,split_by_newline_5_days_ago.length-1);
			size_of_arr_5_days_ago = split_by_newline_5_days_ago.length;
			
			split_by_newline_4_days_ago = readTxtFile(file_4_days_ago).split("\n");
			split_by_newline_4_days_ago = split_by_newline_4_days_ago.slice(1,split_by_newline_4_days_ago.length-1);
			size_of_arr_4_days_ago = split_by_newline_4_days_ago.length;
			
			split_by_newline_3_days_ago = readTxtFile(file_3_days_ago).split("\n");
			split_by_newline_3_days_ago = split_by_newline_3_days_ago.slice(1,split_by_newline_3_days_ago.length-1);
			size_of_arr_3_days_ago = split_by_newline_3_days_ago.length;
			
			split_by_newline_2_days_ago = readTxtFile(file_2_days_ago).split("\n");
			split_by_newline_2_days_ago = split_by_newline_2_days_ago.slice(1,split_by_newline_2_days_ago.length-1);
			size_of_arr_2_days_ago = split_by_newline_2_days_ago.length;
			
			split_by_newline_1_day_ago = readTxtFile(file_1_day_ago).split("\n");
			split_by_newline_1_day_ago = split_by_newline_1_day_ago.slice(1,split_by_newline_1_day_ago.length-1);
			size_of_arr_1_day_ago = split_by_newline_1_day_ago.length;
			
			split_by_newline_today = readTxtFile(file_today).split("\n");
			split_by_newline_today = split_by_newline_today.slice(1,split_by_newline_today.length-1);
			size_of_arr_today = split_by_newline_today.length;
			
			let i = 0;
			
			
			while(i<size_of_arr_today)
			{
				let severity = split_by_newline_today[i].split(",")[3];
				//valid alarms to track (i.e.: critical or major)
				if(severity != "MINOR" && severity != "WARNING")
				{
					let x = split_by_newline_today[i].split(",")[2];
					
					//need to perform translation to proper name
					x = historyTranslationTable(x);
					//alert(x);
					font_color_used = (severity == "MAJOR")? "<span style=" + "\"color: yellow\"" + ">":(severity == "CLEAR")? "<span style=" + "\"color: green\"" + ">"
									  :"<span style=" + "\"color: red\"" + ">";
					raised_or_cleared = (severity == "MAJOR" || severity == "CRITICAL")? "<b>Alarm raised at:</b> ":"<b>Alarm cleared at:</b> ";
					
					if(severity == "MAJOR" || severity == "CLEAR" || severity == "CRITICAL")
						requested_history+= raised_or_cleared + split_by_newline_today[i].split(",")[1] + " <b>Generic Condition:</b> " + split_by_newline_today[i].split(",")[6] + 
						" <b>Severity:</b> " + font_color_used + "<b>" + severity + "</b>" +"</span>" + " <b>Affected Hosts:</b> " + 
						x + " <b>Alarm text:</b> " + split_by_newline_today[i].split("\"")[1] + " <b>Alarm description:</b> " + 
						split_by_newline_today[i].split("\"")[3] + " <b>Instance Count:</b> " + split_by_newline_today[i].split("\"").slice(-1)[0].split(",").slice(-1)[0] + 
						" <b>Unique Alarm ID:</b> " + split_by_newline_today[i].split("\"").slice(-1)[0].split(",").slice(-3,-1)[0] + "\n";
												
				}
				
				i++;
			}
			
			i = 0;
			
			
			while(i<size_of_arr_1_day_ago)
			{
				let severity = split_by_newline_1_day_ago[i].split(",")[3];
				//valid alarms to track (i.e.: critical or major)
				if(severity != "MINOR" && severity != "WARNING")
				{
					let x = split_by_newline_1_day_ago[i].split(",")[2];
					//need to perform translation to proper name
					x = historyTranslationTable(x);
					
					font_color_used = (severity == "MAJOR")? "<span style=" + "\"color: yellow\"" + ">":(severity == "CLEAR")? "<span style=" + "\"color: green\"" + ">"
									  :"<span style=" + "\"color: red\"" + ">";
                    raised_or_cleared = (severity == "MAJOR" || severity == "CRITICAL")? "<b>Alarm raised at:</b> ":"<b>Alarm cleared at:</b> ";
					
					if(severity == "MAJOR" || severity == "CLEAR" || severity == "CRITICAL")
						requested_history+= raised_or_cleared + split_by_newline_1_day_ago[i].split(",")[1] + " <b>Generic Condition:</b> " + split_by_newline_1_day_ago[i].split(",")[6] + 
						" <b>Severity:</b> " + font_color_used + "<b>" + severity + "</b>" +"</span>" + " <b>Affected Hosts:</b> " + 
						x + " <b>Alarm text:</b> " + split_by_newline_1_day_ago[i].split("\"")[1] + " <b>Alarm description:</b> " + 
						split_by_newline_1_day_ago[i].split("\"")[3] + " <b>Instance Count:</b> " + split_by_newline_1_day_ago[i].split("\"").slice(-1)[0].split(",").slice(-1)[0] + 
						" <b>Unique Alarm ID:</b> " + split_by_newline_1_day_ago[i].split("\"").slice(-1)[0].split(",").slice(-3,-1)[0] + "\n";
					
				}
				
				i++;
			}
			
			i = 0;
			
			while(i<size_of_arr_2_days_ago)
			{
				let severity = split_by_newline_2_days_ago[i].split(",")[3];
				//valid alarms to track (i.e.: critical or major)
				if(severity != "MINOR" && severity != "WARNING")
				{
					let x = split_by_newline_2_days_ago[i].split(",")[2];
					//need to perform translation to proper name
					x = historyTranslationTable(x);
					
					font_color_used = (severity == "MAJOR")? "<span style=" + "\"color: yellow\"" + ">":(severity == "CLEAR")? "<span style=" + "\"color: green\"" + ">"
									  :"<span style=" + "\"color: red\"" + ">";
					raised_or_cleared = (severity == "MAJOR" || severity == "CRITICAL")? "<b>Alarm raised at:</b> ":"<b>Alarm cleared at:</b> ";

					if(severity == "MAJOR" || severity == "CLEAR" || severity == "CRITICAL")
						requested_history+= raised_or_cleared + split_by_newline_2_days_ago[i].split(",")[1] + " <b>Generic Condition:</b> " + split_by_newline_2_days_ago[i].split(",")[6] + 
						" <b>Severity:</b> " + font_color_used + "<b>" + severity + "</b>" +"</span>" + " <b>Affected Hosts:</b> " + 
						x + " <b>Alarm text:</b> " + split_by_newline_2_days_ago[i].split("\"")[1] + " <b>Alarm description:</b> " + 
						split_by_newline_2_days_ago[i].split("\"")[3] + " <b>Instance Count:</b> " + split_by_newline_2_days_ago[i].split("\"").slice(-1)[0].split(",").slice(-1)[0] + 
						" <b>Unique Alarm ID:</b> " + split_by_newline_2_days_ago[i].split("\"").slice(-1)[0].split(",").slice(-3,-1)[0] + "\n";
							
				}
				
				i++;
			}
			
			i = 0;
			
			while(i<size_of_arr_3_days_ago)
			{
				let severity = split_by_newline_3_days_ago[i].split(",")[3];
				//valid alarms to track (i.e.: critical or major)
				if(severity != "MINOR" && severity != "WARNING")
				{
					let x = split_by_newline_3_days_ago[i].split(",")[2];
					//need to perform translation to proper name
					x = historyTranslationTable(x);
					
					font_color_used = (severity == "MAJOR")? "<span style=" + "\"color: yellow\"" + ">":(severity == "CLEAR")? "<span style=" + "\"color: green\"" + ">"
									  :"<span style=" + "\"color: red\"" + ">";
					raised_or_cleared = (severity == "MAJOR" || severity == "CRITICAL")? "<b>Alarm raised at:</b> ":"<b>Alarm cleared at:</b> ";

					if(severity == "MAJOR" || severity == "CLEAR" || severity == "CRITICAL")
						requested_history+= raised_or_cleared + split_by_newline_3_days_ago[i].split(",")[1] + " <b>Generic Condition:</b> " + split_by_newline_3_days_ago[i].split(",")[6] + 
						" <b>Severity:</b> " + font_color_used + "<b>" + severity + "</b>" +"</span>" + " <b>Affected Hosts:</b> " + 
						x + " <b>Alarm text:</b> " + split_by_newline_3_days_ago[i].split("\"")[1] + " <b>Alarm description:</b> " + 
						split_by_newline_3_days_ago[i].split("\"")[3] + " <b>Instance Count:</b> " + split_by_newline_3_days_ago[i].split("\"").slice(-1)[0].split(",").slice(-1)[0] + 
						" <b>Unique Alarm ID:</b> " + split_by_newline_3_days_ago[i].split("\"").slice(-1)[0].split(",").slice(-3,-1)[0] + "\n";
					
				}
				
				i++;
			}
			
			i = 0;
			
			while(i<size_of_arr_4_days_ago)
			{
				let severity = split_by_newline_4_days_ago[i].split(",")[3];
				//valid alarms to track (i.e.: critical or major)
				if(severity != "MINOR" && severity != "WARNING")
				{
					let x = split_by_newline_4_days_ago[i].split(",")[2];
					//need to perform translation to proper name
					x = historyTranslationTable(x);
					
					font_color_used = (severity == "MAJOR")? "<span style=" + "\"color: yellow\"" + ">":(severity == "CLEAR")? "<span style=" + "\"color: green\"" + ">"
									  :"<span style=" + "\"color: red\"" + ">";
					raised_or_cleared = (severity == "MAJOR" || severity == "CRITICAL")? "<b>Alarm raised at:</b> ":"<b>Alarm cleared at:</b> ";

					if(severity == "MAJOR" || severity == "CLEAR" || severity == "CRITICAL")
						requested_history+= raised_or_cleared + split_by_newline_4_days_ago[i].split(",")[1] + " <b>Generic Condition:</b> " + split_by_newline_4_days_ago[i].split(",")[6] + 
						" <b>Severity:</b> " + font_color_used + "<b>" + severity + "</b>" +"</span>" + " <b>Affected Hosts:</b> " + 
						x + " <b>Alarm text:</b> " + split_by_newline_4_days_ago[i].split("\"")[1] + " <b>Alarm description:</b> " + 
						split_by_newline_4_days_ago[i].split("\"")[3] + " <b>Instance Count:</b> " + split_by_newline_4_days_ago[i].split("\"").slice(-1)[0].split(",").slice(-1)[0] + 
						" <b>Unique Alarm ID:</b> " + split_by_newline_4_days_ago[i].split("\"").slice(-1)[0].split(",").slice(-3,-1)[0] + "\n";
					
				}
				
				i++;
			}
			
			i = 0;
			
			
			while(i<size_of_arr_5_days_ago)
			{
				let severity = split_by_newline_5_days_ago[i].split(",")[3];
				//valid alarms to track (i.e.: critical or major)
				if(severity != "MINOR" && severity != "WARNING")
				{
					let x = split_by_newline_5_days_ago[i].split(",")[2];
					//need to perform translation to proper name
					x = historyTranslationTable(x);
					
					font_color_used = (severity == "MAJOR")? "<span style=" + "\"color: yellow\"" + ">":(severity == "CLEAR")? "<span style=" + "\"color: green\"" + ">"
									  :"<span style=" + "\"color: red\"" + ">";
					raised_or_cleared = (severity == "MAJOR" || severity == "CRITICAL")? "<b>Alarm raised at:</b> ":"<b>Alarm cleared at:</b> ";

					if(severity == "MAJOR" || severity == "CLEAR" || severity == "CRITICAL")
						requested_history+= raised_or_cleared + split_by_newline_5_days_ago[i].split(",")[1] + " <b>Generic Condition:</b> " + split_by_newline_5_days_ago[i].split(",")[6] + 
						" <b>Severity:</b> " + font_color_used + "<b>" + severity + "</b>" +"</span>" + " <b>Affected Hosts:</b> " + 
						x + " <b>Alarm text:</b> " + split_by_newline_5_days_ago[i].split("\"")[1] + " <b>Alarm description:</b> " + 
						split_by_newline_5_days_ago[i].split("\"")[3] + " <b>Instance Count:</b> " + split_by_newline_5_days_ago[i].split("\"").slice(-1)[0].split(",").slice(-1)[0] + 
						" <b>Unique Alarm ID:</b> " + split_by_newline_5_days_ago[i].split("\"").slice(-1)[0].split(",").slice(-3,-1)[0] + "\n";
						
				}
				
				i++;
			}
			
			i = 0;
			
			
			while(i<size_of_arr_6_days_ago)
			{
				let severity = split_by_newline_6_days_ago[i].split(",")[3];
				//valid alarms to track (i.e.: critical or major)
				if(severity != "MINOR" && severity != "WARNING")
				{
					let x = split_by_newline_6_days_ago[i].split(",")[2];
					//need to perform translation to proper name
					x = historyTranslationTable(x);
					
					font_color_used = (severity == "MAJOR")? "<span style=" + "\"color: yellow\"" + ">":(severity == "CLEAR")? "<span style=" + "\"color: green\"" + ">"
									  :"<span style=" + "\"color: red\"" + ">";
                    raised_or_cleared = (severity == "MAJOR" || severity == "CRITICAL")? "<b>Alarm raised at:</b> ":"<b>Alarm cleared at:</b> ";
					
					if(severity == "MAJOR" || severity == "CLEAR" || severity == "CRITICAL")
						requested_history+= raised_or_cleared + split_by_newline_6_days_ago[i].split(",")[1] + " <b>Generic Condition:</b> " + split_by_newline_6_days_ago[i].split(",")[6] + 
						" <b>Severity:</b> " + font_color_used + "<b>" + severity + "</b>" +"</span>" + " <b>Affected Hosts:</b> " + 
						x + " <b>Alarm text:</b> " + split_by_newline_6_days_ago[i].split("\"")[1] + " <b>Alarm description:</b> " + 
						split_by_newline_6_days_ago[i].split("\"")[3] + " <b>Instance Count:</b> " + split_by_newline_6_days_ago[i].split("\"").slice(-1)[0].split(",").slice(-1)[0] + 
						" <b>Unique Alarm ID:</b> " + split_by_newline_6_days_ago[i].split("\"").slice(-1)[0].split(",").slice(-3,-1)[0] + "\n";
							
						
				}
				
				i++;
			}
			
			i = 0;
			
			while(i<size_of_arr_7_days_ago)
			{
				let severity = split_by_newline_7_days_ago[i].split(",")[3];
				//valid alarms to track (i.e.: critical or major)
				if(severity != "MINOR" && severity != "WARNING")
				{
					let x = split_by_newline_7_days_ago[i].split(",")[2];
					//need to perform translation to proper name
					x = historyTranslationTable(x);
					
					font_color_used = (severity == "MAJOR")? "<span style=" + "\"color: yellow\"" + ">":(severity == "CLEAR")? "<span style=" + "\"color: green\"" + ">"
									  :"<span style=" + "\"color: red\"" + ">";
					raised_or_cleared = (severity == "MAJOR" || severity == "CRITICAL")? "<b>Alarm raised at:</b> ":"<b>Alarm cleared at:</b> ";

					if(severity == "MAJOR" || severity == "CLEAR" || severity == "CRITICAL")
						requested_history+= raised_or_cleared + split_by_newline_7_days_ago[i].split(",")[1] + " <b>Generic Condition:</b> " + split_by_newline_7_days_ago[i].split(",")[6] + 
						" <b>Severity:</b> " + font_color_used + "<b>" + severity + "</b>" +"</span>" + " <b>Affected Hosts:</b> " + 
						x + " <b>Alarm text:</b> " + split_by_newline_7_days_ago[i].split("\"")[1] + " <b>Alarm description:</b> " + 
						split_by_newline_7_days_ago[i].split("\"")[3] + " <b>Instance Count:</b> " + split_by_newline_7_days_ago[i].split("\"").slice(-1)[0].split(",").slice(-1)[0] + 
						" <b>Unique Alarm ID:</b> " + split_by_newline_7_days_ago[i].split("\"").slice(-1)[0].split(",").slice(-3,-1)[0] + "\n";
						
				}
				
				i++;
			}
			
			//trim last newline character
			requested_history = requested_history.substr(0,requested_history.length -1);
			
			if(requested_history.length > 0)
			{
				requested_history_split = requested_history.split("\n");
				
				i = 0;
				let instance_count = 0;
				let alarms_filtered_in = [], tmp_arr = [];
				//alarm txt filter logic
				requested_history_split = (sizeOfHistArrTxtToFilter>0)? mergeSort(requested_history_split,ALARM_TEXT_A_TO_Z, ONE_NDS_HISTORY_ALARMS):requested_history_split;
				tmp_arr = getFilterInMatches(hist_alarm_txt_to_filter_arr,requested_history_split,ALARM_TEXT_A_TO_Z);
				alarms_filtered_in = (tmp_arr.length > 0)? alarms_filtered_in.concat(tmp_arr):alarms_filtered_in;
				//node txt filter logic
				requested_history_split = (sizeOfHistArrNodeToFilter>0)? mergeSort(requested_history_split,AFFECTED_HOSTS_A_TO_Z, ONE_NDS_HISTORY_ALARMS):requested_history_split;
				tmp_arr = getFilterInMatches(hist_nodes_txt_to_filter_arr,requested_history_split,AFFECTED_HOSTS_A_TO_Z);
				alarms_filtered_in = (tmp_arr.length > 0)? alarms_filtered_in.concat(tmp_arr):alarms_filtered_in;
				requested_history_split = (sizeOfHistArrTxtToFilter>0 || sizeOfHistArrNodeToFilter>0)? alarms_filtered_in:requested_history_split;
				//mergesort by uniqueID (need to ensure list has at least 1 element to prevent recursive error)
				requested_history_split = (requested_history_split.length > 0)? mergeSort(requested_history_split,DEFAULT, ONE_NDS_HISTORY_ALARMS):requested_history_split ;
				var size_of_requested_history = requested_history_split.length;
				//alert(requested_history_split[0] == "");
				while(i<size_of_requested_history)
				{
					//alert(requested_history_split[i].split("<b>").slice(-1)[0].split("</b>").slice(-1)[0]);
					var Unique_Alarm_ID = "";
					Unique_Alarm_ID = new RegExp(requested_history_split[i].split("<b>").slice(-1)[0].split("</b>").slice(-1)[0], 'g');
					instance_count = (requested_history.match(Unique_Alarm_ID) || []).length;
					//need to skip any CLEAR alarms which does not have any major or critical alarm match in the string
					if(requested_history_split[i].split("<b>").slice(4)[0].split("</b>").slice(0)[0] == "CLEAR" && instance_count < 2)
					{
						//alert("The alarm that has matches: " + requested_history_split[i]);
						i++;
						continue;
					}
					history_table.insertRow(history_table_rows).insertCell(0).innerHTML = requested_history_split[i];
					history_table_rows++;
					i++;
				}
				if(size_of_requested_history == 0)
					alert("No alarms found for the alarm filter settings specified");
				else
				{
					//remove duplicate values from table (e.g.: 2 or more of the exact same alarms (ID wise) that have been cleared and raised)
					removeDuplicateRows($("#OneNDSHistoryTable"));
					history_table_rows = document.getElementById("OneNDSHistoryTable").getElementsByTagName("tr").length;
				}
			}
			//alert(history_table_rows);
		}
		
		//these (3) cases I need to check for valid inputs, else error case
		
		//date only assumes 24h
		if(date_interval_case === DATE_ONLY)
		{
			let start_date_input_split = [];
			let end_date_input_split = [];
			start_date_input = '';
			start_date_input = $("#OneNDSAlarmHistoryRange #start_date").val();
			start_date_input_split = start_date_input.split("-");
			start_date_input_split[1] = (start_date_input_split[1] <10 && start_date_input_split[1].indexOf('0') == -1)? "0"+ start_date_input_split[1]:start_date_input_split[1];
			start_date_input_split[2] = (start_date_input_split[2] <10 && start_date_input_split[2].indexOf('0') == -1)? "0"+ start_date_input_split[2]:start_date_input_split[2];
			start_date_input = start_date_input_split.join("-");
			end_date_input = '';
			end_date_input = $("#OneNDSAlarmHistoryRange #end_date").val();
			end_date_input_split = end_date_input.split("-");
			end_date_input_split[1] = (end_date_input_split[1] <10 && end_date_input_split[1].indexOf('0') == -1)? "0"+ end_date_input_split[1]:end_date_input_split[1];
			end_date_input_split[2] = (end_date_input_split[2] <10 && end_date_input_split[2].indexOf('0') == -1)? "0"+ end_date_input_split[2]:end_date_input_split[2];
			end_date_input = end_date_input_split.join("-");
			
			//format yyyymmdd
			start_date = (start_date_input == getCorrectDate(7))? getCorrectDate(7):(start_date_input == getCorrectDate(6))? getCorrectDate(6):
						 (start_date_input == getCorrectDate(5))? getCorrectDate(5):(start_date_input == getCorrectDate(4))? getCorrectDate(4):
						 (start_date_input == getCorrectDate(3))? getCorrectDate(3):(start_date_input == getCorrectDate(2))? getCorrectDate(2):
						 (start_date_input == getCorrectDate(1))? getCorrectDate(1):(start_date_input == getCorrectDate(0))? getCorrectDate(0): 
						 (start_date_input == 'yyyy-mm-dd')? getCorrectDate(7):(start_date_input == getCorrectDate(8))? getCorrectDate(8):'error';
				
			end_date = (end_date_input == getCorrectDate(7))? getCorrectDate(7):(end_date_input == getCorrectDate(6))? getCorrectDate(6):
					   (end_date_input == getCorrectDate(5))? getCorrectDate(5):(end_date_input == getCorrectDate(4))? getCorrectDate(4):
					   (end_date_input == getCorrectDate(3))? getCorrectDate(3):(end_date_input == getCorrectDate(2))? getCorrectDate(2):
					   (end_date_input == getCorrectDate(1))? getCorrectDate(1):(end_date_input == getCorrectDate(0))? getCorrectDate(0): 
					   (end_date_input == 'yyyy-mm-dd')? getCorrectDate(0):(end_date_input == getCorrectDate(8))? getCorrectDate(8):'error'; 
			
			start_time = '00:00:00';
			end_time = '23:59:59';

			//very first thing that should be checked is if the date is valid (within range or default date)
			if(start_date == 'error' || end_date == 'error')
				alert("The starting date or the ending date is invalid (not within 8 days). Please try again.");

			else
			{
				//perform swap of end_date and start_date incase user swaps start and end dates
				if(start_date > end_date)
				{
					let tmp = start_date;
					start_date = end_date;
					end_date = tmp;
				}
				let i = 0;
				//processing goes here
				
				split_by_newline_today = readTxtFile(file_today).split("\n");
				split_by_newline_today = split_by_newline_today.slice(1,split_by_newline_today.length-1);
				size_of_arr_today = split_by_newline_today.length;
				
				while(i<size_of_arr_today)
				{
					let severity = split_by_newline_today[i].split(",")[3];
					//valid alarms to track (i.e.: critical or major)
					if(severity != "MINOR" && severity != "WARNING")
					{
						let x = split_by_newline_today[i].split(",")[2];
						let alarm_date = split_by_newline_today[i].split(",")[1].split(" ")[0];
						
						font_color_used = (severity == "MAJOR")? "<span style=" + "\"color: yellow\"" + ">":(severity == "CLEAR")? "<span style=" + "\"color: green\"" + ">"
										  :"<span style=" + "\"color: red\"" + ">";
						raised_or_cleared = (severity == "MAJOR" || severity == "CRITICAL")? "<b>Alarm raised at:</b> ":"<b>Alarm cleared at:</b> ";
						
						//need to perform translation to proper name
						x = historyTranslationTable(x);
						//alert(x);
						if((severity == "MAJOR" || severity == "CLEAR" || severity == "CRITICAL") && end_date >= alarm_date && start_date <= alarm_date)
							requested_history+= raised_or_cleared + split_by_newline_today[i].split(",")[1] + " <b>Generic Condition:</b> " + split_by_newline_today[i].split(",")[6] + 
							" <b>Severity:</b> " + font_color_used + "<b>" + severity + "</b>" +"</span>" + " <b>Affected Hosts:</b> " + 
							x + " <b>Alarm text:</b> " + split_by_newline_today[i].split(",")[7] + " <b>Alarm description:</b> " + 
							split_by_newline_today[i].split("\"")[3] + " <b>Instance Count:</b> " + split_by_newline_today[i].split("\"").slice(-1)[0].split(",").slice(-1)[0] + 
							" <b>Unique Alarm ID:</b> " + split_by_newline_today[i].split("\"").slice(-1)[0].split(",").slice(-3,-1)[0] + "\n";	
							
					}
					
					i++;
				}
				
				i = 0;
				
				split_by_newline_1_day_ago = readTxtFile(file_1_day_ago).split("\n");
				split_by_newline_1_day_ago = split_by_newline_1_day_ago.slice(1,split_by_newline_1_day_ago.length-1);
				size_of_arr_1_day_ago = split_by_newline_1_day_ago.length;
				
				while(i<size_of_arr_1_day_ago)
				{
					let severity = split_by_newline_1_day_ago[i].split(",")[3];
					//valid alarms to track (i.e.: critical or major)
					if(severity != "MINOR" && severity != "WARNING")
					{
						let x = split_by_newline_1_day_ago[i].split(",")[2];
						let alarm_date = split_by_newline_1_day_ago[i].split(",")[1].split(" ")[0];
						
						font_color_used = (severity == "MAJOR")? "<span style=" + "\"color: yellow\"" + ">":(severity == "CLEAR")? "<span style=" + "\"color: green\"" + ">"
										  :"<span style=" + "\"color: red\"" + ">";
						raised_or_cleared = (severity == "MAJOR" || severity == "CRITICAL")? "<b>Alarm raised at:</b> ":"<b>Alarm cleared at:</b> ";
						
						//need to perform translation to proper name
						x = historyTranslationTable(x);

						if((severity == "MAJOR" || severity == "CLEAR" || severity == "CRITICAL") && end_date >= alarm_date && start_date <= alarm_date)
							requested_history+= raised_or_cleared + split_by_newline_1_day_ago[i].split(",")[1] + " <b>Generic Condition:</b> " + split_by_newline_1_day_ago[i].split(",")[6] + 
							" <b>Severity:</b> " + font_color_used + "<b>" + severity + "</b>" +"</span>" + " <b>Affected Hosts:</b> " + 
							x + " <b>Alarm text:</b> " + split_by_newline_1_day_ago[i].split(",")[7] + " <b>Alarm description:</b> " + 
							split_by_newline_1_day_ago[i].split("\"")[3] + " <b>Instance Count:</b> " + split_by_newline_1_day_ago[i].split("\"").slice(-1)[0].split(",").slice(-1)[0] + 
							" <b>Unique Alarm ID:</b> " + split_by_newline_1_day_ago[i].split("\"").slice(-1)[0].split(",").slice(-3,-1)[0] + "\n";
							
					}
				
					i++;
				}
			
				i = 0;
					
				split_by_newline_2_days_ago = readTxtFile(file_2_days_ago).split("\n");
				split_by_newline_2_days_ago = split_by_newline_2_days_ago.slice(1,split_by_newline_2_days_ago.length-1);
				size_of_arr_2_days_ago = split_by_newline_2_days_ago.length;
				
				while(i<size_of_arr_2_days_ago)
				{
					let severity = split_by_newline_2_days_ago[i].split(",")[3];
					//valid alarms to track (i.e.: critical or major)
					if(severity != "MINOR" && severity != "WARNING")
					{
						let x = split_by_newline_2_days_ago[i].split(",")[2];
						let alarm_date = split_by_newline_2_days_ago[i].split(",")[1].split(" ")[0];
						
						font_color_used = (severity == "MAJOR")? "<span style=" + "\"color: yellow\"" + ">":(severity == "CLEAR")? "<span style=" + "\"color: green\"" + ">"
										  :"<span style=" + "\"color: red\"" + ">";
						raised_or_cleared = (severity == "MAJOR" || severity == "CRITICAL")? "<b>Alarm raised at:</b> ":"<b>Alarm cleared at:</b> ";
						
						//need to perform translation to proper name
						x = historyTranslationTable(x);

						if((severity == "MAJOR" || severity == "CLEAR" || severity == "CRITICAL") && end_date >= alarm_date && start_date <= alarm_date)
							requested_history+= raised_or_cleared + split_by_newline_2_days_ago[i].split(",")[1] + " <b>Generic Condition:</b> " + split_by_newline_2_days_ago[i].split(",")[6] + 
							" <b>Severity:</b> " + font_color_used + "<b>" + severity + "</b>" +"</span>" + " <b>Affected Hosts:</b> " + 
							x + " <b>Alarm text:</b> " + split_by_newline_2_days_ago[i].split(",")[7] + " <b>Alarm description:</b> " + 
							split_by_newline_2_days_ago[i].split("\"")[3] + " <b>Instance Count:</b> " + split_by_newline_2_days_ago[i].split("\"").slice(-1)[0].split(",").slice(-1)[0] + 
							" <b>Unique Alarm ID:</b> " + split_by_newline_2_days_ago[i].split("\"").slice(-1)[0].split(",").slice(-3,-1)[0] + "\n";	
					}
					
					i++;
				}
				
				i = 0;					
						
				split_by_newline_3_days_ago = readTxtFile(file_3_days_ago).split("\n");
				split_by_newline_3_days_ago = split_by_newline_3_days_ago.slice(1,split_by_newline_3_days_ago.length-1);
				size_of_arr_3_days_ago = split_by_newline_3_days_ago.length;
				
				while(i<size_of_arr_3_days_ago)
				{
					let severity = split_by_newline_3_days_ago[i].split(",")[3];
					//valid alarms to track (i.e.: critical or major)
					if(severity != "MINOR" && severity != "WARNING")
					{
						let x = split_by_newline_3_days_ago[i].split(",")[2];
						let alarm_date = split_by_newline_3_days_ago[i].split(",")[1].split(" ")[0];
						
						font_color_used = (severity == "MAJOR")? "<span style=" + "\"color: yellow\"" + ">":(severity == "CLEAR")? "<span style=" + "\"color: green\"" + ">"
										  :"<span style=" + "\"color: red\"" + ">";
						raised_or_cleared = (severity == "MAJOR" || severity == "CRITICAL")? "<b>Alarm raised at:</b> ":"<b>Alarm cleared at:</b> ";
						
						//need to perform translation to proper name
						x = historyTranslationTable(x);

						if((severity == "MAJOR" || severity == "CLEAR" || severity == "CRITICAL") && end_date >= alarm_date && start_date <= alarm_date)
							requested_history+= raised_or_cleared + split_by_newline_3_days_ago[i].split(",")[1] + " <b>Generic Condition:</b> " + split_by_newline_3_days_ago[i].split(",")[6] + 
							" <b>Severity:</b> " + font_color_used + "<b>" + severity + "</b>" +"</span>" + " <b>Affected Hosts:</b> " + 
							x + " <b>Alarm text:</b> " + split_by_newline_3_days_ago[i].split(",")[7] + " <b>Alarm description:</b> " + 
							split_by_newline_3_days_ago[i].split("\"")[3] + " <b>Instance Count:</b> " + split_by_newline_3_days_ago[i].split("\"").slice(-1)[0].split(",").slice(-1)[0] + 
							" <b>Unique Alarm ID:</b> " + split_by_newline_3_days_ago[i].split("\"").slice(-1)[0].split(",").slice(-3,-1)[0] + "\n";
					}
					
					i++;
				}
				
				i = 0;
					
				split_by_newline_4_days_ago = readTxtFile(file_4_days_ago).split("\n");
				split_by_newline_4_days_ago = split_by_newline_4_days_ago.slice(1,split_by_newline_4_days_ago.length-1);
				size_of_arr_4_days_ago = split_by_newline_4_days_ago.length;
				
				while(i<size_of_arr_4_days_ago)
				{
					let severity = split_by_newline_4_days_ago[i].split(",")[3];
					//valid alarms to track (i.e.: critical or major)
					if(severity != "MINOR" && severity != "WARNING")
					{
						let x = split_by_newline_4_days_ago[i].split(",")[2];
						let alarm_date = split_by_newline_4_days_ago[i].split(",")[1].split(" ")[0];
						
						font_color_used = (severity == "MAJOR")? "<span style=" + "\"color: yellow\"" + ">":(severity == "CLEAR")? "<span style=" + "\"color: green\"" + ">"
										  :"<span style=" + "\"color: red\"" + ">";
						raised_or_cleared = (severity == "MAJOR" || severity == "CRITICAL")? "<b>Alarm raised at:</b> ":"<b>Alarm cleared at:</b> ";
						
						//need to perform translation to proper name
						x = historyTranslationTable(x);

						if((severity == "MAJOR" || severity == "CLEAR" || severity == "CRITICAL") && end_date >= alarm_date && start_date <= alarm_date)
							requested_history+= raised_or_cleared + split_by_newline_4_days_ago[i].split(",")[1] + " <b>Generic Condition:</b> " + split_by_newline_4_days_ago[i].split(",")[6] + 
							" <b>Severity:</b> " + font_color_used + "<b>" + severity + "</b>" +"</span>" + " <b>Affected Hosts:</b> " + 
							x + " <b>Alarm text:</b> " + split_by_newline_4_days_ago[i].split(",")[7] + " <b>Alarm description:</b> " + 
							split_by_newline_4_days_ago[i].split("\"")[3] + " <b>Instance Count:</b> " + split_by_newline_4_days_ago[i].split("\"").slice(-1)[0].split(",").slice(-1)[0] + 
							" <b>Unique Alarm ID:</b> " + split_by_newline_4_days_ago[i].split("\"").slice(-1)[0].split(",").slice(-3,-1)[0] + "\n";	
					}
					
					i++;
				}
				
				i = 0;

				split_by_newline_5_days_ago = readTxtFile(file_5_days_ago).split("\n");
				split_by_newline_5_days_ago = split_by_newline_5_days_ago.slice(1,split_by_newline_5_days_ago.length-1);
				size_of_arr_5_days_ago = split_by_newline_5_days_ago.length;
				
				while(i<size_of_arr_5_days_ago)
				{
					let severity = split_by_newline_5_days_ago[i].split(",")[3];
					//valid alarms to track (i.e.: critical or major)
					if(severity != "MINOR" && severity != "WARNING")
					{
						let x = split_by_newline_5_days_ago[i].split(",")[2];
						let alarm_date = split_by_newline_5_days_ago[i].split(",")[1].split(" ")[0];
						
						font_color_used = (severity == "MAJOR")? "<span style=" + "\"color: yellow\"" + ">":(severity == "CLEAR")? "<span style=" + "\"color: green\"" + ">"
										  :"<span style=" + "\"color: red\"" + ">";
						raised_or_cleared = (severity == "MAJOR" || severity == "CRITICAL")? "<b>Alarm raised at:</b> ":"<b>Alarm cleared at:</b> ";
						
						//need to perform translation to proper name
						x = historyTranslationTable(x);

						if((severity == "MAJOR" || severity == "CLEAR" || severity == "CRITICAL") && end_date >= alarm_date && start_date <= alarm_date)
							requested_history+= raised_or_cleared + split_by_newline_5_days_ago[i].split(",")[1] + " <b>Generic Condition:</b> " + split_by_newline_5_days_ago[i].split(",")[6] + 
							" <b>Severity:</b> " + font_color_used + "<b>" + severity + "</b>" +"</span>" + " <b>Affected Hosts:</b> " + 
							x + " <b>Alarm text:</b> " + split_by_newline_5_days_ago[i].split(",")[7] + " <b>Alarm description:</b> " + 
							split_by_newline_5_days_ago[i].split("\"")[3] + " <b>Instance Count:</b> " + split_by_newline_5_days_ago[i].split("\"").slice(-1)[0].split(",").slice(-1)[0] + 
							" <b>Unique Alarm ID:</b> " + split_by_newline_5_days_ago[i].split("\"").slice(-1)[0].split(",").slice(-3,-1)[0] + "\n";
					}
					
					i++;
				}
				
				i = 0;	
								
				split_by_newline_6_days_ago = readTxtFile(file_6_days_ago).split("\n");
				split_by_newline_6_days_ago = split_by_newline_6_days_ago.slice(1,split_by_newline_6_days_ago.length-1);
				size_of_arr_6_days_ago = split_by_newline_6_days_ago.length;
		
				while(i<size_of_arr_6_days_ago)
				{
					let severity = split_by_newline_6_days_ago[i].split(",")[3];
					//valid alarms to track (i.e.: critical or major)
					if(severity != "MINOR" && severity != "WARNING")
					{
						let x = split_by_newline_6_days_ago[i].split(",")[2];
						let alarm_date = split_by_newline_6_days_ago[i].split(",")[1].split(" ")[0];
						
						font_color_used = (severity == "MAJOR")? "<span style=" + "\"color: yellow\"" + ">":(severity == "CLEAR")? "<span style=" + "\"color: green\"" + ">"
										  :"<span style=" + "\"color: red\"" + ">";
						raised_or_cleared = (severity == "MAJOR" || severity == "CRITICAL")? "<b>Alarm raised at:</b> ":"<b>Alarm cleared at:</b> ";
						
						//need to perform translation to proper name
						x = historyTranslationTable(x);

						if((severity == "MAJOR" || severity == "CLEAR" || severity == "CRITICAL") && end_date >= alarm_date && start_date <= alarm_date)
							requested_history+= raised_or_cleared + split_by_newline_6_days_ago[i].split(",")[1] + " <b>Generic Condition:</b> " + split_by_newline_6_days_ago[i].split(",")[6] + 
							" <b>Severity:</b> " + font_color_used + "<b>" + severity + "</b>" +"</span>" + " <b>Affected Hosts:</b> " + 
							x + " <b>Alarm text:</b> " + split_by_newline_6_days_ago[i].split(",")[7] + " <b>Alarm description:</b> " + 
							split_by_newline_6_days_ago[i].split("\"")[3] + " <b>Instance Count:</b> " + split_by_newline_6_days_ago[i].split("\"").slice(-1)[0].split(",").slice(-1)[0] + 
							" <b>Unique Alarm ID:</b> " + split_by_newline_6_days_ago[i].split("\"").slice(-1)[0].split(",").slice(-3,-1)[0] + "\n";
								
					}
					
					i++;
				}
				
				i = 0;
					
				split_by_newline_7_days_ago = readTxtFile(file_7_days_ago).split("\n");
				split_by_newline_7_days_ago = split_by_newline_7_days_ago.slice(1,split_by_newline_7_days_ago.length-1);
				size_of_arr_7_days_ago = split_by_newline_7_days_ago.length;

				while(i<size_of_arr_7_days_ago)
				{
					let severity = split_by_newline_7_days_ago[i].split(",")[3];
					//valid alarms to track (i.e.: critical or major)
					if(severity != "MINOR" && severity != "WARNING")
					{
						let x = split_by_newline_7_days_ago[i].split(",")[2];
						let alarm_date = split_by_newline_7_days_ago[i].split(",")[1].split(" ")[0];
						
						font_color_used = (severity == "MAJOR")? "<span style=" + "\"color: yellow\"" + ">":(severity == "CLEAR")? "<span style=" + "\"color: green\"" + ">"
										  :"<span style=" + "\"color: red\"" + ">";
						raised_or_cleared = (severity == "MAJOR" || severity == "CRITICAL")? "<b>Alarm raised at:</b> ":"<b>Alarm cleared at:</b> ";
						
						//need to perform translation to proper name
						x = historyTranslationTable(x);

						if((severity == "MAJOR" || severity == "CLEAR" || severity == "CRITICAL") && end_date >= alarm_date && start_date <= alarm_date)
							requested_history+= raised_or_cleared + split_by_newline_7_days_ago[i].split(",")[1] + " <b>Generic Condition:</b> " + split_by_newline_7_days_ago[i].split(",")[6] + 
							" <b>Severity:</b> " + font_color_used + "<b>" + severity + "</b>" +"</span>" + " <b>Affected Hosts:</b> " + 
							x + " <b>Alarm text:</b> " + split_by_newline_7_days_ago[i].split(",")[7] + " <b>Alarm description:</b> " + 
							split_by_newline_7_days_ago[i].split("\"")[3] + " <b>Instance Count:</b> " + split_by_newline_7_days_ago[i].split("\"").slice(-1)[0].split(",").slice(-1)[0] + 
							" <b>Unique Alarm ID:</b> " + split_by_newline_7_days_ago[i].split("\"").slice(-1)[0].split(",").slice(-3,-1)[0] + "\n";
						
					}
					
					i++;
				}
				i = 0;
					
				
				//trim last newline character
				requested_history = requested_history.substr(0,requested_history.length -1);
				
				if(requested_history.length > 0)
				{
					requested_history_split = requested_history.split("\n");
					i = 0;
					let instance_count = 0;
					let alarms_filtered_in = [], tmp_arr = [];
					//alarm txt filter logic
					requested_history_split = (sizeOfHistArrTxtToFilter>0)? mergeSort(requested_history_split,ALARM_TEXT_A_TO_Z, ONE_NDS_HISTORY_ALARMS):requested_history_split;
					tmp_arr = getFilterInMatches(hist_alarm_txt_to_filter_arr,requested_history_split,ALARM_TEXT_A_TO_Z);
					alarms_filtered_in = (tmp_arr.length > 0)? alarms_filtered_in.concat(tmp_arr):alarms_filtered_in;
					//node txt filter logic
					requested_history_split = (sizeOfHistArrNodeToFilter>0)? mergeSort(requested_history_split,AFFECTED_HOSTS_A_TO_Z, ONE_NDS_HISTORY_ALARMS):requested_history_split;
					tmp_arr = getFilterInMatches(hist_nodes_txt_to_filter_arr,requested_history_split,AFFECTED_HOSTS_A_TO_Z);
					alarms_filtered_in = (tmp_arr.length > 0)? alarms_filtered_in.concat(tmp_arr):alarms_filtered_in;
					requested_history_split = (sizeOfHistArrTxtToFilter>0 || sizeOfHistArrNodeToFilter>0)? alarms_filtered_in:requested_history_split;
					//mergesort by uniqueID (need to ensure list has at least 1 element to prevent recursive error)
					requested_history_split = (requested_history_split.length > 0)? mergeSort(requested_history_split,DEFAULT, ONE_NDS_HISTORY_ALARMS):requested_history_split;
					var size_of_requested_history = requested_history_split.length;				
					//alert(requested_history_split[0] == "");
					while(i<size_of_requested_history)
					{
						//alert(requested_history_split[i].split("<b>").slice(-1)[0].split("</b>").slice(-1)[0]);
						var Unique_Alarm_ID = "";
						Unique_Alarm_ID = new RegExp(requested_history_split[i].split("<b>").slice(-1)[0].split("</b>").slice(-1)[0], 'g');
						instance_count = (requested_history.match(Unique_Alarm_ID) || []).length;
						//need to skip any CLEAR alarms which does not have any major or critical alarm match in the string
						if(requested_history_split[i].split("<b>").slice(4)[0].split("</b>").slice(0)[0] == "CLEAR" && instance_count < 2)
						{
							//alert("The alarm that has matches: " + requested_history_split[i]);
							i++;
							continue;
						}
						history_table.insertRow(history_table_rows).insertCell(0).innerHTML = requested_history_split[i];
						history_table_rows++;
						i++;
					}
					if(size_of_requested_history == 0)
						alert("No alarms found for the alarm filter settings specified");
					else
					{
						//remove duplicate values from table (e.g.: 2 or more of the exact same alarms (ID wise) that have been cleared and raised)
						removeDuplicateRows($("#OneNDSHistoryTable"));
						history_table_rows = document.getElementById("OneNDSHistoryTable").getElementsByTagName("tr").length;
					}
				}
				

				if(requested_history.length == 0 || history_table_rows == 1)
					alert("No alarms could be found from your specified starting and ending dates");
				
				
			}
			
		}
		
		//time only assumes all 7 days
		if(date_interval_case === TIME_ONLY)
		{
			
			let start_time_input_split = [];
			let end_time_input_split = [];
			start_time_input = $("#OneNDSAlarmHistoryRange #start_time").val();
			end_time_input = $("#OneNDSAlarmHistoryRange #end_time").val();
			
			

			start_time_input = '';
			start_time_input = $("#OneNDSAlarmHistoryRange #start_time").val();
			start_time_input_split = start_time_input.split(":");
			start_time_input_split[0] = (start_time_input_split[0] <10 && start_time_input_split[0].indexOf('0') == -1)? "0"+ start_time_input_split[0]:(start_time_input_split[0] == undefined)? '0':start_time_input_split[0];
			start_time_input_split[1] = (start_time_input_split[1] <10 && start_time_input_split[1].indexOf('0') == -1)? "0"+ start_time_input_split[1]:(start_time_input_split[1] == undefined)? '0':start_time_input_split[1];
			start_time_input_split[2] = (start_time_input_split[2] <10 && start_time_input_split[2].indexOf('0') == -1)? "0"+ start_time_input_split[2]:(start_time_input_split[2] == undefined)? '0':start_time_input_split[2];
			start_time = start_time_input_split.join(":");
			end_time_input = '';
			end_time_input = $("#OneNDSAlarmHistoryRange #end_time").val();
			end_time_input_split = end_time_input.split(":");
			end_time_input_split[0] = (end_time_input_split[0] <10 && end_time_input_split[0].indexOf('0') == -1)? "0"+ end_time_input_split[0]:(end_time_input_split[0] == undefined)? '0':end_time_input_split[0];
			end_time_input_split[1] = (end_time_input_split[1] <10 && end_time_input_split[1].indexOf('0') == -1)? "0"+ end_time_input_split[1]:(end_time_input_split[1] == undefined)? '0':end_time_input_split[1];
			end_time_input_split[2] = (end_time_input_split[2] <10 && end_time_input_split[2].indexOf('0') == -1)? "0"+ end_time_input_split[2]:(end_time_input_split[2] == undefined)? '0':end_time_input_split[2];
			end_time = end_time_input_split.join(":");
			
			//catch cases where user inputs 00 or >=60 or does not enters a string that is not HH:MM:SS
			if((start_time != 'HH:MM:SS') && (start_time_input_split[0].length <=1 || start_time_input_split[1].length <=1 || start_time_input_split[2].length <=1 || /^\d+$/.test(start_time) || start_time_input_split[0]>=60 || start_time_input_split[1]>=60 || start_time_input_split[2]>=60 ) )
				alert("The starting time is invalid. Please try again.");
		    
			
			else
			{
				//catch cases where user inputs 00 or >=60 or does not enters a string that is not HH:MM:SS
				if((end_time != 'HH:MM:SS') && (end_time_input_split[0].length <=1 || end_time_input_split[1].length <=1 || end_time_input_split[2].length <=1 || /^\d+$/.test(end_time) || end_time_input_split[0]>=60 || end_time_input_split[1]>=60 || end_time_input_split[2]>=60))
					alert("The ending time is invalid. Please try again.");
			    
				else
				{
					split_by_newline_7_days_ago = readTxtFile(file_7_days_ago).split("\n");
					split_by_newline_7_days_ago = split_by_newline_7_days_ago.slice(1,split_by_newline_7_days_ago.length-1);
					size_of_arr_7_days_ago = split_by_newline_7_days_ago.length;
					
					split_by_newline_6_days_ago = readTxtFile(file_6_days_ago).split("\n");
					split_by_newline_6_days_ago = split_by_newline_6_days_ago.slice(1,split_by_newline_6_days_ago.length-1);
					size_of_arr_6_days_ago = split_by_newline_6_days_ago.length;
					
					split_by_newline_5_days_ago = readTxtFile(file_5_days_ago).split("\n");
					split_by_newline_5_days_ago = split_by_newline_5_days_ago.slice(1,split_by_newline_5_days_ago.length-1);
					size_of_arr_5_days_ago = split_by_newline_5_days_ago.length;	
					
					split_by_newline_4_days_ago = readTxtFile(file_4_days_ago).split("\n");
					split_by_newline_4_days_ago = split_by_newline_4_days_ago.slice(1,split_by_newline_4_days_ago.length-1);
					size_of_arr_4_days_ago = split_by_newline_4_days_ago.length;
					
					split_by_newline_3_days_ago = readTxtFile(file_3_days_ago).split("\n");
					split_by_newline_3_days_ago = split_by_newline_3_days_ago.slice(1,split_by_newline_3_days_ago.length-1);
					size_of_arr_3_days_ago = split_by_newline_3_days_ago.length;	
					
					split_by_newline_2_days_ago = readTxtFile(file_2_days_ago).split("\n");
					split_by_newline_2_days_ago = split_by_newline_2_days_ago.slice(1,split_by_newline_2_days_ago.length-1);
					size_of_arr_2_days_ago = split_by_newline_2_days_ago.length;
					
					split_by_newline_1_day_ago = readTxtFile(file_1_day_ago).split("\n");
					split_by_newline_1_day_ago = split_by_newline_1_day_ago.slice(1,split_by_newline_1_day_ago.length-1);
					size_of_arr_1_day_ago = split_by_newline_1_day_ago.length;		
					
					split_by_newline_today = readTxtFile(file_today).split("\n");
					split_by_newline_today = split_by_newline_today.slice(1,split_by_newline_today.length-1);
					size_of_arr_today = split_by_newline_today.length;		
					
					let i = 0;
					//assign default times if default input is used
					end_time = (end_time == 'HH:MM:SS')? '23:59:59':end_time;
					start_time = (start_time == 'HH:MM:SS')? '00:00:00':start_time;
					if(end_time<start_time)
					{
						let temp = start_time;
						start_time = end_time;
						end_time = temp;
					}
					while(i<size_of_arr_today)
					{
						let severity = split_by_newline_today[i].split(",")[3];
						//valid alarms to track (i.e.: critical or major)
						if(severity != "MINOR" && severity != "WARNING")
						{
							let x = split_by_newline_today[i].split(",")[2];
							let time_of_alarm = split_by_newline_today[i].split(",").slice(1)[0].split(" ")[1];
							//alert(time_of_alarm);
							//alert(start_time<=time_of_alarm);
							
							font_color_used = (severity == "MAJOR")? "<span style=" + "\"color: yellow\"" + ">":(severity == "CLEAR")? "<span style=" + "\"color: green\"" + ">"
											  :"<span style=" + "\"color: red\"" + ">";
							raised_or_cleared = (severity == "MAJOR" || severity == "CRITICAL")? "<b>Alarm raised at:</b> ":"<b>Alarm cleared at:</b> ";
							
							//need to perform translation to proper name
							x = historyTranslationTable(x);
							//alert(x);
							if((severity == "MAJOR" || severity == "CLEAR" || severity == "CRITICAL") && start_time<=time_of_alarm && end_time>=time_of_alarm)
								requested_history+= raised_or_cleared + split_by_newline_today[i].split(",")[1] + " <b>Generic Condition:</b> " + split_by_newline_today[i].split(",")[6] + 
								" <b>Severity:</b> " + font_color_used + "<b>" + severity + "</b>" +"</span>" + " <b>Affected Hosts:</b> " + 
								x + " <b>Alarm text:</b> " + split_by_newline_today[i].split(",")[7] + " <b>Alarm description:</b> " + 
								split_by_newline_today[i].split("\"")[3] + " <b>Instance Count:</b> " + split_by_newline_today[i].split("\"").slice(-1)[0].split(",").slice(-1)[0] + 
								" <b>Unique Alarm ID:</b> " + split_by_newline_today[i].split("\"").slice(-1)[0].split(",").slice(-3,-1)[0] + "\n";				
						}
						
						i++;
					}
					
					i = 0;
					
					
					while(i<size_of_arr_1_day_ago)
					{
						let severity = split_by_newline_1_day_ago[i].split(",")[3];
						//valid alarms to track (i.e.: critical or major)
						if(severity != "MINOR" && severity != "WARNING")
						{
							let x = split_by_newline_1_day_ago[i].split(",")[2];
							let time_of_alarm = split_by_newline_1_day_ago[i].split(",").slice(1)[0].split(" ")[1];
							
							font_color_used = (severity == "MAJOR")? "<span style=" + "\"color: yellow\"" + ">":(severity == "CLEAR")? "<span style=" + "\"color: green\"" + ">"
											  :"<span style=" + "\"color: red\"" + ">";
							raised_or_cleared = (severity == "MAJOR" || severity == "CRITICAL")? "<b>Alarm raised at:</b> ":"<b>Alarm cleared at:</b> ";
							
							//need to perform translation to proper name
							x = historyTranslationTable(x);

							if((severity == "MAJOR" || severity == "CLEAR" || severity == "CRITICAL") && start_time<=time_of_alarm && end_time>=time_of_alarm)
								requested_history+= raised_or_cleared + split_by_newline_1_day_ago[i].split(",")[1] + " <b>Generic Condition:</b> " + split_by_newline_1_day_ago[i].split(",")[6] + 
								" <b>Severity:</b> " + font_color_used + "<b>" + severity + "</b>" +"</span>" + " <b>Affected Hosts:</b> " + 
								x + " <b>Alarm text:</b> " + split_by_newline_1_day_ago[i].split(",")[7] + " <b>Alarm description:</b> " + 
								split_by_newline_1_day_ago[i].split("\"")[3] + " <b>Instance Count:</b> " + split_by_newline_1_day_ago[i].split("\"").slice(-1)[0].split(",").slice(-1)[0] + 
								" <b>Unique Alarm ID:</b> " + split_by_newline_1_day_ago[i].split("\"").slice(-1)[0].split(",").slice(-3,-1)[0] + "\n";	
						}
						
						i++;
					}
					
					i = 0;
					
					while(i<size_of_arr_2_days_ago)
					{
						let severity = split_by_newline_2_days_ago[i].split(",")[3];
						//valid alarms to track (i.e.: critical or major)
						if(severity != "MINOR" && severity != "WARNING")
						{
							let x = split_by_newline_2_days_ago[i].split(",")[2];
							let time_of_alarm = split_by_newline_2_days_ago[i].split(",").slice(1)[0].split(" ")[1];
							
							font_color_used = (severity == "MAJOR")? "<span style=" + "\"color: yellow\"" + ">":(severity == "CLEAR")? "<span style=" + "\"color: green\"" + ">"
											  :"<span style=" + "\"color: red\"" + ">";
							raised_or_cleared = (severity == "MAJOR" || severity == "CRITICAL")? "<b>Alarm raised at:</b> ":"<b>Alarm cleared at:</b> ";
							
							//need to perform translation to proper name
							x = historyTranslationTable(x);

							if((severity == "MAJOR" || severity == "CLEAR" || severity == "CRITICAL") && start_time<=time_of_alarm && end_time>=time_of_alarm)
								requested_history+= raised_or_cleared + split_by_newline_2_days_ago[i].split(",")[1] + " <b>Generic Condition:</b> " + split_by_newline_2_days_ago[i].split(",")[6] + 
								" <b>Severity:</b> " + font_color_used + "<b>" + severity + "</b>" +"</span>" + " <b>Affected Hosts:</b> " + 
								x + " <b>Alarm text:</b> " + split_by_newline_2_days_ago[i].split(",")[7] + " <b>Alarm description:</b> " + 
								split_by_newline_2_days_ago[i].split("\"")[3] + " <b>Instance Count:</b> " + split_by_newline_2_days_ago[i].split("\"").slice(-1)[0].split(",").slice(-1)[0] + 
								" <b>Unique Alarm ID:</b> " + split_by_newline_2_days_ago[i].split("\"").slice(-1)[0].split(",").slice(-3,-1)[0] + "\n";	
						}
						
						i++;
					}
					
					i = 0;
					
					while(i<size_of_arr_3_days_ago)
					{
						let severity = split_by_newline_3_days_ago[i].split(",")[3];
						//valid alarms to track (i.e.: critical or major)
						if(severity != "MINOR" && severity != "WARNING")
						{
							let x = split_by_newline_3_days_ago[i].split(",")[2];
							let time_of_alarm = split_by_newline_3_days_ago[i].split(",").slice(1)[0].split(" ")[1];
							
							font_color_used = (severity == "MAJOR")? "<span style=" + "\"color: yellow\"" + ">":(severity == "CLEAR")? "<span style=" + "\"color: green\"" + ">"
											  :"<span style=" + "\"color: red\"" + ">";
							raised_or_cleared = (severity == "MAJOR" || severity == "CRITICAL")? "<b>Alarm raised at:</b> ":"<b>Alarm cleared at:</b> ";
							
							//need to perform translation to proper name
							x = historyTranslationTable(x);

							if((severity == "MAJOR" || severity == "CLEAR" || severity == "CRITICAL") && start_time<=time_of_alarm && end_time>=time_of_alarm)
								requested_history+= raised_or_cleared + split_by_newline_3_days_ago[i].split(",")[1] + " <b>Generic Condition:</b> " + split_by_newline_3_days_ago[i].split(",")[6] + 
								" <b>Severity:</b> " + font_color_used + "<b>" + severity + "</b>" +"</span>" + " <b>Affected Hosts:</b> " + 
								x + " <b>Alarm text:</b> " + split_by_newline_3_days_ago[i].split(",")[7] + " <b>Alarm description:</b> " + 
								split_by_newline_3_days_ago[i].split("\"")[3] + " <b>Instance Count:</b> " + split_by_newline_3_days_ago[i].split("\"").slice(-1)[0].split(",").slice(-1)[0] + 
								" <b>Unique Alarm ID:</b> " + split_by_newline_3_days_ago[i].split("\"").slice(-1)[0].split(",").slice(-3,-1)[0] + "\n";
						}
						
						i++;
					}
					
					i = 0;
					
					while(i<size_of_arr_4_days_ago)
					{
						let severity = split_by_newline_4_days_ago[i].split(",")[3];
						//valid alarms to track (i.e.: critical or major)
						if(severity != "MINOR" && severity != "WARNING")
						{
							let x = split_by_newline_4_days_ago[i].split(",")[2];
							let time_of_alarm = split_by_newline_4_days_ago[i].split(",").slice(1)[0].split(" ")[1];
							
							font_color_used = (severity == "MAJOR")? "<span style=" + "\"color: yellow\"" + ">":(severity == "CLEAR")? "<span style=" + "\"color: green\"" + ">"
											  :"<span style=" + "\"color: red\"" + ">";
							raised_or_cleared = (severity == "MAJOR" || severity == "CRITICAL")? "<b>Alarm raised at:</b> ":"<b>Alarm cleared at:</b> ";
							
							//need to perform translation to proper name
							x = historyTranslationTable(x);

							if((severity == "MAJOR" || severity == "CLEAR" || severity == "CRITICAL") && start_time<=time_of_alarm && end_time>=time_of_alarm)
								requested_history+= raised_or_cleared + split_by_newline_4_days_ago[i].split(",")[1] + " <b>Generic Condition:</b> " + split_by_newline_4_days_ago[i].split(",")[6] + 
								" <b>Severity:</b> " + font_color_used + "<b>" + severity + "</b>" +"</span>" + " <b>Affected Hosts:</b> " + 
								x + " <b>Alarm text:</b> " + split_by_newline_4_days_ago[i].split(",")[7] + " <b>Alarm description:</b> " + 
								split_by_newline_4_days_ago[i].split("\"")[3] + " <b>Instance Count:</b> " + split_by_newline_4_days_ago[i].split("\"").slice(-1)[0].split(",").slice(-1)[0] + 
								" <b>Unique Alarm ID:</b> " + split_by_newline_4_days_ago[i].split("\"").slice(-1)[0].split(",").slice(-3,-1)[0] + "\n";	
						}
						
						i++;
					}
					
					i = 0;
					
					
					while(i<size_of_arr_5_days_ago)
					{
						let severity = split_by_newline_5_days_ago[i].split(",")[3];
						//valid alarms to track (i.e.: critical or major)
						if(severity != "MINOR" && severity != "WARNING")
						{
							let x = split_by_newline_5_days_ago[i].split(",")[2];
							let time_of_alarm = split_by_newline_5_days_ago[i].split(",").slice(1)[0].split(" ")[1];
							
							font_color_used = (severity == "MAJOR")? "<span style=" + "\"color: yellow\"" + ">":(severity == "CLEAR")? "<span style=" + "\"color: green\"" + ">"
											  :"<span style=" + "\"color: red\"" + ">";
							raised_or_cleared = (severity == "MAJOR" || severity == "CRITICAL")? "<b>Alarm raised at:</b> ":"<b>Alarm cleared at:</b> ";
							
							//need to perform translation to proper name
							x = historyTranslationTable(x);

							if((severity == "MAJOR" || severity == "CLEAR" || severity == "CRITICAL") && start_time<=time_of_alarm && end_time>=time_of_alarm)
								requested_history+= raised_or_cleared + split_by_newline_5_days_ago[i].split(",")[1] + " <b>Generic Condition:</b> " + split_by_newline_5_days_ago[i].split(",")[6] + 
								" <b>Severity:</b> " + font_color_used + "<b>" + severity + "</b>" +"</span>" + " <b>Affected Hosts:</b> " + 
								x + " <b>Alarm text:</b> " + split_by_newline_5_days_ago[i].split(",")[7] + " <b>Alarm description:</b> " + 
								split_by_newline_5_days_ago[i].split("\"")[3] + " <b>Instance Count:</b> " + split_by_newline_5_days_ago[i].split("\"").slice(-1)[0].split(",").slice(-1)[0] + 
								" <b>Unique Alarm ID:</b> " + split_by_newline_5_days_ago[i].split("\"").slice(-1)[0].split(",").slice(-3,-1)[0] + "\n";
						}
						
						i++;
					}
					
					i = 0;
					
					
					while(i<size_of_arr_6_days_ago)
					{
						let severity = split_by_newline_6_days_ago[i].split(",")[3];
						//valid alarms to track (i.e.: critical or major)
						if(severity != "MINOR" && severity != "WARNING")
						{
							let x = split_by_newline_6_days_ago[i].split(",")[2];
							let time_of_alarm = split_by_newline_6_days_ago[i].split(",").slice(1)[0].split(" ")[1];
							
							font_color_used = (severity == "MAJOR")? "<span style=" + "\"color: yellow\"" + ">":(severity == "CLEAR")? "<span style=" + "\"color: green\"" + ">"
											  :"<span style=" + "\"color: red\"" + ">";
							raised_or_cleared = (severity == "MAJOR" || severity == "CRITICAL")? "<b>Alarm raised at:</b> ":"<b>Alarm cleared at:</b> ";
							
							//need to perform translation to proper name
							x = historyTranslationTable(x);

							if((severity == "MAJOR" || severity == "CLEAR" || severity == "CRITICAL") && start_time<=time_of_alarm && end_time>=time_of_alarm)
								requested_history+= raised_or_cleared + split_by_newline_6_days_ago[i].split(",")[1] + " <b>Generic Condition:</b> " + split_by_newline_6_days_ago[i].split(",")[6] + 
								" <b>Severity:</b> " + font_color_used + "<b>" + severity + "</b>" +"</span>" + " <b>Affected Hosts:</b> " + 
								x + " <b>Alarm text:</b> " + split_by_newline_6_days_ago[i].split(",")[7] + " <b>Alarm description:</b> " + 
								split_by_newline_6_days_ago[i].split("\"")[3] + " <b>Instance Count:</b> " + split_by_newline_6_days_ago[i].split("\"").slice(-1)[0].split(",").slice(-1)[0] + 
								" <b>Unique Alarm ID:</b> " + split_by_newline_6_days_ago[i].split("\"").slice(-1)[0].split(",").slice(-3,-1)[0] + "\n";
						}
						
						i++;
					}
					
					i = 0;
					
					while(i<size_of_arr_7_days_ago)
					{
						let severity = split_by_newline_7_days_ago[i].split(",")[3];
						//valid alarms to track (i.e.: critical or major)
						if(severity != "MINOR" && severity != "WARNING")
						{
							let x = split_by_newline_7_days_ago[i].split(",")[2];
							let time_of_alarm = split_by_newline_7_days_ago[i].split(",").slice(1)[0].split(" ")[1];
							
							font_color_used = (severity == "MAJOR")? "<span style=" + "\"color: yellow\"" + ">":(severity == "CLEAR")? "<span style=" + "\"color: green\"" + ">"
											  :"<span style=" + "\"color: red\"" + ">";
							raised_or_cleared = (severity == "MAJOR" || severity == "CRITICAL")? "<b>Alarm raised at:</b> ":"<b>Alarm cleared at:</b> ";
							
							//need to perform translation to proper name
							x = historyTranslationTable(x);

							if((severity == "MAJOR" || severity == "CLEAR" || severity == "CRITICAL") && start_time<=time_of_alarm && end_time>=time_of_alarm)
								requested_history+= raised_or_cleared + split_by_newline_7_days_ago[i].split(",")[1] + " <b>Generic Condition:</b> " + split_by_newline_7_days_ago[i].split(",")[6] + 
								" <b>Severity:</b> " + font_color_used + "<b>" + severity + "</b>" +"</span>" + " <b>Affected Hosts:</b> " + 
								x + " <b>Alarm text:</b> " + split_by_newline_7_days_ago[i].split(",")[7] + " <b>Alarm description:</b> " + 
								split_by_newline_7_days_ago[i].split("\"")[3] + " <b>Instance Count:</b> " + split_by_newline_7_days_ago[i].split("\"").slice(-1)[0].split(",").slice(-1)[0] + 
								" <b>Unique Alarm ID:</b> " + split_by_newline_7_days_ago[i].split("\"").slice(-1)[0].split(",").slice(-3,-1)[0] + "\n";
						}
						
						i++;
					}					
					i = 0 ;
					
					//trim last newline character
					requested_history = requested_history.substr(0,requested_history.length -1);
					
					if(requested_history.length > 0)
					{
						requested_history_split = requested_history.split("\n");
						i = 0;
						let instance_count = 0;
						let alarms_filtered_in = [], tmp_arr = [];
						//alarm txt filter logic
						requested_history_split = (sizeOfHistArrTxtToFilter>0)? mergeSort(requested_history_split,ALARM_TEXT_A_TO_Z, ONE_NDS_HISTORY_ALARMS):requested_history_split;
						tmp_arr = getFilterInMatches(hist_alarm_txt_to_filter_arr,requested_history_split,ALARM_TEXT_A_TO_Z);
						alarms_filtered_in = (tmp_arr.length > 0)? alarms_filtered_in.concat(tmp_arr):alarms_filtered_in;
						//node txt filter logic
						requested_history_split = (sizeOfHistArrNodeToFilter>0)? mergeSort(requested_history_split,AFFECTED_HOSTS_A_TO_Z, ONE_NDS_HISTORY_ALARMS):requested_history_split;
						tmp_arr = getFilterInMatches(hist_nodes_txt_to_filter_arr,requested_history_split,AFFECTED_HOSTS_A_TO_Z);
						alarms_filtered_in = (tmp_arr.length > 0)? alarms_filtered_in.concat(tmp_arr):alarms_filtered_in;
						requested_history_split = (sizeOfHistArrTxtToFilter>0 || sizeOfHistArrNodeToFilter>0)? alarms_filtered_in:requested_history_split;
						//mergesort by uniqueID (need to ensure list has at least 1 element to prevent recursive error)
						requested_history_split = (requested_history_split.length > 0)? mergeSort(requested_history_split,DEFAULT, ONE_NDS_HISTORY_ALARMS):requested_history_split;
						var size_of_requested_history = requested_history_split.length;
						
						//alert(requested_history_split[0] == "");
						while(i<size_of_requested_history)
						{
							//alert(requested_history_split[i].split("<b>").slice(-1)[0].split("</b>").slice(-1)[0]);
							var Unique_Alarm_ID = "";
							Unique_Alarm_ID = new RegExp(requested_history_split[i].split("<b>").slice(-1)[0].split("</b>").slice(-1)[0], 'g');
							instance_count = (requested_history.match(Unique_Alarm_ID) || []).length;
							//need to skip any CLEAR alarms which does not have any major or critical alarm match in the string
							if(requested_history_split[i].split("<b>").slice(4)[0].split("</b>").slice(0)[0] == "CLEAR" && instance_count < 2)
							{
								//alert("The alarm that has matches: " + requested_history_split[i]);
								i++;
								continue;
							}
							history_table.insertRow(history_table_rows).insertCell(0).innerHTML = requested_history_split[i];
							history_table_rows++;
							i++;
						}
						if(size_of_requested_history == 0)
							alert("No alarms found for the alarm filter settings specified");
						else
						{
							//remove duplicate values from table (e.g.: 2 or more of the exact same alarms (ID wise) that have been cleared and raised)
							removeDuplicateRows($("#OneNDSHistoryTable"));
							history_table_rows = document.getElementById("OneNDSHistoryTable").getElementsByTagName("tr").length;
						}
					}
					
					if(requested_history.length == 0 || history_table_rows == 1)
						alert("No alarms could be found from your specified starting and ending times");

				}
			
			}
			
		}
		
		//no assumptions made
		if(date_interval_case === DATE_AND_TIME)
		{
			let start_time_input_split = [];
			let end_time_input_split = [];
			let start_date_input_split = [];
			let end_date_input_split = [];
			//set to false when an error is caught
			let valid_dates = true;
			let valid_times = true;
			
			start_time_input = '';
			start_time_input = $("#OneNDSAlarmHistoryRange #start_time").val();
			end_time_input = '';
			end_time_input = $("#OneNDSAlarmHistoryRange #end_time").val();
			start_date_input = '';
			start_date_input = $("#OneNDSAlarmHistoryRange #start_date").val();
			end_date_input = '';
			end_date_input = $("#OneNDSAlarmHistoryRange #end_date").val();			
			
			start_date_input_split = start_date_input.split("-");
			start_date_input_split[1] = (start_date_input_split[1] <10 && start_date_input_split[1].indexOf('0') == -1)? "0"+ start_date_input_split[1]:start_date_input_split[1];
			start_date_input_split[2] = (start_date_input_split[2] <10 && start_date_input_split[2].indexOf('0') == -1)? "0"+ start_date_input_split[2]:start_date_input_split[2];
			start_date_input = start_date_input_split.join("-");

			end_date_input_split = end_date_input.split("-");
			end_date_input_split[1] = (end_date_input_split[1] <10 && end_date_input_split[1].indexOf('0') == -1)? "0"+ end_date_input_split[1]:end_date_input_split[1];
			end_date_input_split[2] = (end_date_input_split[2] <10 && end_date_input_split[2].indexOf('0') == -1)? "0"+ end_date_input_split[2]:end_date_input_split[2];
			end_date_input = end_date_input_split.join("-");
			
			//format yyyymmdd
			start_date = (start_date_input == getCorrectDate(7))? getCorrectDate(7):(start_date_input == getCorrectDate(6))? getCorrectDate(6):
						 (start_date_input == getCorrectDate(5))? getCorrectDate(5):(start_date_input == getCorrectDate(4))? getCorrectDate(4):
						 (start_date_input == getCorrectDate(3))? getCorrectDate(3):(start_date_input == getCorrectDate(2))? getCorrectDate(2):
						 (start_date_input == getCorrectDate(1))? getCorrectDate(1):(start_date_input == getCorrectDate(0))? getCorrectDate(0): 
						 (start_date_input == 'yyyy-mm-dd')? getCorrectDate(7):(start_date_input == getCorrectDate(8))? getCorrectDate(8):'error';
				
			end_date = (end_date_input == getCorrectDate(7))? getCorrectDate(7):(end_date_input == getCorrectDate(6))? getCorrectDate(6):
					   (end_date_input == getCorrectDate(5))? getCorrectDate(5):(end_date_input == getCorrectDate(4))? getCorrectDate(4):
					   (end_date_input == getCorrectDate(3))? getCorrectDate(3):(end_date_input == getCorrectDate(2))? getCorrectDate(2):
					   (end_date_input == getCorrectDate(1))? getCorrectDate(1):(end_date_input == getCorrectDate(0))? getCorrectDate(0): 
					   (end_date_input == 'yyyy-mm-dd')? getCorrectDate(0):(end_date_input == getCorrectDate(8))? getCorrectDate(8):'error'; 
					   
			start_time_input_split = start_time_input.split(":");
			start_time_input_split[0] = (start_time_input_split[0] <10 && start_time_input_split[0].indexOf('0') == -1)? "0"+ start_time_input_split[0]:(start_time_input_split[0] == undefined)? '0':start_time_input_split[0];
			start_time_input_split[1] = (start_time_input_split[1] <10 && start_time_input_split[1].indexOf('0') == -1)? "0"+ start_time_input_split[1]:(start_time_input_split[1] == undefined)? '0':start_time_input_split[1];
			start_time_input_split[2] = (start_time_input_split[2] <10 && start_time_input_split[2].indexOf('0') == -1)? "0"+ start_time_input_split[2]:(start_time_input_split[2] == undefined)? '0':start_time_input_split[2];
			start_time = start_time_input_split.join(":");
			

			end_time_input_split = end_time_input.split(":");
			end_time_input_split[0] = (end_time_input_split[0] <10 && end_time_input_split[0].indexOf('0') == -1)? "0"+ end_time_input_split[0]:(end_time_input_split[0] == undefined)? '0':end_time_input_split[0];
			end_time_input_split[1] = (end_time_input_split[1] <10 && end_time_input_split[1].indexOf('0') == -1)? "0"+ end_time_input_split[1]:(end_time_input_split[1] == undefined)? '0':end_time_input_split[1];
			end_time_input_split[2] = (end_time_input_split[2] <10 && end_time_input_split[2].indexOf('0') == -1)? "0"+ end_time_input_split[2]:(end_time_input_split[2] == undefined)? '0':end_time_input_split[2];
			end_time = end_time_input_split.join(":");

			//DATE CONDITIONALS:
			//very first thing that should be checked is if the date is valid (within range or default date)
			if(start_date == 'error' || end_date == 'error')
				valid_dates = false;
		
			//TIME CONDITIONALS: 
			
			//catch cases where user inputs 00 or >=60 or does not enters a string that is not HH:MM:SS
			if((start_time != 'HH:MM:SS') && (start_time_input_split[0].length <=1 || start_time_input_split[1].length <=1 || start_time_input_split[2].length <=1 || /^\d+$/.test(start_time) || start_time_input_split[0]>=60 || start_time_input_split[1]>=60 || start_time_input_split[2]>=60 ) )
				valid_times = false;
			
			//catch cases where user inputs 00 or >=60 or does not enters a string that is not HH:MM:SS
			if((end_time != 'HH:MM:SS') && (end_time_input_split[0].length <=1 || end_time_input_split[1].length <=1 || end_time_input_split[2].length <=1 || /^\d+$/.test(end_time) || end_time_input_split[0]>=60 || end_time_input_split[1]>=60 || end_time_input_split[2]>=60))
				valid_times = false;
			
			if(valid_dates && valid_times)
			{
				//alert("valid");
				let i = 0;
				//perform swap of end_date and start_date incase user swaps start and end dates
				if(start_date > end_date)
				{
					let tmp = start_date;
					start_date = end_date;
					end_date = tmp;
				}
				//ensure default timing is set if default entry is used for 1 of the times
				end_time = (end_time == 'HH:MM:SS')? '23:59:59':end_time;
				start_time = (start_time == 'HH:MM:SS')? '00:00:00':start_time;
				
				//perform swap of end_time and start_time incase user swaps start and end times 
				if((start_date == end_date) && (end_time<start_time))
				{
					let temp = start_time;
					start_time = end_time;
					end_time = temp;	
				}
				
				split_by_newline_today = readTxtFile(file_today).split("\n");
				split_by_newline_today = split_by_newline_today.slice(1,split_by_newline_today.length-1);
				size_of_arr_today = split_by_newline_today.length;
				start_time_copy = (end_date == start_date)? start_time:(end_date != start_date && start_date == getCorrectDate(0))? start_time: '00:00:00';
				end_time_copy = (end_date == start_date)? end_time: (end_date != start_date && end_date == getCorrectDate(0))? end_time: '23:59:59';
															 	
				while(i<size_of_arr_today)
				{
					let severity = split_by_newline_today[i].split(",")[3];
					//valid alarms to track (i.e.: critical or major)
					if(severity != "MINOR" && severity != "WARNING")
					{
						let x = split_by_newline_today[i].split(",")[2];
						let time_of_alarm = split_by_newline_today[i].split(",").slice(1)[0].split(" ")[1];
						let alarm_date = split_by_newline_today[i].split(",")[1].split(" ")[0];
						//alert(time_of_alarm);
						//alert(start_time<=time_of_alarm);
						date_and_time_scenario = (end_date == start_date)? "same date": (end_date != start_date && start_date == alarm_date)? "start date":
												 (end_date != start_date && end_date == alarm_date)? "end date": 
												 (end_date != start_date && end_date > alarm_date&& start_date < alarm_date)? "between dates" : "none";
												 
						font_color_used = (severity == "MAJOR")? "<span style=" + "\"color: yellow\"" + ">":(severity == "CLEAR")? "<span style=" + "\"color: green\"" + ">"						 
										  :"<span style=" + "\"color: red\"" + ">";						 
						raised_or_cleared = (severity == "MAJOR" || severity == "CRITICAL")? "<b>Alarm raised at:</b> ":"<b>Alarm cleared at:</b> ";						 
												 
						
						//need to perform translation to proper name
						x = historyTranslationTable(x);
						//alert(x);
						if((severity == "MAJOR" || severity == "CLEAR"  || severity == "CRITICAL") && ((start_time_copy<=time_of_alarm && end_time_copy>=time_of_alarm && 
						(date_and_time_scenario ==  "between dates" || date_and_time_scenario == "same date"))|| (start_time_copy<=time_of_alarm && date_and_time_scenario == "start date")
						|| (end_time_copy>=time_of_alarm && date_and_time_scenario == "end date")))
						{
							requested_history+= raised_or_cleared + split_by_newline_today[i].split(",")[1] + " <b>Generic Condition:</b> " + split_by_newline_today[i].split(",")[6] + 
							" <b>Severity:</b> " + font_color_used + "<b>" + severity + "</b>" +"</span>" + " <b>Affected Hosts:</b> " + 
							x + " <b>Alarm text:</b> " + split_by_newline_today[i].split(",")[7] + " <b>Alarm description:</b> " + 
							split_by_newline_today[i].split("\"")[3] + " <b>Instance Count:</b> " + split_by_newline_today[i].split("\"").slice(-1)[0].split(",").slice(-1)[0] + 
							" <b>Unique Alarm ID:</b> " + split_by_newline_today[i].split("\"").slice(-1)[0].split(",").slice(-3,-1)[0] + "\n";
						}			
							
					}
					
					i++;
				}
				
				i = 0;
				
				split_by_newline_1_day_ago = readTxtFile(file_1_day_ago).split("\n");
				split_by_newline_1_day_ago = split_by_newline_1_day_ago.slice(1,split_by_newline_1_day_ago.length-1);
				size_of_arr_1_day_ago = split_by_newline_1_day_ago.length;		
				start_time_copy = (end_date == start_date)? start_time:(end_date != start_date && start_date == getCorrectDate(1))? start_time: '00:00:00';
				end_time_copy = (end_date == start_date)? end_time: (end_date != start_date && end_date == getCorrectDate(1))? end_time: '23:59:59';
				
				while(i<size_of_arr_1_day_ago)
				{
					let severity = split_by_newline_1_day_ago[i].split(",")[3];
					//valid alarms to track (i.e.: critical or major)
					if(severity != "MINOR" && severity != "WARNING")
					{
						let x = split_by_newline_1_day_ago[i].split(",")[2];
						let time_of_alarm = split_by_newline_1_day_ago[i].split(",").slice(1)[0].split(" ")[1];
						let alarm_date = split_by_newline_1_day_ago[i].split(",")[1].split(" ")[0];
						date_and_time_scenario = (end_date == start_date)? "same date": (end_date != start_date && start_date == alarm_date)? "start date":
												 (end_date != start_date && end_date == alarm_date)? "end date": 
												 (end_date != start_date && end_date > alarm_date&& start_date < alarm_date)? "between dates" : "none";

						font_color_used = (severity == "MAJOR")? "<span style=" + "\"color: yellow\"" + ">":(severity == "CLEAR")? "<span style=" + "\"color: green\"" + ">"
										  :"<span style=" + "\"color: red\"" + ">";						 
						raised_or_cleared = (severity == "MAJOR" || severity == "CRITICAL")? "<b>Alarm raised at:</b> ":"<b>Alarm cleared at:</b> ";						
						
						//need to perform translation to proper name
						x = historyTranslationTable(x);

						if((severity == "MAJOR" || severity == "CLEAR"  || severity == "CRITICAL") && ((start_time_copy<=time_of_alarm && end_time_copy>=time_of_alarm && 
						(date_and_time_scenario ==  "between dates" || date_and_time_scenario == "same date"))|| (start_time_copy<=time_of_alarm && date_and_time_scenario == "start date")
						|| (end_time_copy>=time_of_alarm && date_and_time_scenario == "end date")))
						{
							requested_history+= raised_or_cleared + split_by_newline_1_day_ago[i].split(",")[1] + " <b>Generic Condition:</b> " + split_by_newline_1_day_ago[i].split(",")[6] + 
							" <b>Severity:</b> " + font_color_used + "<b>" + severity + "</b>" +"</span>" + " <b>Affected Hosts:</b> " + 
							x + " <b>Alarm text:</b> " + split_by_newline_1_day_ago[i].split(",")[7] + " <b>Alarm description:</b> " + 
							split_by_newline_1_day_ago[i].split("\"")[3] + " <b>Instance Count:</b> " + split_by_newline_1_day_ago[i].split("\"").slice(-1)[0].split(",").slice(-1)[0] + 
							" <b>Unique Alarm ID:</b> " + split_by_newline_1_day_ago[i].split("\"").slice(-1)[0].split(",").slice(-3,-1)[0] + "\n";
						}
								
					}
					
					i++;
				}
			
				i = 0;
					
				split_by_newline_2_days_ago = readTxtFile(file_2_days_ago).split("\n");
				split_by_newline_2_days_ago = split_by_newline_2_days_ago.slice(1,split_by_newline_2_days_ago.length-1);
				size_of_arr_2_days_ago = split_by_newline_2_days_ago.length;
				start_time_copy = (end_date == start_date)? start_time:(end_date != start_date && start_date == getCorrectDate(2))? start_time: '00:00:00';
				end_time_copy = (end_date == start_date)? end_time: (end_date != start_date && end_date == getCorrectDate(2))? end_time: '23:59:59'; 
												 
				while(i<size_of_arr_2_days_ago)
				{
					let severity = split_by_newline_2_days_ago[i].split(",")[3];
					//valid alarms to track (i.e.: critical or major)
					if(severity != "MINOR" && severity != "WARNING")
					{
						let x = split_by_newline_2_days_ago[i].split(",")[2];
						let time_of_alarm = split_by_newline_2_days_ago[i].split(",").slice(1)[0].split(" ")[1];
						let alarm_date = split_by_newline_2_days_ago[i].split(",")[1].split(" ")[0];
						date_and_time_scenario = (end_date == start_date)? "same date": (end_date != start_date && start_date == alarm_date)? "start date":
												 (end_date != start_date && end_date == alarm_date)? "end date": 
												 (end_date != start_date && end_date > alarm_date&& start_date < alarm_date)? "between dates" : "none";
												 
						font_color_used = (severity == "MAJOR")? "<span style=" + "\"color: yellow\"" + ">":(severity == "CLEAR")? "<span style=" + "\"color: green\"" + ">"
                        				  :"<span style=" + "\"color: red\"" + ">";						 
                        raised_or_cleared = (severity == "MAJOR" || severity == "CRITICAL")? "<b>Alarm raised at:</b> ":"<b>Alarm cleared at:</b> ";						
						
						//need to perform translation to proper name
						x = historyTranslationTable(x);

						if((severity == "MAJOR" || severity == "CLEAR"  || severity == "CRITICAL") && ((start_time_copy<=time_of_alarm && end_time_copy>=time_of_alarm && 
						(date_and_time_scenario ==  "between dates" || date_and_time_scenario == "same date"))|| (start_time_copy<=time_of_alarm && date_and_time_scenario == "start date")
						|| (end_time_copy>=time_of_alarm && date_and_time_scenario == "end date")))
						{
							requested_history+= raised_or_cleared + split_by_newline_2_days_ago[i].split(",")[1] + " <b>Generic Condition:</b> " + split_by_newline_2_days_ago[i].split(",")[6] + 
							" <b>Severity:</b> " + font_color_used + "<b>" + severity + "</b>" +"</span>" + " <b>Affected Hosts:</b> " + 
							x + " <b>Alarm text:</b> " + split_by_newline_2_days_ago[i].split(",")[7] + " <b>Alarm description:</b> " + 
							split_by_newline_2_days_ago[i].split("\"")[3] + " <b>Instance Count:</b> " + split_by_newline_2_days_ago[i].split("\"").slice(-1)[0].split(",").slice(-1)[0] + 
							" <b>Unique Alarm ID:</b> " + split_by_newline_2_days_ago[i].split("\"").slice(-1)[0].split(",").slice(-3,-1)[0] + "\n";
						}
							
					}
					
					i++;
				}
				
				i = 0;					
						
				split_by_newline_3_days_ago = readTxtFile(file_3_days_ago).split("\n");
				split_by_newline_3_days_ago = split_by_newline_3_days_ago.slice(1,split_by_newline_3_days_ago.length-1);
				size_of_arr_3_days_ago = split_by_newline_3_days_ago.length;
				start_time_copy = (end_date == start_date)? start_time:(end_date != start_date && start_date == getCorrectDate(3))? start_time: '00:00:00';
				end_time_copy = (end_date == start_date)? end_time: (end_date != start_date && end_date == getCorrectDate(3))? end_time: '23:59:59';
					 
				while(i<size_of_arr_3_days_ago)
				{
					let severity = split_by_newline_3_days_ago[i].split(",")[3];
					//valid alarms to track (i.e.: critical or major)
					if(severity != "MINOR" && severity != "WARNING")
					{
						let x = split_by_newline_3_days_ago[i].split(",")[2];
						let time_of_alarm = split_by_newline_3_days_ago[i].split(",").slice(1)[0].split(" ")[1];
						let alarm_date = split_by_newline_3_days_ago[i].split(",")[1].split(" ")[0];
						date_and_time_scenario = (end_date == start_date)? "same date": (end_date != start_date && start_date == alarm_date)? "start date":
												 (end_date != start_date && end_date == alarm_date)? "end date": 
												 (end_date != start_date && end_date > alarm_date&& start_date < alarm_date)? "between dates" : "none";

						font_color_used = (severity == "MAJOR")? "<span style=" + "\"color: yellow\"" + ">":(severity == "CLEAR")? "<span style=" + "\"color: green\"" + ">"
                        				  :"<span style=" + "\"color: red\"" + ">";						 
                        raised_or_cleared = (severity == "MAJOR" || severity == "CRITICAL")? "<b>Alarm raised at:</b> ":"<b>Alarm cleared at:</b> ";						

						//need to perform translation to proper name
						x = historyTranslationTable(x);

						if((severity == "MAJOR" || severity == "CLEAR"  || severity == "CRITICAL") && ((start_time_copy<=time_of_alarm && end_time_copy>=time_of_alarm && 
						(date_and_time_scenario ==  "between dates" || date_and_time_scenario == "same date"))|| (start_time_copy<=time_of_alarm && date_and_time_scenario == "start date")
						|| (end_time_copy>=time_of_alarm && date_and_time_scenario == "end date")))
						{
							requested_history+= raised_or_cleared + split_by_newline_3_days_ago[i].split(",")[1] + " <b>Generic Condition:</b> " + split_by_newline_3_days_ago[i].split(",")[6] + 
							" <b>Severity:</b> " + font_color_used + "<b>" + severity + "</b>" +"</span>" + " <b>Affected Hosts:</b> " + 
							x + " <b>Alarm text:</b> " + split_by_newline_3_days_ago[i].split(",")[7] + " <b>Alarm description:</b> " + 
							split_by_newline_3_days_ago[i].split("\"")[3] + " <b>Instance Count:</b> " + split_by_newline_3_days_ago[i].split("\"").slice(-1)[0].split(",").slice(-1)[0] + 
							" <b>Unique Alarm ID:</b> " + split_by_newline_3_days_ago[i].split("\"").slice(-1)[0].split(",").slice(-3,-1)[0] + "\n";
						}
							
					}
					
					i++;
				}
				
				i = 0;
				
				split_by_newline_4_days_ago = readTxtFile(file_4_days_ago).split("\n");
				split_by_newline_4_days_ago = split_by_newline_4_days_ago.slice(1,split_by_newline_4_days_ago.length-1);
				size_of_arr_4_days_ago = split_by_newline_4_days_ago.length;
				start_time_copy = (end_date == start_date)? start_time:(end_date != start_date && start_date == getCorrectDate(4))? start_time: '00:00:00';
				end_time_copy = (end_date == start_date)? end_time: (end_date != start_date && end_date == getCorrectDate(4))? end_time: '23:59:59';

				while(i<size_of_arr_4_days_ago)
				{
					let severity = split_by_newline_4_days_ago[i].split(",")[3];
					//valid alarms to track (i.e.: critical or major)
					if(severity != "MINOR" && severity != "WARNING")
					{
						let x = split_by_newline_4_days_ago[i].split(",")[2];
						let time_of_alarm = split_by_newline_4_days_ago[i].split(",").slice(1)[0].split(" ")[1];
						let alarm_date = split_by_newline_4_days_ago[i].split(",")[1].split(" ")[0];
						date_and_time_scenario = (end_date == start_date)? "same date": (end_date != start_date && start_date == alarm_date)? "start date":
												 (end_date != start_date && end_date == alarm_date)? "end date": 
												 (end_date != start_date && end_date > alarm_date&& start_date < alarm_date)? "between dates" : "none";
												 
						font_color_used = (severity == "MAJOR")? "<span style=" + "\"color: yellow\"" + ">":(severity == "CLEAR")? "<span style=" + "\"color: green\"" + ">"
										  :"<span style=" + "\"color: red\"" + ">";						 
						raised_or_cleared = (severity == "MAJOR" || severity == "CRITICAL")? "<b>Alarm raised at:</b> ":"<b>Alarm cleared at:</b> ";						
						
						//need to perform translation to proper name
						x = historyTranslationTable(x);

						if((severity == "MAJOR" || severity == "CLEAR"  || severity == "CRITICAL") && ((start_time_copy<=time_of_alarm && end_time_copy>=time_of_alarm && 
						(date_and_time_scenario ==  "between dates" || date_and_time_scenario == "same date"))|| (start_time_copy<=time_of_alarm && date_and_time_scenario == "start date")
						|| (end_time_copy>=time_of_alarm && date_and_time_scenario == "end date")))
						{
							requested_history+= raised_or_cleared + split_by_newline_4_days_ago[i].split(",")[1] + " <b>Generic Condition:</b> " + split_by_newline_4_days_ago[i].split(",")[6] + 
							" <b>Severity:</b> " + font_color_used + "<b>" + severity + "</b>" +"</span>" + " <b>Affected Hosts:</b> " + 
							x + " <b>Alarm text:</b> " + split_by_newline_4_days_ago[i].split(",")[7] + " <b>Alarm description:</b> " + 
							split_by_newline_4_days_ago[i].split("\"")[3] + " <b>Instance Count:</b> " + split_by_newline_4_days_ago[i].split("\"").slice(-1)[0].split(",").slice(-1)[0] + 
							" <b>Unique Alarm ID:</b> " + split_by_newline_4_days_ago[i].split("\"").slice(-1)[0].split(",").slice(-3,-1)[0] + "\n";
						}

					}
					
					i++;
				}
				
				i = 0;

				split_by_newline_5_days_ago = readTxtFile(file_5_days_ago).split("\n");
				split_by_newline_5_days_ago = split_by_newline_5_days_ago.slice(1,split_by_newline_5_days_ago.length-1);
				size_of_arr_5_days_ago = split_by_newline_5_days_ago.length;
				start_time_copy = (end_date == start_date)? start_time:(end_date != start_date && start_date == getCorrectDate(5))? start_time: '00:00:00';
				end_time_copy = (end_date == start_date)? end_time: (end_date != start_date && end_date == getCorrectDate(5))? end_time: '23:59:59';
			 
				while(i<size_of_arr_5_days_ago)
				{
					let severity = split_by_newline_5_days_ago[i].split(",")[3];
					//valid alarms to track (i.e.: critical or major)
					if(severity != "MINOR" && severity != "WARNING")
					{
						let x = split_by_newline_5_days_ago[i].split(",")[2];
						let time_of_alarm = split_by_newline_5_days_ago[i].split(",").slice(1)[0].split(" ")[1];
						let alarm_date = split_by_newline_5_days_ago[i].split(",")[1].split(" ")[0];
						date_and_time_scenario = (end_date == start_date)? "same date": (end_date != start_date && start_date == alarm_date)? "start date":
												 (end_date != start_date && end_date == alarm_date)? "end date": 
												 (end_date != start_date && end_date > alarm_date&& start_date < alarm_date)? "between dates" : "none";
												 
						font_color_used = (severity == "MAJOR")? "<span style=" + "\"color: yellow\"" + ">":(severity == "CLEAR")? "<span style=" + "\"color: green\"" + ">"
                        				  :"<span style=" + "\"color: red\"" + ">";						 
						raised_or_cleared = (severity == "MAJOR" || severity == "CRITICAL")? "<b>Alarm raised at:</b> ":"<b>Alarm cleared at:</b> ";						
						
						//need to perform translation to proper name
						x = historyTranslationTable(x);

						if((severity == "MAJOR" || severity == "CLEAR"  || severity == "CRITICAL") && ((start_time_copy<=time_of_alarm && end_time_copy>=time_of_alarm && 
						(date_and_time_scenario ==  "between dates" || date_and_time_scenario == "same date"))|| (start_time_copy<=time_of_alarm && date_and_time_scenario == "start date")
						|| (end_time_copy>=time_of_alarm && date_and_time_scenario == "end date")))
						{
							requested_history+= raised_or_cleared + split_by_newline_5_days_ago[i].split(",")[1] + " <b>Generic Condition:</b> " + split_by_newline_5_days_ago[i].split(",")[6] + 
							" <b>Severity:</b> " + font_color_used + "<b>" + severity + "</b>" +"</span>" + " <b>Affected Hosts:</b> " + 
							x + " <b>Alarm text:</b> " + split_by_newline_5_days_ago[i].split(",")[7] + " <b>Alarm description:</b> " + 
							split_by_newline_5_days_ago[i].split("\"")[3] + " <b>Instance Count:</b> " + split_by_newline_5_days_ago[i].split("\"").slice(-1)[0].split(",").slice(-1)[0] + 
							" <b>Unique Alarm ID:</b> " + split_by_newline_5_days_ago[i].split("\"").slice(-1)[0].split(",").slice(-3,-1)[0] + "\n";
						}
																				
					}
					
					i++;
				}
				
				i = 0;	

				split_by_newline_6_days_ago = readTxtFile(file_6_days_ago).split("\n");
				split_by_newline_6_days_ago = split_by_newline_6_days_ago.slice(1,split_by_newline_6_days_ago.length-1);
				size_of_arr_6_days_ago = split_by_newline_6_days_ago.length;
				start_time_copy = (end_date == start_date)? start_time:(end_date != start_date && start_date == getCorrectDate(6))? start_time: '00:00:00';
				end_time_copy = (end_date == start_date)? end_time: (end_date != start_date && end_date == getCorrectDate(6))? end_time: '23:59:59';

			
				while(i<size_of_arr_6_days_ago)
				{
					let severity = split_by_newline_6_days_ago[i].split(",")[3];
					//valid alarms to track (i.e.: critical or major)
					if(severity != "MINOR" && severity != "WARNING")
					{
						let x = split_by_newline_6_days_ago[i].split(",")[2];
						let time_of_alarm = split_by_newline_6_days_ago[i].split(",").slice(1)[0].split(" ")[1];
						let alarm_date = split_by_newline_6_days_ago[i].split(",")[1].split(" ")[0];
						date_and_time_scenario = (end_date == start_date)? "same date": (end_date != start_date && start_date == alarm_date)? "start date":
												 (end_date != start_date && end_date == alarm_date)? "end date": 
												 (end_date != start_date && end_date > alarm_date&& start_date < alarm_date)? "between dates" : "none";
												 
						font_color_used = (severity == "MAJOR")? "<span style=" + "\"color: yellow\"" + ">":(severity == "CLEAR")? "<span style=" + "\"color: green\"" + ">"						 
										  :"<span style=" + "\"color: red\"" + ">";						 						 
						raised_or_cleared = (severity == "MAJOR" || severity == "CRITICAL")? "<b>Alarm raised at:</b> ":"<b>Alarm cleared at:</b> ";												 
												 
						//need to perform translation to proper name
						x = historyTranslationTable(x);

						if((severity == "MAJOR" || severity == "CLEAR"  || severity == "CRITICAL") && ((start_time_copy<=time_of_alarm && end_time_copy>=time_of_alarm && 
						(date_and_time_scenario ==  "between dates" || date_and_time_scenario == "same date"))|| (start_time_copy<=time_of_alarm && date_and_time_scenario == "start date")
						|| (end_time_copy>=time_of_alarm && date_and_time_scenario == "end date")))
						{
							requested_history+= raised_or_cleared + split_by_newline_6_days_ago[i].split(",")[1] + " <b>Generic Condition:</b> " + split_by_newline_6_days_ago[i].split(",")[6] + 
							" <b>Severity:</b> " + font_color_used + "<b>" + severity + "</b>" +"</span>" + " <b>Affected Hosts:</b> " + 
							x + " <b>Alarm text:</b> " + split_by_newline_6_days_ago[i].split(",")[7] + " <b>Alarm description:</b> " + 
							split_by_newline_6_days_ago[i].split("\"")[3] + " <b>Instance Count:</b> " + split_by_newline_6_days_ago[i].split("\"").slice(-1)[0].split(",").slice(-1)[0] + 
							" <b>Unique Alarm ID:</b> " + split_by_newline_6_days_ago[i].split("\"").slice(-1)[0].split(",").slice(-3,-1)[0] + "\n";
						}
														
					}
					
					i++;
				}
				
				i = 0;
					
				split_by_newline_7_days_ago = readTxtFile(file_7_days_ago).split("\n");
				split_by_newline_7_days_ago = split_by_newline_7_days_ago.slice(1,split_by_newline_7_days_ago.length-1);
				size_of_arr_7_days_ago = split_by_newline_7_days_ago.length;
				start_time_copy = (end_date == start_date)? start_time:(end_date != start_date && start_date == getCorrectDate(7))? start_time: '00:00:00';
				end_time_copy = (end_date == start_date)? end_time: (end_date != start_date && end_date == getCorrectDate(7))? end_time: '23:59:59';
										 
				while(i<size_of_arr_7_days_ago)
				{
					let severity = split_by_newline_7_days_ago[i].split(",")[3];
					//valid alarms to track (i.e.: critical or major)
					if(severity != "MINOR" && severity != "WARNING")
					{
						let x = split_by_newline_7_days_ago[i].split(",")[2];
						let time_of_alarm = split_by_newline_7_days_ago[i].split(",").slice(1)[0].split(" ")[1];
						let alarm_date = split_by_newline_7_days_ago[i].split(",")[1].split(" ")[0];
						date_and_time_scenario = (end_date == start_date)? "same date": (end_date != start_date && start_date == alarm_date)? "start date":
												 (end_date != start_date && end_date == alarm_date)? "end date": 
												 (end_date != start_date && end_date > alarm_date&& start_date < alarm_date)? "between dates" : "none";
												 
						font_color_used = (severity == "MAJOR")? "<span style=" + "\"color: yellow\"" + ">":(severity == "CLEAR")? "<span style=" + "\"color: green\"" + ">"
										  :"<span style=" + "\"color: red\"" + ">";						 						 
						raised_or_cleared = (severity == "MAJOR" || severity == "CRITICAL")? "<b>Alarm raised at:</b> ":"<b>Alarm cleared at:</b> ";						
						
						//need to perform translation to proper name
						x = historyTranslationTable(x);

						if((severity == "MAJOR" || severity == "CLEAR"  || severity == "CRITICAL") && ((start_time_copy<=time_of_alarm && end_time_copy>=time_of_alarm && 
						(date_and_time_scenario ==  "between dates" || date_and_time_scenario == "same date"))|| (start_time_copy<=time_of_alarm && date_and_time_scenario == "start date")
						|| (end_time_copy>=time_of_alarm && date_and_time_scenario == "end date")))
						{
							requested_history+= raised_or_cleared + split_by_newline_7_days_ago[i].split(",")[1] + " <b>Generic Condition:</b> " + split_by_newline_7_days_ago[i].split(",")[6] + 
							" <b>Severity:</b> " + font_color_used + "<b>" + severity + "</b>" +"</span>" + " <b>Affected Hosts:</b> " + 
							x + " <b>Alarm text:</b> " + split_by_newline_7_days_ago[i].split(",")[7] + " <b>Alarm description:</b> " + 
							split_by_newline_7_days_ago[i].split("\"")[3] + " <b>Instance Count:</b> " + split_by_newline_7_days_ago[i].split("\"").slice(-1)[0].split(",").slice(-1)[0] + 
							" <b>Unique Alarm ID:</b> " + split_by_newline_7_days_ago[i].split("\"").slice(-1)[0].split(",").slice(-3,-1)[0] + "\n";
						}
	
					}
					
					i++;
				}
				i = 0;
					
				//trim last newline character
				requested_history = requested_history.substr(0,requested_history.length -1);
				
				if(requested_history.length > 0)
				{
					requested_history_split = requested_history.split("\n");
					i = 0;
					let instance_count = 0;
					let alarms_filtered_in = [], tmp_arr = [];
					//alarm txt filter logic
					requested_history_split = (sizeOfHistArrTxtToFilter>0)? mergeSort(requested_history_split,ALARM_TEXT_A_TO_Z, ONE_NDS_HISTORY_ALARMS):requested_history_split;
					tmp_arr = getFilterInMatches(hist_alarm_txt_to_filter_arr,requested_history_split,ALARM_TEXT_A_TO_Z);
					alarms_filtered_in = (tmp_arr.length > 0)? alarms_filtered_in.concat(tmp_arr):alarms_filtered_in;
					//node txt filter logic
					requested_history_split = (sizeOfHistArrNodeToFilter>0)? mergeSort(requested_history_split,AFFECTED_HOSTS_A_TO_Z, ONE_NDS_HISTORY_ALARMS):requested_history_split;
					tmp_arr = getFilterInMatches(hist_nodes_txt_to_filter_arr,requested_history_split,AFFECTED_HOSTS_A_TO_Z);
					alarms_filtered_in = (tmp_arr.length > 0)? alarms_filtered_in.concat(tmp_arr):alarms_filtered_in;
					requested_history_split = (sizeOfHistArrTxtToFilter>0 || sizeOfHistArrNodeToFilter>0)? alarms_filtered_in:requested_history_split;
					//mergesort by uniqueID... need to ensure that arr has at least 1 element to prevent recursive error (overflow)
					requested_history_split = (requested_history_split.length > 0)? mergeSort(requested_history_split,DEFAULT, ONE_NDS_HISTORY_ALARMS):requested_history_split;
					var size_of_requested_history = requested_history_split.length;	
					//alert(requested_history_split[0] == "");
					while(i<size_of_requested_history)
					{
						//alert(requested_history_split[i].split("<b>").slice(-1)[0].split("</b>").slice(-1)[0]);
						var Unique_Alarm_ID = "";
						Unique_Alarm_ID = new RegExp(requested_history_split[i].split("<b>").slice(-1)[0].split("</b>").slice(-1)[0], 'g');
						instance_count = (requested_history.match(Unique_Alarm_ID) || []).length;
						//need to skip any CLEAR alarms which does not have any major or critical alarm match in the string
						if(requested_history_split[i].split("<b>").slice(4)[0].split("</b>").slice(0)[0] == "CLEAR" && instance_count < 2)
						{
							//alert("The alarm that has matches: " + requested_history_split[i]);
							i++;
							continue;
						}
						history_table.insertRow(history_table_rows).insertCell(0).innerHTML = requested_history_split[i];
						history_table_rows++;
						i++;
					}
					if(size_of_requested_history == 0)
						alert("No alarms found for the alarm filter settings specified");
					else
					{
						//remove duplicate values from table (e.g.: 2 or more of the exact same alarms (ID wise) that have been cleared and raised)
						removeDuplicateRows($("#OneNDSHistoryTable"));
						history_table_rows = document.getElementById("OneNDSHistoryTable").getElementsByTagName("tr").length;
					}
				}
				
				if(requested_history.length == 0 || history_table_rows == 1)
					alert("No alarms could be found from your specified starting and ending dates and times");
					
			}
			
			else
			{
				if(!valid_dates && !valid_times)
					alert("The starting date or the ending date (not within 8 days), and the starting time or ending time is invalid. Please try again.");
				if(!valid_dates && valid_times)
					alert("The starting date or the ending date is invalid (not within 8 days). Please try again.");
				if(valid_dates && !valid_times)
					alert("The starting time or ending time is invalid. Please try again.");
			}
				
		}
		//then based on adm_to_use, read files from specified adm directory, and check date range to know which files to read
		
		//reset text and default color when textbox is not select
		$("#OneNDSAlarmHistoryRange #start_date").val("yyyy-mm-dd");
		$("#OneNDSAlarmHistoryRange #start_date").css("color","#BBB");
		$("#OneNDSAlarmHistoryRange #start_time").val("HH:MM:SS");
		$("#OneNDSAlarmHistoryRange #start_time").css("color","#BBB"); 
		$("#OneNDSAlarmHistoryRange #end_time").val("HH:MM:SS");
		$("#OneNDSAlarmHistoryRange #end_time").css("color","#BBB"); 		
		$("#OneNDSAlarmHistoryRange #end_date").val("yyyy-mm-dd");
		$("#OneNDSAlarmHistoryRange #end_date").css("color","#BBB"); 
		//console.log("Form submitted");
	});	
		
}

function genOneNDSLiveAlarmsTable() 
{	
	var table = document.getElementById(ONE_NDS_LIVE_TABLE_NAME);
	table.deleteRow(1);
	//both these variables needed to find out what the GUI user wants to sort data by
	var tag_selected = document.getElementById("Alarm Sorting");
	var selectedValue = tag_selected.options[tag_selected.selectedIndex].value;
	//This works, provided its within the loop/mount check places 
	
	//variables for alarm text filtering
	var alarms_txt_to_filter = '';
	var alarms_txt_to_filter_arr = [];
	var sizeOfArrTxtToFilter = 0;
	
	//variables for Node filtering
	var nodes_txt_to_filter = '';
	var nodes_txt_to_filter_arr = [];
	var sizeOfArrNodeToFilter = 0;
	
	//variable to keep track of which mount point is active
	var dir_mounted = '';
	var mount_path_to_use = ''; //either: 1) ../SS_Alarms_Mount_Point/ActiveAlarmTable.txt , 2) ../SS_Alarms_Mount_Point_Backup1/ActiveAlarmTable.txt , 3) ../SS_Alarms_Mount_Point_Backup2/ActiveAlarmTable.txt
	
	//get both alarm text to filter and nodes to filter (sorted)
	alarms_txt_to_filter_arr = readFileAndSort(LIVE_ALARMS_TXT_FILTER_PATH,GENERIC_SORT_A_TO_Z);
	sizeOfArrTxtToFilter = alarms_txt_to_filter_arr.length;
	nodes_txt_to_filter_arr = readFileAndSort(LIVE_NODE_TXT_FILTER_PATH,GENERIC_SORT_A_TO_Z);
	sizeOfArrNodeToFilter = nodes_txt_to_filter_arr.length;
	
   //required to initialize what is mounted (otherwise in the 1st iteration of setInterval, it will be empty)

	dir_mounted = readTxtFile(ACTIVE_MOUNT_POINT_DIR);
	mount_path_to_use = dir_mounted.indexOf(PRIMARY_MOUNT_POINT)>=0? '../SS_Alarms_Mount_Point/ActiveAlarmTable.txt':dir_mounted.indexOf(BACKUP1_MOUNT_POINT)>=0?
						'../SS_Alarms_Mount_Point_Backup1/ActiveAlarmTable.txt':dir_mounted.indexOf(BACKUP2_MOUNT_POINT)>=0? 
						'../SS_Alarms_Mount_Point_Backup2/ActiveAlarmTable.txt' : '../SS_Alarms_Mount_Point_Backup2/ActiveAlarmTable.txt';

	

	var split_by_newline = readTxtFile(mount_path_to_use).split("\n");
	var legit_alarms = "";
	//need to get rid of last element... for some reason its undefined...First element is also garbage
	split_by_newline = split_by_newline.slice(1,split_by_newline.length-1);
	var size = split_by_newline.length;
	
	var num_of_rows = document.getElementById(ONE_NDS_LIVE_TABLE_NAME).getElementsByTagName("tr").length;
	//table.insertRow(1).insertCell(0).innerHTML = "test";
	//num_of_rows = document.getElementById(ONE_NDS_LIVE_TABLE_NAME).getElementsByTagName("tr").length;
	
	//required to clear the old table...
	while(num_of_rows>1)
	{
		table.deleteRow(num_of_rows-1);
		num_of_rows--;
		//alert(num_of_rows);
	}
	
	//Alarm Text filter logic
	if(sizeOfArrTxtToFilter>0 && size>0)
	{
		//mergesort array containing all OneNDS alarms (sort by alarm text) - easier to remove elements
		split_by_newline = mergeSort(split_by_newline,ALARM_TEXT_A_TO_Z, ONE_NDS_LIVE_ALARMS);

		
		let i = 0;
		let j = 0;
		
		while(j<sizeOfArrTxtToFilter)
		{
			//works since both are alphabetically sorted
			//this means that oneNDS alarms present cant contain the current filter request
			//e.g.: "LDAP Error Threshold" > "Invalid Configuration"
			if(split_by_newline[i].split("|")[7] > alarms_txt_to_filter_arr[j])
			{
				j++;
				continue;
			}
		    //performs filtering of oneNDS alarms by removing them from the alarm list
			if(split_by_newline[i].split("|")[7] == alarms_txt_to_filter_arr[j])
			{
				split_by_newline.splice(i,1);
				size--;
				i--;
				continue;
			}
			//this needs to happen here after the compare of the last element is done...
			if(i!=size-1)
				i++;
			else
				break;
		}	
		
	}
	//Node filter logic
	if(sizeOfArrNodeToFilter>0 && size>0)
	{
		split_by_newline = mergeSort(split_by_newline,AFFECTED_HOSTS_A_TO_Z, ONE_NDS_LIVE_ALARMS);
		let i = 0;
		let j = 0;
		while(j<sizeOfArrNodeToFilter)
		{
			//alert("j value " + j + "i value: " + i + " size: " + size);
			if(split_by_newline[i].split("|")[6] > nodes_txt_to_filter_arr[j])
			{
				j++;
				continue;
			}
			//alert("j: " +j + " i: " + i + " size: " +size + "Nodes to filter: " + nodes_txt_to_filter_arr[j] + " NDS alarm node: " + split_by_newline[i].split("|")[6]);
			if(split_by_newline[i].split("|")[6] == nodes_txt_to_filter_arr[j])
			{
				split_by_newline.splice(i,1);
				size--;
				i--;
				continue;
			}
			//this needs to happen here after the compare of the last element is done...
			if(i!=size-1)
				i++;
			else
				break;
		}	
	}		
	
	//checks which option is selected (What does the UI user want to set data by)
	//default case is where you sort from oldest date to newest
		
	split_by_newline = (selectedValue === DATE_OLD_TO_NEW)? mergeSort(split_by_newline,DATE_OLD_TO_NEW, ONE_NDS_LIVE_ALARMS):(selectedValue === DATE_NEW_TO_OLD)? 
						mergeSort(split_by_newline,DATE_NEW_TO_OLD, ONE_NDS_LIVE_ALARMS):(selectedValue === GENERIC_COND_A_TO_Z)? 
						mergeSort(split_by_newline,GENERIC_COND_A_TO_Z, ONE_NDS_LIVE_ALARMS):(selectedValue === GENERIC_COND_Z_TO_A)? 
						mergeSort(split_by_newline,GENERIC_COND_Z_TO_A, ONE_NDS_LIVE_ALARMS):(selectedValue === SEVERITY_A_TO_Z)?
						mergeSort(split_by_newline,SEVERITY_A_TO_Z, ONE_NDS_LIVE_ALARMS):(selectedValue === SEVERITY_Z_TO_A)? 
						mergeSort(split_by_newline,SEVERITY_Z_TO_A, ONE_NDS_LIVE_ALARMS):(selectedValue === AFFECTED_HOSTS_A_TO_Z)? 
						mergeSort(split_by_newline,AFFECTED_HOSTS_A_TO_Z, ONE_NDS_LIVE_ALARMS):(selectedValue === AFFECTED_HOSTS_Z_TO_A)? 
						mergeSort(split_by_newline,AFFECTED_HOSTS_Z_TO_A, ONE_NDS_LIVE_ALARMS):(selectedValue === ALARM_DESC_A_TO_Z)? 
						mergeSort(split_by_newline,ALARM_DESC_A_TO_Z, ONE_NDS_LIVE_ALARMS):(selectedValue === ALARM_DESC_Z_TO_A)? 
						mergeSort(split_by_newline,ALARM_DESC_Z_TO_A, ONE_NDS_LIVE_ALARMS):(selectedValue === ALARM_TEXT_A_TO_Z)? 
						mergeSort(split_by_newline,ALARM_TEXT_A_TO_Z, ONE_NDS_LIVE_ALARMS):(selectedValue === ALARM_TEXT_Z_TO_A)?
						mergeSort(split_by_newline,ALARM_TEXT_Z_TO_A, ONE_NDS_LIVE_ALARMS):(selectedValue === INST_COUNT_MOST_TO_LEAST)? 
						mergeSort(split_by_newline,INST_COUNT_MOST_TO_LEAST, ONE_NDS_LIVE_ALARMS):(selectedValue === INST_COUNT_LEAST_TO_MOST)? 
						mergeSort(split_by_newline,INST_COUNT_LEAST_TO_MOST, ONE_NDS_LIVE_ALARMS):mergeSort(split_by_newline,DATE_OLD_TO_NEW, ONE_NDS_LIVE_ALARMS);
					
						
						
	//testing time comparisons as strings
	//Logic: sort the array using something like merge sort to compare the strings in split_by_newline[n].split("|")[0]
	//and sort them accordingly. Same logic would apply for Generic condition, Severity, Affected Hosts, Alarm text, etc

	var n = 0;
	
	//0 = Time Alarm is raised , 1 = Generic condition , 2 = Sverity, 5 = Event Number ,6 = Affected Hosts , 7 = Alarm text , ,8 = Alarm description, 13 = Instance Count
	//to add newlines between the text, put in <br> in the legit alarms text
	while(n<size)
	{
		//valid alarms to track (i.e.: critical or major)
		if((split_by_newline[n].split("|"))[2] == "MAJOR" || (split_by_newline[n].split("|"))[2] == "CRITICAL")
		{
			if((split_by_newline[n].split("|"))[2] == "MAJOR")
			{
				legit_alarms+="<b>Alarm raised at:</b> " + split_by_newline[n].split("|")[0] + " <b>Generic Condition:</b> " + split_by_newline[n].split("|")[1] + " <b>Severity:</b> " + 
				"<span style=" + "\"color: yellow\"" + ">" + "<b>" + split_by_newline[n].split("|")[2] + "</b>" +"</span>" + " <b>Affected Hosts:</b> " + 
				split_by_newline[n].split("|")[6] + " <b>Alarm text:</b> " + split_by_newline[n].split("|")[7] + " <b>Alarm description:</b> " + split_by_newline[n].split("|")[8] + 
				" EVENT_NUMBER: " + split_by_newline[n].split("|")[5] + " <b>Instance Count:</b> " + split_by_newline[n].split("|")[13] + "\n";
			}
			
			else
			{
				legit_alarms+="<b>Alarm raised at:</b> " + split_by_newline[n].split("|")[0] + " <b>Generic Condition:</b> " + split_by_newline[n].split("|")[1] + " <b>Severity:</b> " + 
				"<span style=" + "\"color: red\"" + ">" + "<b>" + split_by_newline[n].split("|")[2] + "</b>" +"</span>" + " <b>Affected Hosts:</b> " + 
				split_by_newline[n].split("|")[6] + " <b>Alarm text:</b> " + split_by_newline[n].split("|")[7] + " <b>Alarm description:</b> " + split_by_newline[n].split("|")[8] 
				+ " EVENT_NUMBER: " + split_by_newline[n].split("|")[5] + " <b>Instance Count:</b> " + split_by_newline[n].split("|")[13] + "\n";
			}
				
				
		}	
		n++;
	}
	//trim last newline character
	legit_alarms = legit_alarms.substr(0,legit_alarms.length -1);
	var legit_alarms_split = legit_alarms.split("\n");
	var size_of_legit_alarms = (legit_alarms_split[0] == "")? 0:legit_alarms_split.length
	n = 0;
	while(n<size_of_legit_alarms)
	{
		table.insertRow(num_of_rows).insertCell(0).innerHTML = "\n" + legit_alarms_split[n];
		num_of_rows++;
		n++;
	}
	
	//once processing is done, call backend code to output to a file so that the main page can tell what alarms are not filtered
	ajaxWriteOneNDSAlarms('outEffectiveNDSAlarms',legit_alarms);

	//NOTE WITHOUT ANY ADDED ROWS INTO THE TABLE, THE BASE ROWS = 2 ... You can delete this down to 1 at the beginning of this loop
	//Then keep it such that you delete every row except for row 0 everytime you recreate the table
	
	//update # of live alarms for OneNDS
	document.getElementById("NUMBER_OF_NDS_LIVE_ALARMS").innerHTML = "# of live oneNDS alarms = " + String(num_of_rows-1);
	setInterval(function()
	{
		
		//need to add this here so that the selectedValue is constantly updated
		selectedValue = tag_selected.options[tag_selected.selectedIndex].value;
		//get both alarm text to filter and nodes to filter (sorted)
		alarms_txt_to_filter_arr = readFileAndSort(LIVE_ALARMS_TXT_FILTER_PATH,GENERIC_SORT_A_TO_Z);
		sizeOfArrTxtToFilter = alarms_txt_to_filter_arr.length;
		
		//this is not sorting properly for some reason...
		nodes_txt_to_filter_arr = readFileAndSort(LIVE_NODE_TXT_FILTER_PATH,GENERIC_SORT_A_TO_Z);
		sizeOfArrNodeToFilter = nodes_txt_to_filter_arr.length;
		//check txt file that has df -k (mount points) written to it
		dir_mounted = readTxtFile(ACTIVE_MOUNT_POINT_DIR);
		
		mount_path_to_use = dir_mounted.indexOf(PRIMARY_MOUNT_POINT)>=0? '../SS_Alarms_Mount_Point/ActiveAlarmTable.txt':dir_mounted.indexOf(BACKUP1_MOUNT_POINT)>=0?
						'../SS_Alarms_Mount_Point_Backup1/ActiveAlarmTable.txt':dir_mounted.indexOf(BACKUP2_MOUNT_POINT)>=0? 
						'../SS_Alarms_Mount_Point_Backup2/ActiveAlarmTable.txt' : mount_path_to_use;
		
		//NOTE THAT AFTER EACH ROW ADDITION, YOU NEED TO UPDATE THE NUM_OF_ROWS Variable
		//this means that primary ADM is mounted (no disconnect)
		//root@dbmtor002:/opt/mgtservices/statusService/logs/

		split_by_newline = readTxtFile(mount_path_to_use).split("\n");
		legit_alarms = "";
		//need to get rid of last element... for some reason its undefined...First element is also garbage
		split_by_newline = split_by_newline.slice(1,split_by_newline.length-1);
		size = split_by_newline.length
		num_of_rows = document.getElementById(ONE_NDS_LIVE_TABLE_NAME).getElementsByTagName("tr").length;
		//table.insertRow(1).insertCell(0).innerHTML = "test";
		//num_of_rows = document.getElementById(ONE_NDS_LIVE_TABLE_NAME).getElementsByTagName("tr").length;
		
		//required to clear the old table...
		while(num_of_rows>1)
		{
			table.deleteRow(num_of_rows-1);
			num_of_rows--;
			//alert(num_of_rows);
		}
		
		//Alarm Text filter logic
		if(sizeOfArrTxtToFilter>0 && size>0)
		{
			//mergesort array containing all OneNDS alarms (sort by alarm text) - easier to remove elements
			split_by_newline = mergeSort(split_by_newline,ALARM_TEXT_A_TO_Z, ONE_NDS_LIVE_ALARMS); 	
			
			let i = 0;
			let j = 0;
			
			while(j<sizeOfArrTxtToFilter)
			{
				//works since both are alphabetically sorted
				//this means that oneNDS alarms present cant contain the current filter request
				//e.g.: "LDAP Error Threshold" > "Invalid Configuration"
				if(split_by_newline[i].split("|")[7] > alarms_txt_to_filter_arr[j])
				{
					j++;
					continue;
				}
				//performs filtering of oneNDS alarms by removing them from the alarm list
				if(split_by_newline[i].split("|")[7] == alarms_txt_to_filter_arr[j])
				{
					split_by_newline.splice(i,1);
					size--;
					i--;
					continue;
				}
				//this needs to happen here after the compare of the last element is done...
				if(i!=size-1)
					i++;
				else
					break;
			}	
			
		}
		//Node filter logic
		if(sizeOfArrNodeToFilter>0 && size>0)
		{
			split_by_newline = mergeSort(split_by_newline,AFFECTED_HOSTS_A_TO_Z, ONE_NDS_LIVE_ALARMS);
			let i = 0;
			let j = 0;
			while(j<sizeOfArrNodeToFilter)
			{
				//alert("j value " + j + "i value: " + i + " size: " + size);
				if(split_by_newline[i].split("|")[6] > nodes_txt_to_filter_arr[j])
				{
					j++;
					continue;
				}
				//alert("j: " +j + " i: " + i + " size: " +size + "Nodes to filter: " + nodes_txt_to_filter_arr[j] + " NDS alarm node: " + split_by_newline[i].split("|")[6]);
				if(split_by_newline[i].split("|")[6] == nodes_txt_to_filter_arr[j])
				{
					split_by_newline.splice(i,1);
					size--;
					i--;
					continue;
				}
				//this needs to happen here after the compare of the last element is done...
				if(i!=size-1)
					i++;
				else
					break;
			}	
		}				
		
		//checks which option is selected (What does the UI user want to set data by)
		//default case is where you sort from oldest date to newest
		split_by_newline = (selectedValue === DATE_OLD_TO_NEW)? mergeSort(split_by_newline,DATE_OLD_TO_NEW, ONE_NDS_LIVE_ALARMS):(selectedValue === DATE_NEW_TO_OLD)? 
							mergeSort(split_by_newline,DATE_NEW_TO_OLD, ONE_NDS_LIVE_ALARMS):(selectedValue === GENERIC_COND_A_TO_Z)? 
							mergeSort(split_by_newline,GENERIC_COND_A_TO_Z, ONE_NDS_LIVE_ALARMS):(selectedValue === GENERIC_COND_Z_TO_A)? 
							mergeSort(split_by_newline,GENERIC_COND_Z_TO_A, ONE_NDS_LIVE_ALARMS):(selectedValue === SEVERITY_A_TO_Z)?
							mergeSort(split_by_newline,SEVERITY_A_TO_Z, ONE_NDS_LIVE_ALARMS):(selectedValue === SEVERITY_Z_TO_A)? 
							mergeSort(split_by_newline,SEVERITY_Z_TO_A, ONE_NDS_LIVE_ALARMS):(selectedValue === AFFECTED_HOSTS_A_TO_Z)? 
							mergeSort(split_by_newline,AFFECTED_HOSTS_A_TO_Z, ONE_NDS_LIVE_ALARMS):(selectedValue === AFFECTED_HOSTS_Z_TO_A)? 
							mergeSort(split_by_newline,AFFECTED_HOSTS_Z_TO_A, ONE_NDS_LIVE_ALARMS):(selectedValue === ALARM_DESC_A_TO_Z)? 
							mergeSort(split_by_newline,ALARM_DESC_A_TO_Z, ONE_NDS_LIVE_ALARMS):(selectedValue === ALARM_DESC_Z_TO_A)? 
							mergeSort(split_by_newline,ALARM_DESC_Z_TO_A, ONE_NDS_LIVE_ALARMS):(selectedValue === ALARM_TEXT_A_TO_Z)? 
							mergeSort(split_by_newline,ALARM_TEXT_A_TO_Z, ONE_NDS_LIVE_ALARMS):(selectedValue === ALARM_TEXT_Z_TO_A)?
							mergeSort(split_by_newline,ALARM_TEXT_Z_TO_A, ONE_NDS_LIVE_ALARMS):(selectedValue === INST_COUNT_MOST_TO_LEAST)? 
							mergeSort(split_by_newline,INST_COUNT_MOST_TO_LEAST, ONE_NDS_LIVE_ALARMS):(selectedValue === INST_COUNT_LEAST_TO_MOST)? 
							mergeSort(split_by_newline,INST_COUNT_LEAST_TO_MOST, ONE_NDS_LIVE_ALARMS):mergeSort(split_by_newline,DATE_OLD_TO_NEW, ONE_NDS_LIVE_ALARMS);
					
		var n = 0;
		//0 = Time Alarm is raised , 1 = Generic condition , 2 = Sverity, 6 = Affected Hosts , 7 = Alarm text ,8 = Alarm description, 13 = Instance Count
		while(n<size)
		{
			//valid alarms to track (i.e.: critical or major)
			if((split_by_newline[n].split("|"))[2] == "MAJOR" || (split_by_newline[n].split("|"))[2] == "CRITICAL")
			{
				if((split_by_newline[n].split("|"))[2] == "MAJOR")
				{
					legit_alarms+="<b>Alarm raised at:</b> " + split_by_newline[n].split("|")[0] + " <b>Generic Condition:</b> " + split_by_newline[n].split("|")[1] + " <b>Severity:</b> " + 
					"<span style=" + "\"color: yellow\"" + ">" + "<b>" + split_by_newline[n].split("|")[2] + "</b>" +"</span>" + " <b>Affected Hosts:</b> " + 
					split_by_newline[n].split("|")[6] + " <b>Alarm text:</b> " + split_by_newline[n].split("|")[7] + " <b>Alarm description:</b> " + split_by_newline[n].split("|")[8] + 
					" EVENT_NUMBER: " + split_by_newline[n].split("|")[5] + " <b>Instance Count:</b> " + split_by_newline[n].split("|")[13] + "\n";
				}
				
				else
				{
					legit_alarms+="<b>Alarm raised at:</b> " + split_by_newline[n].split("|")[0] + " <b>Generic Condition:</b> " + split_by_newline[n].split("|")[1] + " <b>Severity:</b> " + 
					"<span style=" + "\"color: red\"" + ">" + "<b>" + split_by_newline[n].split("|")[2] + "</b>" +"</span>" + " <b>Affected Hosts:</b> " + 
					split_by_newline[n].split("|")[6] + " <b>Alarm text:</b> " + split_by_newline[n].split("|")[7] + " <b>Alarm description:</b> " + split_by_newline[n].split("|")[8] + 
					" EVENT_NUMBER: " + split_by_newline[n].split("|")[5] + " <b>Instance Count:</b> " + split_by_newline[n].split("|")[13] + "\n";
				}
				
			}
			
			n++;
		}
		//trim last newline character
		legit_alarms = legit_alarms.substr(0,legit_alarms.length -1);
		var legit_alarms_split = legit_alarms.split("\n");
		var size_of_legit_alarms = (legit_alarms_split[0] == "")? 0:legit_alarms_split.length
		n = 0;
		while(n<size_of_legit_alarms)
		{
			table.insertRow(num_of_rows).insertCell(0).innerHTML = "\n" + legit_alarms_split[n];
			num_of_rows++;
			n++;
		}
		
		//once processing is done, call backend code to output to a file so that the main page can tell what alarms are not filtered
		ajaxWriteOneNDSAlarms('outEffectiveNDSAlarms',legit_alarms);
		//update # of live alarms for OneNDS
		document.getElementById("NUMBER_OF_NDS_LIVE_ALARMS").innerHTML = "# of live oneNDS alarms = " + String(num_of_rows-1);
		
		//var row = table.insertRow(1).insertCell(0).innerHTML = "test";
		//table.insertRow(1).insertCell(0).innerHTML = "test";
		//num_of_rows = document.getElementById(ONE_NDS_LIVE_TABLE_NAME).getElementsByTagName("tr").length;
		//alert(num_of_rows);
		//need logic to check if any rows exist... If so, remove all of them, and build new rows based on new strings from legit_alarms string
						
	}, 5000); //this is a very useful line for performing an action over and over again (e.g.: reading a file)
		
}

