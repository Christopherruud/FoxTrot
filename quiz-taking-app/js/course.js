//getCourseData();

//var moduleHtml = 'partials/module.html';
//var select = document.getElementById('RaceDropDown');
var courseNumber = 0;
// dette er hvor vi kan legge inn data i en array så vi kan manipulere den i for
// løkka under

// setter opp knapper etter ønske
function populate(courses, isInModule) {
	console.log(courses);

	for ( var Course in courses) {
		var courseElement = courses[Course];
		console.log(courseElement);
		var btn; // Create a <button> element
		if (isInModule == false) {
			btn = document.createElement("BUTTON");
			btn.textContent = courseElement.domain + " " + courseNumber;
			document.body.appendChild(btn); // Append <button> to <body>

			btn.addEventListener("click", function() {
				console.log("CheckEvent");
				console.log(courseElement.modules);
				//dette kommer ikke til å skje
				getModule(courseElement.modules, courseElement.id, isInModule);
				courseNumber++;
			});
		}
		// document.write(courseElement.descriptiveText);
		//her må det skje noe

	}

}
// henter ut modul html når man trykker på en knapp. Må sende
// med ting her fra tilhørende modul til gitt kurs
function getModule(element, courseId, isInModule) {
	console.log(element);
	var moduleArray = [];
	var id = courseId;
	console.log(id);
	moduleArray = element;
	console.log(moduleArray);

	setModules(moduleArray, id, isInModule);

}

// window.location = "module.html";
// VIKTIG om vi vil ha en "one page app"
/*
 * $.ajax({ url: "module.html", context: document.body
 * }).done(function(response) { $( this ).addClass( "done" );
 * console.log(response); });
 */
