/* function main() { */
// hide the table
$("#table").hide();

// tabs are not collapsible
$("#col_table").tabs({collapsible: false});

// variables for slide buttons
var min_Col_Button_Clicked = false;
var max_Col_Button_Clicked = false;
var min_Row_Button_Clicked = false;
var max_Row_Button_Clicked = false;

// iterators for sliders
var tab_Iterator = 1;
var t_Num = 1;
var check_Iterator = 1;

$(document).ready(function () {
	//  valid form using JQuery validation
	$("#form").validate({
		// declare error class
		errorClass: "error",
		// set of rules for 4 input elements in HTML
		rules: {
			min_col: {
				// required for input
				required: true,
				// cannot have whitespace
				nowhitespace: true,
				// must be a number
				number: true,
				// integer range
				range: [-50, 50],
				// only integers
				onlyIntegers: true,
				// error case for if min_col > max_col
				minColIsLarger: true,
			},
			max_col: {
				required: true,
				nowhitespace: true,
				number: true,
				range: [-50, 50],
				onlyIntegers: true,
				// error case for if min_col > max_col
				maxColIsLarger: true,
			},
			min_row: {
				required: true,
				nowhitespace: true,
				number: true,
				range: [-50, 50],
				onlyIntegers: true,
				// error case for if min_row > max_row
				minRowIsLarger: true,
			},
			max_row: {
				required: true,
				nowhitespace: true,
				number: true,
				range: [-50, 50],
				onlyIntegers: true,
				// error case for if min_row > max_row
				maxRowIsLarger: true,
			},
		},
		// submit button pressed
		submitHandler: function () {
			// get input values
			var input = getInputValues();
			// generate table
			generateTable(input);
		},
	});

	// Error if the min column value is too high
	$.validator.addMethod(
		"minColIsLarger",
		function (value) {
			// get input values
			var input = getInputValues();
			// return bool of max_Col >= min_Col
			return parseInt(input.max_Col[0]) >= parseInt(value);
		},
		// the output string when false
		" The minimum column value is too high."
	);

	// Error if the max column value is too low
	$.validator.addMethod(
		"maxColIsLarger",
		function (value) {
			// get input values
			var input = getInputValues();
			// return bool of min_Col <= max_Col
			return parseInt(input.min_Col[0]) <= parseInt(value);
		},
		// the output string when false
		" The maximum column value too low."
	);

	// Error if the min row value is too high
	$.validator.addMethod(
		"minRowIsLarger",
		function (value) {
			// get input values
			var input = getInputValues();
			// return bool of max_Row >= min_Row
			return parseInt(input.max_Row[0]) >= parseInt(value);
		},
		// the output string when false
		" The minimum row value is too high."
	);

	// Error if the max row value is too low
	$.validator.addMethod(
		"maxRowIsLarger",
		function (value) {
			// get input values
			var input = getInputValues();
			// return bool of min_Row <= max_Row
			return parseInt(input.min_Row[0]) <= parseInt(value);
		},
		// the output string when false
		" The maximum row value is too low."
	);

	// Error if a decimal point is entered
	$.validator.addMethod(
		"onlyIntegers",
		function (value) {
			// return the inverse of if input value has a '.'
			return !value.includes(".");
		},
		// the output string when false
		" Only integers allowed, no decimals."
	);

	// sliders code: minimum column slider
	var min_Col_Slider = {
		min: -51,
		max: 51,
		value: 0,
		animate: "fast",
		slide: function () {
			$("#col_table").tabs("option", "active", 0);
			var input = getInputValues();

			input.min_Col[0] = $("#min_Col_Slider").slider("value");
			$("#min_col").val(input.min_Col[0]);
			min_Col_Button_Clicked = true;
			submitForm(input);
		},
	};
	// arrow key(s) input for minimum column slider
	$("#min_col").keyup(function () {
		$("#col_table").tabs("option", "active", 0);
		var input = getInputValues();

		$("#min_Col_Slider").slider("option", "active", input.min_Col[0]);
		if (isNaN(input.min_Col[0])) {
			$("#min_Col_Slider").slider("option", "active", 0);
		}
		min_Col_Button_Clicked = true;
		submitForm(input);
	});

	// sliders code: maximum column slider
	var max_Col_Slider = {
		min: -51,
		max: 51,
		value: 0,
		animate: "fast",
		slide: function () {
			$("#col_table").tabs("option", "active", 0);
			var input = getInputValues();

			input.max_Col[0] = $("#max_Col_Slider").slider("value");
			$("#max_col").val(input.max_Col[0]);
			max_Col_Button_Clicked = true;
			submitForm(input);
		},
	};
	// arrow key(s) input for maximum column slider
	$("#max_col").keyup(function () {
		$("#col_table").tabs("option", "active", 0);
		var input = getInputValues();

		$("#max_Col_Slider").slider("option", "active", input.max_Col[0]);
		if (isNaN(input.max_Col[0])) {
			$("#max_Col_Slider").slider("option", "active", 0);
		}
		max_Col_Button_Clicked = true;
		submitForm(input);
	});

	// sliders code: minimum row slider
	var min_Row_Slider = {
		min: -51,
		max: 51,
		value: 0,
		animate: "fast",
		slide: function () {
			$("#col_table").tabs("option", "active", 0);
			var input = getInputValues();

			input.min_Row[0] = $("#min_Row_Slider").slider("value");
			$("#min_row").val(input.min_Row[0]);
			min_Row_Button_Clicked = true;
			submitForm(input);
		},
	};
	// arrow key(s) input for minimum row slider
	$("#min_row").keyup(function () {
		$("#col_table").tabs("option", "active", 0);
		var input = getInputValues();

		$("#min_Row_Slider").slider("option", "active", input.min_Row[0]);
		if (isNaN(input.min_Row[0])) {
			$("#min_Row_Slider").slider("option", "active", 0);
		}
		min_Row_Button_Clicked = true;
		submitForm(input);
	});

	// sliders code: maximum row slider
	var max_Row_Slider = {
		min: -51,
		max: 51,
		value: 0,
		animate: "fast",
		slide: function () {
			$("#col_table").tabs("option", "active", 0);
			var input = getInputValues();

			input.max_Row[0] = $("#max_Row_Slider").slider("value");
			$("#max_row").val(input.max_Row[0]);
			max_Row_Button_Clicked = true;
			submitForm(input);
		},
	};
	// arrow key(s) input for maximum row slider 
	$("#max_row").keyup(function () {
		$("#col_table").tabs("option", "active", 0);
		var input = getInputValues();

		$("#max_Row_Slider").slider("option", "active", input.max_Row[0]);
		if (isNaN(input.max_Row[0])) {
			$("#max_Row_Slider").slider("option", "active", 0);
		}
		max_Row_Button_Clicked = true;
		submitForm(input);
	});

	// pairing up the sliders
	$("#min_Col_Slider").slider(min_Col_Slider);
	$("#max_Col_Slider").slider(max_Col_Slider);
	$("#min_Row_Slider").slider(min_Row_Slider);
	$("#max_Row_Slider").slider(max_Row_Slider);

	// the "Delete Selected Tabs" button
	$("#btn-delete")
		.tabs()
		.on("click", function () {
			var tabs_Children = $("#col_table").contents().filter("div");
			var n = parseInt(
				$(tabs_Children[tabs_Children.length - 1])
					.attr("id")
					.substring(4)
			);

			// iterate through list of current divs
			for (let i = 1; i < n + 1; i++) {
				// if box is checked
				if ($("#check" + parseInt(i)).is(":checked")) {
					// delete divs
					$("#tab-" + i).remove();
					// along with it's li elements
					$("#li" + i).remove();
					$("#col_table").tabs("refresh");
					$("#col_table").tabs("option", "active", 0);
				}
			}
			$("#col_table").tabs("refresh");
		});
	
	// "Save Table" submit button
	$("#submit").on("click", function () {
		if ($("#form").valid()) {
			var input = getInputValues();
			let saved_Table = generateTable(input);

			// clone current table, to save in the new tab
			saved_Table = saved_Table.cloneNode(true);

			saved_Table.id = "t" + t_Num;
			t_Num++;

			var tab_Num_1 = "#tab-" + tab_Iterator;
			var tab_Num_2 = "tab-" + tab_Iterator;
			var check_ID = "check" + parseInt(check_Iterator);
			var li_ID = "li" + parseInt(check_Iterator);

			// new "li" string
			var new_li = $("<li id='" + li_ID + "'><a href=" + "'" + tab_Num_1 + "'" + ">C[" + input.min_Col[0] + ", " + input.max_Col[0] + "] R[" + input.min_Row[0] + ", " + input.max_Row[0] + "]</a><input type='checkbox' id='" + check_ID + "'></input></li>");

			// appends to main_div when new tab is created
			$(new_li).appendTo("ul");

			var new_Div = $("<div id=" + "'" + tab_Num_2 + "'" + "></div>");
			$(new_Div).appendTo("div#col_table");
			$(new_Div).html(saved_Table);

			// after new table appended, refresh the tabs and set active ones
			$("#col_table").tabs("refresh");
			$("#col_table").tabs("option", "active", parseInt(tab_Iterator) - 1);

			if (parseInt($("#col_table").contents().filter("div").length) === 1) {
				$("#col_table").tabs("option", "active", 0);
			}
			tab_Iterator++;
			check_Iterator++;
		}
	});
});

// creates dynamic multiplication table
function getInputValues() {
	// get the min_col element
	var min_Col_Element = document.getElementById("min_col");
	// get the min_col value
	var min_Col_Value = parseInt(document.getElementById("min_col").value);

	// get the max_col element
	var max_Col_Element = document.getElementById("max_col");
	// get the max_col value
	var max_Col_Value = parseInt(document.getElementById("max_col").value);

	// get the min_row element
	var min_Row_Element = document.getElementById("min_row");
	// get the min_row value
	var min_Row_Value = parseInt(document.getElementById("min_row").value);

	// get the max_row value
	var max_Row_Element = document.getElementById("max_row");
	// get the max_row value
	var max_Row_Value = parseInt(document.getElementById("max_row").value);

	// defining "input" "dictionary"
	var input = {
		min_Col: [min_Col_Value, min_Col_Element],
		max_Col: [max_Col_Value, max_Col_Element],
		min_Row: [min_Row_Value, min_Row_Element],
		max_Row: [max_Row_Value, max_Row_Element],
	};

	// return input
	return input;
}

// take validated input, generate the table
function generateTable(input) {
	// delete the old table
	var table = document.getElementById("table");
	table.remove();

	// creates new HTML table
	var table_Parent_Div = document.getElementById("col_table");
	var new_Table = document.createElement("table");
	// assign new_Table's id to "table"
	new_Table.id = "table";
	// append the table to the div
	table_Parent_Div.appendChild(new_Table);

	// create table head and body
	var new_Table_Head = document.createElement("thead");
	var new_Table_Body = document.createElement("tbody");
	// add table head and body to table
	new_Table.appendChild(new_Table_Head);
	new_Table.appendChild(new_Table_Body);

	// create table row
	var new_Table_Row = document.createElement("tr");
	// add table row to table
	new_Table_Head.appendChild(new_Table_Row);

	// create table head
	var new_Table_Head = document.createElement("th");
	// add table head to table
	new_Table_Row.appendChild(new_Table_Head);
	var new_Table_Head = document.createElement("th");
	new_Table_Row.appendChild(new_Table_Head);

	// pair together the table's head and body, add to table
	var table_Head_table_Body_Pair = document.getElementById("table").children;
	var table_Head = table_Head_table_Body_Pair[0];
	var table_Row_Collection = table_Head.children;

	// pair together the column, add to table
	var table_Col_Headers = table_Row_Collection[0].children;
	table_Col_Headers[1].innerHTML = input.min_Col[0];

	// populate the top row + column headers
	// traverse from the minimum column value to the maximum column value
	for (var i = input.min_Col[0] + 1; i <= input.max_Col[0]; i++) {
		// create a new table head
		var new_Table_Head = document.createElement("th");
		// create a text node
		var text_Node = document.createTextNode(i);
		// add text node to table head
		new_Table_Head.appendChild(text_Node);
		// add table column to table's row collection
		table_Row_Collection[0].appendChild(new_Table_Head);
	}

	// traverse from minimum row value to maximum row value
	for (var j = input.min_Row[0]; j <= input.max_Row[0]; j++) {
		// create a new row
		var new_Table_Row = document.createElement("tr");
		// add to table
		table_Head_table_Body_Pair[1].appendChild(new_Table_Row);
		// create last table's row
		var last_Table_Row = table_Head_table_Body_Pair[1].lastElementChild;
		// create new table head
		var new_Table_Head = document.createElement("th");

		var text_Node = document.createTextNode(j);
		new_Table_Head.appendChild(text_Node);
		last_Table_Row.appendChild(new_Table_Head);

		// populate in the row
		// traverse from minimum column value to maximum column value
		for (var x = input.min_Col[0]; x <= input.max_Col[0]; x++) {
			// fill in the row
			var new_Table_d = document.createElement("td");
			var text_Node = document.createTextNode(x * j);
			new_Table_d.appendChild(text_Node);
			// add to row
			last_Table_Row.appendChild(new_Table_d);
		}
	}
	$("div#main_tab").html(new_Table);
	// display Column[minimum, maximum], Row[minimum, maximum] to
	$("a#main_a").html("C[" + input.min_Col[0] + ", " + input.max_Col[0] + "] R [" + input.min_Row[0] + ", " + input.max_Row[0] + "]");
	return new_Table;
}

// if any slider buttons clicked, submit values to form
// also checks to make sure some value is eneted into the input boxes (ie can't "submit" with empty boxes)
function submitForm(input) {
	if (min_Col_Button_Clicked && max_Col_Button_Clicked && min_Row_Button_Clicked && max_Row_Button_Clicked) {
		$("#form").submit();
	}
}
