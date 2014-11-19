
var moduleHtml = 'partials/module.html';


var select = document.getElementById('RaceDropDown');
var courseNumber = 1;
//dette er hvor vi kan legge inn data i en array så vi kan manipulere den i for løkka under
var courses = ["HowToDHIS", "Change The Layout"];
var i;


function populate(){
	for (i = 0; i < courses.length; i++) {

		var btn = document.createElement("BUTTON");        // Create a <button> element
		btn.textContent=courses[i] + " " + courseNumber;            
		document.body.appendChild(btn);                    // Append <button> to <body>

		btn.addEventListener("click", getModule);
		courseNumber++;

	}
}
//henter ut modul html når man trykker på en knapp. Må sende
//med ting her fra tilhørende modul til gitt kurs
function getModule(){
	window.location = "module.html";
	//VIKTIG om vi vil ha en "one page app"
	/*$.ajax({
		  url: "module.html",
		  context: document.body
		}).done(function(response) {
		  $( this ).addClass( "done" );
		  console.log(response);
		});
*/	
}

function hey (){
	document.write("Hey baby");
}

function getModulesToCourse(){
	document.write("hey baby baby");
}