
var moduleHtml = 'partials/module.html';


var select = document.getElementById('RaceDropDown');
var courseNumber = 1;
//dette er hvor vi kan legge inn data i en array så vi kan manipulere den i for løkka under
var courses = ["HowToDHIS", "Change The Layout"];
var i;
var btn;

function populate(){
	for (i = 0; i < courses.length; i++) {

		btn = document.createElement("BUTTON");        // Create a <button> element
		var t = document.createTextNode(courses[i] + " " + courseNumber);// Create a text node
		btn.appendChild(t);                                // Append the text to <button>
		document.body.appendChild(btn);                    // Append <button> to <body>

		//document.getElementById(btn).addEventListener("click", hey);
		courseNumber++;

	}
}

function hey (){
	document.write("Hey baby");
}

function getModulesToCourse(){
	document.write("hey baby baby");
}