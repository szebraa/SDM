//window.alert('hi');

function genTPSKPIGraph()
{
	let fds = "fds";
    let bdsa = "bdsa";
	
	let bdsa_col_tag_selected = document.getElementById("COL_BDSA_PER_PAGE");
	let bdsa_col_selectedValue = bdsa_col_tag_selected.options[bdsa_col_tag_selected.selectedIndex].value;

	var bdsa_graph_width = 1880 //(bdsa_col_selectedValue == "1")?1880:(bdsa_col_selectedValue == "2")?940:470;
	
	let bdsa_row_tag_selected = document.getElementById("ROW_BDSA_PER_PAGE");
	let bdsa_row_selectedValue = bdsa_row_tag_selected.options[bdsa_row_tag_selected.selectedIndex].value;
	var bdsa_graph_height = (bdsa_row_selectedValue == "1")?680:(bdsa_row_selectedValue == "2")?340:210;
	
	let bdsa_html_breaks = [];

	//processing for all BDSAs
	if($('#BDSA_TPS_KPI_body_portion').is(':visible'))
	{
		//needed to ensure that correct graphs are shown upon refresh
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
	

		//processing for bdsa2
		
		
		genTPSGraph(BDSA2_TPS_KPI_PATH,BDSA2_TO_BDSA5_TPS_THRESH,'bdsa2Div',BDSA_2_TPS_TITLE,GMT_TIME_STR,TPS_STR,bdsa_graph_width,bdsa_graph_height,bdsa);
		/*
		let bdsa2_KPI_str = readTxtFile(BDSA2_TPS_KPI_PATH);
		var bdsa2_KPI_arr, bdsa2_KPI_len;
		[bdsa2_KPI_arr,bdsa2_KPI_len] = splitAndSpliceArr(bdsa2_KPI_str,"\n",0,12);
		var bdsa2_data = {
		  x: [],
		  y: [],
		  //type: 'scatter',
		};
		[bdsa2_data["x"],bdsa2_data["y"]] = appendToDict(bdsa2_KPI_arr,bdsa2_KPI_len,bdsa);
		var BDSA2_layout = genLayoutDict(BDSA2_TO_BDSA5_TPS_THRESH,BDSA_2_TPS_TITLE,GMT_TIME_STR,TPS_STR,bdsa_graph_width,bdsa_graph_height);
		var bdsa2_data_to_plot = [bdsa2_data];
		Plotly.newPlot('bdsa2Div', bdsa2_data_to_plot, BDSA2_layout, {showSendToCloud: true});
		*/
		//processing for bdsa3
		
		genTPSGraph(BDSA3_TPS_KPI_PATH,BDSA2_TO_BDSA5_TPS_THRESH,'bdsa3Div',BDSA_3_TPS_TITLE,GMT_TIME_STR,TPS_STR,bdsa_graph_width,bdsa_graph_height,bdsa);
		
		/*
		let bdsa3_KPI_str = readTxtFile(BDSA3_TPS_KPI_PATH);
		var bdsa3_KPI_arr, bdsa3_KPI_len;
		[bdsa3_KPI_arr,bdsa3_KPI_len] = splitAndSpliceArr(bdsa3_KPI_str,"\n",0,12);
		var bdsa3_data = {
		  x: [],
		  y: [],
		  //type: 'scatter',
		};
		[bdsa3_data["x"],bdsa3_data["y"]] = appendToDict(bdsa3_KPI_arr,bdsa3_KPI_len,bdsa);
		var BDSA3_layout = genLayoutDict(BDSA2_TO_BDSA5_TPS_THRESH,BDSA_3_TPS_TITLE,GMT_TIME_STR,TPS_STR,bdsa_graph_width,bdsa_graph_height);
		var bdsa3_data_to_plot = [bdsa3_data];
		Plotly.newPlot('bdsa3Div', bdsa3_data_to_plot, BDSA3_layout, {showSendToCloud: true});
		*/
		//processing for bdsa4
		
		genTPSGraph(BDSA4_TPS_KPI_PATH,BDSA2_TO_BDSA5_TPS_THRESH,'bdsa4Div',BDSA_4_TPS_TITLE,GMT_TIME_STR,TPS_STR,bdsa_graph_width,bdsa_graph_height,bdsa);
		
		/*
		let bdsa4_KPI_str = readTxtFile(BDSA4_TPS_KPI_PATH);
		var bdsa4_KPI_arr, bdsa4_KPI_len;
		[bdsa4_KPI_arr,bdsa4_KPI_len] = splitAndSpliceArr(bdsa4_KPI_str,"\n",0,12);
		var bdsa4_data = {
		  x: [],
		  y: [],
		  //type: 'scatter',
		};
		[bdsa4_data["x"],bdsa4_data["y"]] = appendToDict(bdsa4_KPI_arr,bdsa4_KPI_len,bdsa);
		var BDSA4_layout = genLayoutDict(BDSA2_TO_BDSA5_TPS_THRESH,BDSA_4_TPS_TITLE,GMT_TIME_STR,TPS_STR,bdsa_graph_width,bdsa_graph_height);
		var bdsa4_data_to_plot = [bdsa4_data];
		Plotly.newPlot('bdsa4Div', bdsa4_data_to_plot, BDSA4_layout, {showSendToCloud: true});
		*/
		//processing for bdsa5
		
		genTPSGraph(BDSA5_TPS_KPI_PATH,BDSA2_TO_BDSA5_TPS_THRESH,'bdsa5Div',BDSA_5_TPS_TITLE,GMT_TIME_STR,TPS_STR,bdsa_graph_width,bdsa_graph_height,bdsa);
		
		/*
		let bdsa5_KPI_str = readTxtFile(BDSA5_TPS_KPI_PATH);
		var bdsa5_KPI_arr, bdsa5_KPI_len;
		[bdsa5_KPI_arr,bdsa5_KPI_len] = splitAndSpliceArr(bdsa5_KPI_str,"\n",0,12);
		var bdsa5_data = {
		  x: [],
		  y: [],
		  //type: 'scatter',
		};
		[bdsa5_data["x"],bdsa5_data["y"]] = appendToDict(bdsa5_KPI_arr,bdsa5_KPI_len,bdsa);
		var BDSA5_layout = genLayoutDict(BDSA2_TO_BDSA5_TPS_THRESH,BDSA_5_TPS_TITLE,GMT_TIME_STR,TPS_STR,bdsa_graph_width,bdsa_graph_height);
		var bdsa5_data_to_plot = [bdsa5_data];
		Plotly.newPlot('bdsa5Div', bdsa5_data_to_plot, BDSA5_layout, {showSendToCloud: true});
		*/
		
		//processing for bdsa6
		
		genTPSGraph(BDSA6_TPS_KPI_PATH,BDSA6_TPS_THRESH,'bdsa6Div',BDSA_6_TPS_TITLE,GMT_TIME_STR,TPS_STR,bdsa_graph_width,bdsa_graph_height,bdsa);
		
		/*
		let bdsa6_KPI_str = readTxtFile(BDSA6_TPS_KPI_PATH);
		var bdsa6_KPI_arr, bdsa6_KPI_len;
		[bdsa6_KPI_arr,bdsa6_KPI_len] = splitAndSpliceArr(bdsa6_KPI_str,"\n",0,12);
		var bdsa6_data = {
		  x: [],
		  y: [],
		  //type: 'scatter',
		};
		[bdsa6_data["x"],bdsa6_data["y"]] = appendToDict(bdsa6_KPI_arr,bdsa6_KPI_len,bdsa);
		var BDSA6_layout = genLayoutDict(BDSA6_TPS_THRESH,BDSA_6_TPS_TITLE,GMT_TIME_STR,TPS_STR,bdsa_graph_width,bdsa_graph_height);
		var bdsa6_data_to_plot = [bdsa6_data];
		Plotly.newPlot('bdsa6Div', bdsa6_data_to_plot, BDSA6_layout, {showSendToCloud: true});
		*/
		
		//processing for bdsa7
		
		genTPSGraph(BDSA7_TPS_KPI_PATH,BDSA7_TPS_THRESH,'bdsa7Div',BDSA_7_TPS_TITLE,GMT_TIME_STR,TPS_STR,bdsa_graph_width,bdsa_graph_height,bdsa);
		/*
		let bdsa7_KPI_str = readTxtFile(BDSA7_TPS_KPI_PATH);
		var bdsa7_KPI_arr, bdsa7_KPI_len;
		[bdsa7_KPI_arr,bdsa7_KPI_len] = splitAndSpliceArr(bdsa7_KPI_str,"\n",0,12);
		var bdsa7_data = {
		  x: [],
		  y: [],
		  //type: 'scatter',
		};
		[bdsa7_data["x"],bdsa7_data["y"]] = appendToDict(bdsa7_KPI_arr,bdsa7_KPI_len,bdsa);
		var BDSA7_layout = genLayoutDict(BDSA7_TPS_THRESH,BDSA_7_TPS_TITLE,GMT_TIME_STR,TPS_STR,bdsa_graph_width,bdsa_graph_height);
		var bdsa7_data_to_plot = [bdsa7_data];
		Plotly.newPlot('bdsa7Div', bdsa7_data_to_plot, BDSA7_layout, {showSendToCloud: true});
		*/
	}
	
	
	
	//processing for all FDS
	if($('#FDS_TPS_KPI_body_portion').is(':visible'))
	{	
		//needed to ensure that correct graphs are shown upon refresh
		
		let fds_col_tag_selected = document.getElementById("COL_FDS_PER_PAGE");
		let fds_col_selectedValue = fds_col_tag_selected.options[fds_col_tag_selected.selectedIndex].value;

		var fds_graph_width = 1880 //(bdsa_col_selectedValue == "1")?1880:(bdsa_col_selectedValue == "2")?940:470;
		
		let fds_row_tag_selected = document.getElementById("ROW_FDS_PER_PAGE");
		let fds_row_selectedValue = fds_row_tag_selected.options[fds_row_tag_selected.selectedIndex].value;
		var fds_graph_height = (fds_row_selectedValue == "1")?680:(fds_row_selectedValue == "2")?340:210;
		
		
		let fds_tor_base = "fdstor00";
		i = 1;
		while(i<=NUM_OF_TOR_FDS)
		{
			let check_id = "";
			let fds_div_id = "";
			check_id = fds_tor_base + String(i) + "_on_off";
			fds_div_id = fds_tor_base + String(i) + "Div";
			dsToDisplay(check_id,fds_div_id);
			i++;
		}
		
		let fds_mtl_base = "fdsmtl00";
		i = 1;
		
		while(i<=NUM_OF_MTL_FDS)
		{
			let check_id = "";
			let fds_div_id = "";
			check_id = fds_mtl_base + String(i) + "_on_off";
			fds_div_id = fds_mtl_base + String(i) + "Div";
			dsToDisplay(check_id,fds_div_id);
			i++;
		}
		
		//TORONTO FDS Processing
		
		//processing for fdstor001
		
		genTPSGraph(FDSTOR001_TPS_KPI_PATH,5500,'fdstor001Div',FDSTOR001_TPS_TITLE,GMT_TIME_STR,TPS_STR,fds_graph_width,fds_graph_height,fds);
		
		/*
		let fdstor001_KPI_str = readTxtFile(FDSTOR001_TPS_KPI_PATH);
		var fdstor001_KPI_arr, fdstor001_KPI_len;
		[fdstor001_KPI_arr,fdstor001_KPI_len] = splitAndSpliceArr(fdstor001_KPI_str,"\n",0,12);
		var fdstor001_data = {
		  x: [],
		  y: [],
		  //type: 'scatter',
		};
		[fdstor001_data["x"],fdstor001_data["y"]] = appendToDict(fdstor001_KPI_arr,fdstor001_KPI_len,fds);
		var FDSTOR001_layout = genLayoutDict(6500,FDSTOR001_TPS_TITLE,GMT_TIME_STR,TPS_STR,fds_graph_width,fds_graph_height);
		var fdstor001_data_to_plot = [fdstor001_data];
		Plotly.newPlot('fdstor001Div', fdstor001_data_to_plot, FDSTOR001_layout, {showSendToCloud: true});
		*/
		
		//processing for fdstor002
		
		genTPSGraph(FDSTOR002_TPS_KPI_PATH,5500,'fdstor002Div',FDSTOR002_TPS_TITLE,GMT_TIME_STR,TPS_STR,fds_graph_width,fds_graph_height,fds);
		
		/*
		let fdstor002_KPI_str = readTxtFile(FDSTOR002_TPS_KPI_PATH);
		var fdstor002_KPI_arr, fdstor002_KPI_len;
		[fdstor002_KPI_arr,fdstor002_KPI_len] = splitAndSpliceArr(fdstor002_KPI_str,"\n",0,12);
		var fdstor002_data = {
		  x: [],
		  y: [],
		  //type: 'scatter',
		};
		[fdstor002_data["x"],fdstor002_data["y"]] = appendToDict(fdstor002_KPI_arr,fdstor002_KPI_len,fds);
		var FDSTOR002_layout = genLayoutDict(6500,FDSTOR002_TPS_TITLE,GMT_TIME_STR,TPS_STR,fds_graph_width,fds_graph_height);
		var fdstor002_data_to_plot = [fdstor002_data];
		Plotly.newPlot('fdstor002Div', fdstor002_data_to_plot, FDSTOR002_layout, {showSendToCloud: true});	
		*/
		
		//processing for fdstor003
		
		genTPSGraph(FDSTOR003_TPS_KPI_PATH,5000,'fdstor003Div',FDSTOR003_TPS_TITLE,GMT_TIME_STR,TPS_STR,fds_graph_width,fds_graph_height,fds);
		
		/*
		let fdstor003_KPI_str = readTxtFile(FDSTOR003_TPS_KPI_PATH);
		var fdstor003_KPI_arr, fdstor003_KPI_len;
		[fdstor003_KPI_arr,fdstor003_KPI_len] = splitAndSpliceArr(fdstor003_KPI_str,"\n",0,12);
		var fdstor003_data = {
		  x: [],
		  y: [],
		  //type: 'scatter',
		};
		[fdstor003_data["x"],fdstor003_data["y"]] = appendToDict(fdstor003_KPI_arr,fdstor003_KPI_len,fds);
		var FDSTOR003_layout = genLayoutDict(6500,FDSTOR003_TPS_TITLE,GMT_TIME_STR,TPS_STR,fds_graph_width,fds_graph_height);
		var fdstor003_data_to_plot = [fdstor003_data];
		Plotly.newPlot('fdstor003Div', fdstor003_data_to_plot, FDSTOR003_layout, {showSendToCloud: true});		
		*/
		
		//processing for fdstor004
		
		genTPSGraph(FDSTOR004_TPS_KPI_PATH,3500,'fdstor004Div',FDSTOR004_TPS_TITLE,GMT_TIME_STR,TPS_STR,fds_graph_width,fds_graph_height,fds);
		
		/*
		let fdstor004_KPI_str = readTxtFile(FDSTOR004_TPS_KPI_PATH);
		var fdstor004_KPI_arr, fdstor004_KPI_len;
		[fdstor004_KPI_arr,fdstor004_KPI_len] = splitAndSpliceArr(fdstor004_KPI_str,"\n",0,12);
		var fdstor004_data = {
		  x: [],
		  y: [],
		  //type: 'scatter',
		};
		[fdstor004_data["x"],fdstor004_data["y"]] = appendToDict(fdstor004_KPI_arr,fdstor004_KPI_len,fds);
		var FDSTOR004_layout = genLayoutDict(5000,FDSTOR004_TPS_TITLE,GMT_TIME_STR,TPS_STR,fds_graph_width,fds_graph_height);
		var fdstor004_data_to_plot = [fdstor004_data];
		Plotly.newPlot('fdstor004Div', fdstor004_data_to_plot, FDSTOR004_layout, {showSendToCloud: true});			
		*/


		//processing for fdstor005
				
		genTPSGraph(FDSTOR005_TPS_KPI_PATH,5000,'fdstor005Div',FDSTOR005_TPS_TITLE,GMT_TIME_STR,TPS_STR,fds_graph_width,fds_graph_height,fds);
		
		/*
		let fdstor005_KPI_str = readTxtFile(FDSTOR005_TPS_KPI_PATH);
		var fdstor005_KPI_arr, fdstor005_KPI_len;
		[fdstor005_KPI_arr,fdstor005_KPI_len] = splitAndSpliceArr(fdstor005_KPI_str,"\n",0,12);
		var fdstor005_data = {
		  x: [],
		  y: [],
		  //type: 'scatter',
		};
		[fdstor005_data["x"],fdstor005_data["y"]] = appendToDict(fdstor005_KPI_arr,fdstor005_KPI_len,fds);
		var FDSTOR005_layout = genLayoutDict(3500,FDSTOR005_TPS_TITLE,GMT_TIME_STR,TPS_STR,fds_graph_width,fds_graph_height);
		var fdstor005_data_to_plot = [fdstor005_data];
		Plotly.newPlot('fdstor005Div', fdstor005_data_to_plot, FDSTOR005_layout, {showSendToCloud: true});	
		*/

		//processing for fdstor006
						
		genTPSGraph(FDSTOR006_TPS_KPI_PATH,5000,'fdstor006Div',FDSTOR006_TPS_TITLE,GMT_TIME_STR,TPS_STR,fds_graph_width,fds_graph_height,fds);
		
		/*
		let fdstor006_KPI_str = readTxtFile(FDSTOR006_TPS_KPI_PATH);
		var fdstor006_KPI_arr, fdstor006_KPI_len;
		[fdstor006_KPI_arr,fdstor006_KPI_len] = splitAndSpliceArr(fdstor006_KPI_str,"\n",0,12);
		var fdstor006_data = {
		  x: [],
		  y: [],
		  //type: 'scatter',
		};
		[fdstor006_data["x"],fdstor006_data["y"]] = appendToDict(fdstor006_KPI_arr,fdstor006_KPI_len,fds);
		var FDSTOR006_layout = genLayoutDict(2500,FDSTOR006_TPS_TITLE,GMT_TIME_STR,TPS_STR,fds_graph_width,fds_graph_height);
		var fdstor006_data_to_plot = [fdstor006_data];
		Plotly.newPlot('fdstor006Div', fdstor006_data_to_plot, FDSTOR006_layout, {showSendToCloud: true});	
		*/
		
		//processing for fdstor007
								
		genTPSGraph(FDSTOR007_TPS_KPI_PATH,3000,'fdstor007Div',FDSTOR007_TPS_TITLE,GMT_TIME_STR,TPS_STR,fds_graph_width,fds_graph_height,fds);
		
		/*
		let fdstor007_KPI_str = readTxtFile(FDSTOR007_TPS_KPI_PATH);
		var fdstor007_KPI_arr, fdstor007_KPI_len;
		[fdstor007_KPI_arr,fdstor007_KPI_len] = splitAndSpliceArr(fdstor007_KPI_str,"\n",0,12);
		var fdstor007_data = {
		  x: [],
		  y: [],
		  //type: 'scatter',
		};
		[fdstor007_data["x"],fdstor007_data["y"]] = appendToDict(fdstor007_KPI_arr,fdstor007_KPI_len,fds);
		var FDSTOR007_layout = genLayoutDict(2000,FDSTOR007_TPS_TITLE,GMT_TIME_STR,TPS_STR,fds_graph_width,fds_graph_height);
		var fdstor007_data_to_plot = [fdstor007_data];
		Plotly.newPlot('fdstor007Div', fdstor007_data_to_plot, FDSTOR007_layout, {showSendToCloud: true});	
		*/
		
		//processing for fdstor008
										
		genTPSGraph(FDSTOR008_TPS_KPI_PATH,5000,'fdstor008Div',FDSTOR008_TPS_TITLE,GMT_TIME_STR,TPS_STR,fds_graph_width,fds_graph_height,fds);
		
		/*
		let fdstor008_KPI_str = readTxtFile(FDSTOR008_TPS_KPI_PATH);
		var fdstor008_KPI_arr, fdstor008_KPI_len;
		[fdstor008_KPI_arr,fdstor008_KPI_len] = splitAndSpliceArr(fdstor008_KPI_str,"\n",0,12);
		var fdstor008_data = {
		  x: [],
		  y: [],
		  //type: 'scatter',
		};
		[fdstor008_data["x"],fdstor008_data["y"]] = appendToDict(fdstor008_KPI_arr,fdstor008_KPI_len,fds);
		var FDSTOR008_layout = genLayoutDict(2500,FDSTOR008_TPS_TITLE,GMT_TIME_STR,TPS_STR,fds_graph_width,fds_graph_height);
		var fdstor008_data_to_plot = [fdstor008_data];
		Plotly.newPlot('fdstor008Div', fdstor008_data_to_plot, FDSTOR008_layout, {showSendToCloud: true});	
		*/
		

		//MONTREAL FDS Processing	

		//processing for fdsmtl001
												
		genTPSGraph(FDSMTL001_TPS_KPI_PATH,5500,'fdsmtl001Div',FDSMTL001_TPS_TITLE,GMT_TIME_STR,TPS_STR,fds_graph_width,fds_graph_height,fds);
		
		/*
		let fdsmtl001_KPI_str = readTxtFile(FDSMTL001_TPS_KPI_PATH);
		var fdsmtl001_KPI_arr, fdsmtl001_KPI_len;
		[fdsmtl001_KPI_arr,fdsmtl001_KPI_len] = splitAndSpliceArr(fdsmtl001_KPI_str,"\n",0,12);
		var fdsmtl001_data = {
		  x: [],
		  y: [],
		  //type: 'scatter',
		};
		[fdsmtl001_data["x"],fdsmtl001_data["y"]] = appendToDict(fdsmtl001_KPI_arr,fdsmtl001_KPI_len,fds);
		var FDSMTL001_layout = genLayoutDict(6500,FDSMTL001_TPS_TITLE,GMT_TIME_STR,TPS_STR,fds_graph_width,fds_graph_height);
		var fdsmtl001_data_to_plot = [fdsmtl001_data];
		Plotly.newPlot('fdsmtl001Div', fdsmtl001_data_to_plot, FDSMTL001_layout, {showSendToCloud: true});
		*/


		//processing for fdsmtl002
														
		genTPSGraph(FDSMTL002_TPS_KPI_PATH,5500,'fdsmtl002Div',FDSMTL002_TPS_TITLE,GMT_TIME_STR,TPS_STR,fds_graph_width,fds_graph_height,fds);
		
		/*
		let fdsmtl002_KPI_str = readTxtFile(FDSMTL002_TPS_KPI_PATH);
		var fdsmtl002_KPI_arr, fdsmtl002_KPI_len;
		[fdsmtl002_KPI_arr,fdsmtl002_KPI_len] = splitAndSpliceArr(fdsmtl002_KPI_str,"\n",0,12);
		var fdsmtl002_data = {
		  x: [],
		  y: [],
		  //type: 'scatter',
		};
		[fdsmtl002_data["x"],fdsmtl002_data["y"]] = appendToDict(fdsmtl002_KPI_arr,fdsmtl002_KPI_len,fds);
		var FDSMTL002_layout = genLayoutDict(6500,FDSMTL002_TPS_TITLE,GMT_TIME_STR,TPS_STR,fds_graph_width,fds_graph_height);
		var fdsmtl002_data_to_plot = [fdsmtl002_data];
		Plotly.newPlot('fdsmtl002Div', fdsmtl002_data_to_plot, FDSMTL002_layout, {showSendToCloud: true});
		*/

		//processing for fdsmtl003
																
		genTPSGraph(FDSMTL003_TPS_KPI_PATH,5000,'fdsmtl003Div',FDSMTL003_TPS_TITLE,GMT_TIME_STR,TPS_STR,fds_graph_width,fds_graph_height,fds);
		/*
		let fdsmtl003_KPI_str = readTxtFile(FDSMTL003_TPS_KPI_PATH);
		var fdsmtl003_KPI_arr, fdsmtl003_KPI_len;
		[fdsmtl003_KPI_arr,fdsmtl003_KPI_len] = splitAndSpliceArr(fdsmtl003_KPI_str,"\n",0,12);
		var fdsmtl003_data = {
		  x: [],
		  y: [],
		  //type: 'scatter',
		};
		[fdsmtl003_data["x"],fdsmtl003_data["y"]] = appendToDict(fdsmtl003_KPI_arr,fdsmtl003_KPI_len,fds);
		var FDSMTL003_layout = genLayoutDict(6500,FDSMTL003_TPS_TITLE,GMT_TIME_STR,TPS_STR,fds_graph_width,fds_graph_height);
		var fdsmtl003_data_to_plot = [fdsmtl003_data];
		Plotly.newPlot('fdsmtl003Div', fdsmtl003_data_to_plot, FDSMTL003_layout, {showSendToCloud: true});
		*/

		//processing for fdsmtl004
																		
		genTPSGraph(FDSMTL004_TPS_KPI_PATH,3500,'fdsmtl004Div',FDSMTL004_TPS_TITLE,GMT_TIME_STR,TPS_STR,fds_graph_width,fds_graph_height,fds);
		
		/*
		let fdsmtl004_KPI_str = readTxtFile(FDSMTL004_TPS_KPI_PATH);
		var fdsmtl004_KPI_arr, fdsmtl004_KPI_len;
		[fdsmtl004_KPI_arr,fdsmtl004_KPI_len] = splitAndSpliceArr(fdsmtl004_KPI_str,"\n",0,12);
		var fdsmtl004_data = {
		  x: [],
		  y: [],
		  //type: 'scatter',
		};
		[fdsmtl004_data["x"],fdsmtl004_data["y"]] = appendToDict(fdsmtl004_KPI_arr,fdsmtl004_KPI_len,fds);
		var FDSMTL004_layout = genLayoutDict(5000,FDSMTL004_TPS_TITLE,GMT_TIME_STR,TPS_STR,fds_graph_width,fds_graph_height);
		var fdsmtl004_data_to_plot = [fdsmtl004_data];
		Plotly.newPlot('fdsmtl004Div', fdsmtl004_data_to_plot, FDSMTL004_layout, {showSendToCloud: true});
		*/


		//processing for fdsmtl005
																				
		genTPSGraph(FDSMTL005_TPS_KPI_PATH,5000,'fdsmtl005Div',FDSMTL005_TPS_TITLE,GMT_TIME_STR,TPS_STR,fds_graph_width,fds_graph_height,fds);
		
		/*
		let fdsmtl005_KPI_str = readTxtFile(FDSMTL005_TPS_KPI_PATH);
		var fdsmtl005_KPI_arr, fdsmtl005_KPI_len;
		[fdsmtl005_KPI_arr,fdsmtl005_KPI_len] = splitAndSpliceArr(fdsmtl005_KPI_str,"\n",0,12);
		var fdsmtl005_data = {
		  x: [],
		  y: [],
		  //type: 'scatter',
		};
		[fdsmtl005_data["x"],fdsmtl005_data["y"]] = appendToDict(fdsmtl005_KPI_arr,fdsmtl005_KPI_len,fds);
		var FDSMTL005_layout = genLayoutDict(3500,FDSMTL005_TPS_TITLE,GMT_TIME_STR,TPS_STR,fds_graph_width,fds_graph_height);
		var fdsmtl005_data_to_plot = [fdsmtl005_data];
		Plotly.newPlot('fdsmtl005Div', fdsmtl005_data_to_plot, FDSMTL005_layout, {showSendToCloud: true});
		*/
		
		//processing for fdsmtl006
																						
		genTPSGraph(FDSMTL006_TPS_KPI_PATH,5000,'fdsmtl006Div',FDSMTL006_TPS_TITLE,GMT_TIME_STR,TPS_STR,fds_graph_width,fds_graph_height,fds);
		
		/*
		let fdsmtl006_KPI_str = readTxtFile(FDSMTL006_TPS_KPI_PATH);
		var fdsmtl006_KPI_arr, fdsmtl006_KPI_len;
		[fdsmtl006_KPI_arr,fdsmtl006_KPI_len] = splitAndSpliceArr(fdsmtl006_KPI_str,"\n",0,12);
		var fdsmtl006_data = {
		  x: [],
		  y: [],
		  //type: 'scatter',
		};
		[fdsmtl006_data["x"],fdsmtl006_data["y"]] = appendToDict(fdsmtl006_KPI_arr,fdsmtl006_KPI_len,fds);
		var FDSMTL006_layout = genLayoutDict(2500,FDSMTL006_TPS_TITLE,GMT_TIME_STR,TPS_STR,fds_graph_width,fds_graph_height);
		var fdsmtl006_data_to_plot = [fdsmtl006_data];
		Plotly.newPlot('fdsmtl006Div', fdsmtl006_data_to_plot, FDSMTL006_layout, {showSendToCloud: true});
		*/
		
		//processing for fdsmtl007
																								
		genTPSGraph(FDSMTL007_TPS_KPI_PATH,3500,'fdsmtl007Div',FDSMTL007_TPS_TITLE,GMT_TIME_STR,TPS_STR,fds_graph_width,fds_graph_height,fds);
		
		/*
		let fdsmtl007_KPI_str = readTxtFile(FDSMTL007_TPS_KPI_PATH);
		var fdsmtl007_KPI_arr, fdsmtl007_KPI_len;
		[fdsmtl007_KPI_arr,fdsmtl007_KPI_len] = splitAndSpliceArr(fdsmtl007_KPI_str,"\n",0,12);
		var fdsmtl007_data = {
		  x: [],
		  y: [],
		  //type: 'scatter',
		};
		[fdsmtl007_data["x"],fdsmtl007_data["y"]] = appendToDict(fdsmtl007_KPI_arr,fdsmtl007_KPI_len,fds);
		var FDSMTL007_layout = genLayoutDict(2000,FDSMTL007_TPS_TITLE,GMT_TIME_STR,TPS_STR,fds_graph_width,fds_graph_height);
		var fdsmtl007_data_to_plot = [fdsmtl007_data];
		Plotly.newPlot('fdsmtl007Div', fdsmtl007_data_to_plot, FDSMTL007_layout, {showSendToCloud: true});
		*/
		
		//processing for fdsmtl008
																										
		genTPSGraph(FDSMTL008_TPS_KPI_PATH,5000,'fdsmtl008Div',FDSMTL008_TPS_TITLE,GMT_TIME_STR,TPS_STR,fds_graph_width,fds_graph_height,fds);
		
		/*
		let fdsmtl008_KPI_str = readTxtFile(FDSMTL008_TPS_KPI_PATH);
		var fdsmtl008_KPI_arr, fdsmtl008_KPI_len;
		[fdsmtl008_KPI_arr,fdsmtl008_KPI_len] = splitAndSpliceArr(fdsmtl008_KPI_str,"\n",0,12);
		var fdsmtl008_data = {
		  x: [],
		  y: [],
		  //type: 'scatter',
		};
		[fdsmtl008_data["x"],fdsmtl008_data["y"]] = appendToDict(fdsmtl008_KPI_arr,fdsmtl008_KPI_len,fds);
		var FDSMTL008_layout = genLayoutDict(2500,FDSMTL008_TPS_TITLE,GMT_TIME_STR,TPS_STR,fds_graph_width,fds_graph_height);
		var fdsmtl008_data_to_plot = [fdsmtl008_data];
		Plotly.newPlot('fdsmtl008Div', fdsmtl008_data_to_plot, FDSMTL008_layout, {showSendToCloud: true});
		*/
	}
}

//this function will trigger every 30 seconds regardless of whether or not its triggered by the html
setInterval( function(){ 
    var minutes = new Date().getMinutes();
	var modBy = 2;
	var toUpdate = (minutes%modBy == 0)? true:false; 
	//console.log(minutes)
	//console.log(toUpdate)
    if (toUpdate) {
        genTPSKPIGraph(); 
    }
} , 30000);


//this function will trigger every 5 minutes regardless of whether or not its triggered by the html
setInterval( function(){ 

	let fds = "fds";
	let bdsa = "bdsa";
	
	//need to call a function here to read all FDS/BDSA FILES, PROCESS, THEN determine if threshold has been surpassed, then write it to a file
	
	let above_tps_thres_arr = [];
	
	//BDSA2 processing, index = 0
	
	above_tps_thres_arr.push(isDSAaboveThreshold(BDSA2_TPS_KPI_PATH,BDSA2_TO_BDSA5_TPS_THRESH,bdsa));
	
	//BDSA3 processing, index = 1
	
	above_tps_thres_arr.push(isDSAaboveThreshold(BDSA3_TPS_KPI_PATH,BDSA2_TO_BDSA5_TPS_THRESH,bdsa));
	
	//BDSA4 processing, index = 2
	
	above_tps_thres_arr.push(isDSAaboveThreshold(BDSA4_TPS_KPI_PATH,BDSA2_TO_BDSA5_TPS_THRESH,bdsa));
	
	//BDSA5 processing, index = 3
	
	above_tps_thres_arr.push(isDSAaboveThreshold(BDSA5_TPS_KPI_PATH,BDSA2_TO_BDSA5_TPS_THRESH,bdsa));

	//BDSA6 processing, index = 4
	
	above_tps_thres_arr.push(isDSAaboveThreshold(BDSA6_TPS_KPI_PATH,BDSA6_TPS_THRESH,bdsa));
	
	//BDSA7 processing, index = 5
	
	above_tps_thres_arr.push(isDSAaboveThreshold(BDSA7_TPS_KPI_PATH,BDSA7_TPS_THRESH,bdsa));
	
	
	//FDSTOR001 processing, index = 6
	
	above_tps_thres_arr.push(isDSAaboveThreshold(FDSTOR001_TPS_KPI_PATH,5500,fds));
	
	//FDSTOR002 processing, index = 7
	
	above_tps_thres_arr.push(isDSAaboveThreshold(FDSTOR002_TPS_KPI_PATH,5500,fds));
	
	//FDSTOR003 processing, index = 8
	
	above_tps_thres_arr.push(isDSAaboveThreshold(FDSTOR003_TPS_KPI_PATH,5000,fds));
	
	//FDSTOR004 processing, index = 9
	
	above_tps_thres_arr.push(isDSAaboveThreshold(FDSTOR004_TPS_KPI_PATH,3500,fds));
	
	//FDSTOR005 processing, index = 10
	
	above_tps_thres_arr.push(isDSAaboveThreshold(FDSTOR005_TPS_KPI_PATH,5000,fds));
	
	//FDSTOR006 processing, index = 11
	
	above_tps_thres_arr.push(isDSAaboveThreshold(FDSTOR006_TPS_KPI_PATH,5000,fds));
					
	//FDSTOR007 processing, index = 12
	
	above_tps_thres_arr.push(isDSAaboveThreshold(FDSTOR007_TPS_KPI_PATH,3000,fds));
	
	//FDSTOR008 processing, index = 13

	above_tps_thres_arr.push(isDSAaboveThreshold(FDSTOR008_TPS_KPI_PATH,5000,fds));

	//MONTREAL FDS Processing	

	//FDSMTL001 processing, index = 14
	
	above_tps_thres_arr.push(isDSAaboveThreshold(FDSMTL001_TPS_KPI_PATH,5500,fds));

	//FDSMTL002 processing, index = 15
	
	above_tps_thres_arr.push(isDSAaboveThreshold(FDSMTL002_TPS_KPI_PATH,5500,fds));
		
	//FDSMTL003 processing, index = 16
	
	above_tps_thres_arr.push(isDSAaboveThreshold(FDSMTL003_TPS_KPI_PATH,5000,fds));

	//FDSMTL004 processing, index = 17
	
	above_tps_thres_arr.push(isDSAaboveThreshold(FDSMTL004_TPS_KPI_PATH,3500,fds));
		
	//FDSMTL005 processing, index = 18
	
	above_tps_thres_arr.push(isDSAaboveThreshold(FDSMTL005_TPS_KPI_PATH,5000,fds));
		
	//FDSMTL006 processing, index = 19
	
	above_tps_thres_arr.push(isDSAaboveThreshold(FDSMTL006_TPS_KPI_PATH,5000,fds));
	
	//FDSMTL007 processing, index = 20
	
	above_tps_thres_arr.push(isDSAaboveThreshold(FDSMTL007_TPS_KPI_PATH,3500,fds));
	
	//processing for fdsmtl008, index = 21
	
	above_tps_thres_arr.push(isDSAaboveThreshold(FDSMTL008_TPS_KPI_PATH,5000,fds));
	
	//alert(above_tps_thres_arr);
	
	let isAboveTPS = above_tps_thres_arr.includes(true);
	
	if(isAboveTPS)
		ajaxPost("OW_NDS_TPS_status",'above');
	//Would need to do file cleaning here
	else
		ajaxPost("clr_NDS_TPS_status",'');
	

} , 30000);//300000
