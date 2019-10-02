//The purpose of this file is to generate a table "on the fly"
//A table will only generate if there are any alarms to show
var globalVariable = {
	x: 1
};

const DATE_OLD_TO_NEW = "Date (oldest to newest)";
const DATE_NEW_TO_OLD = "Date (newest to oldest)";
const GENERIC_COND_A_TO_Z = "Generic Condition (A to Z)";
const GENERIC_COND_Z_TO_A = "Generic Condition (Z to A)";
const SEVERITY_A_TO_Z = "Severity (A to Z)";
const SEVERITY_Z_TO_A = "Severity (Z to A)";
const AFFECTED_HOSTS_A_TO_Z = "Affected Hosts (A to Z)";
const AFFECTED_HOSTS_Z_TO_A = "Affected Hosts (Z to A)";
const ALARM_TEXT_A_TO_Z = "Alarm text (A to Z)";
const ALARM_TEXT_Z_TO_A = "Alarm text (Z to A)";
const INST_COUNT_MOST_TO_LEAST = "Instance count (most to least)";
const INST_COUNT_LEAST_TO_MOST = "Instance count (least to most)";

function createErrorTable() 
{	
	var table = document.getElementById("myTable");
	table.deleteRow(1);
	//var test3 = [0,2,4,6,1,3,5,7];
	//test3 = mergeSort(test3);
	//alert(test3);
	//both these variables needed to find out what the GUI user wants to sort data by
	//data
	
	var FunctionToCall = 'outputFilterFile';
	
	var txtToFilter = 'test'; //this variable will be used to read data from something the user inputs
	$.ajax({
		type: "POST",
		url: 'http://10.55.105.249/SDM_BackEnd/Filter.php',
		dataType: 'json',
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
	
	
	var tag_selected = document.getElementById("Alarm Sorting");
	var selectedValue = tag_selected.options[tag_selected.selectedIndex].value;
	//This works, provided its within the loop/mount check places 


	//NOTE WITHOUT ANY ADDED ROWS INTO THE TABLE, THE BASE ROWS = 2 ... You can delete this down to 1 at the beginning of this loop
	//Then keep it such that you delete every row except for row 0 everytime you recreate the table
	
	setInterval(function()
	{
		//need to add this here so that the selectedValue is constantly updated
		selectedValue = tag_selected.options[tag_selected.selectedIndex].value;
	    if(selectedValue===DATE_OLD_TO_NEW)
		{
			alert("here");
			//myClass.Filter("this is a test");
			//myClass.writeTxtFile();
			alert("HERE2");
		}
	
	
	
	}, 5000); //this is a very useful line for performing an action over and over again (e.g.: reading a file)
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	/*
	//obviously the 2 conditions will have to be changed 
	if (true)
	{
	  
	  cell1.innerHTML = "https://www.w3schools.com gkfgklfdsjglkslkfdhglkjfdgs dghfdskjglhfdgslkjhfdgkjlfdhskgjfdshgkfdghfds";
	  table.insertRow(2).insertCell(0).innerHTML = "https://www.w3schools.com";
	  var cells = row.getElementsByTagName("td"); // needed to split the cells up into an array
	  	  //this portion of the code is needed to seperate the URL attached (on click) to the cells (i.e.: this will attach it to cell 1)
	  //table.deleteRow(2);
	  //table.deleteRow(1);
	  
	  $(cells[0]).click(function()
	  {

		// Perform your action on click here, like redirecting to a new url
		window.location='http://google.com';
	  });
	  
	}
	
	
	else
	{
	  return;
	}
	globalVariable.x = 2;
	*/
	//var test = true;
	//exports.test;
}




// Split the array into halves and merge them recursively 
function mergeSort (arr, fieldToSort) {
  if (arr.length === 1) {
    // return once we hit an array with a single item
    return arr
  }

  const middle = Math.floor(arr.length / 2) // get the middle item of the array rounded down
  const left = arr.slice(0, middle) // items on the left side
  const right = arr.slice(middle) // items on the right side

  return merge(
    mergeSort(left,fieldToSort),
    mergeSort(right, fieldToSort), 
	fieldToSort
  )
}

// compare the arrays item by item and return the concatenated result
function merge (left, right, fieldToSort) {
  let result = []
  let indexLeft = 0
  let indexRight = 0

  while (indexLeft < left.length && indexRight < right.length) 
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
	
	
	
	
	//Sort by Instance Count Most to Least
	if(fieldToSort === INST_COUNT_MOST_TO_LEAST)
	{
		if (left[indexLeft].split("|")[13] < right[indexRight].split("|")[13]) {
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
		if (left[indexLeft].split("|")[13] > right[indexRight].split("|")[13]) {
		  result.push(left[indexLeft])
		  indexLeft++
		} else {
		  result.push(right[indexRight])
		  indexRight++
		}
		//alert("Sort by Instance Count Least to Most");
	}
	
	
	
	
	
  }
  
  
  
  
  

  
  
  

  return result.concat(left.slice(indexLeft)).concat(right.slice(indexRight))
}

