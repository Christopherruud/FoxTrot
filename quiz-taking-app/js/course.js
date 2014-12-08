//getCourseData();

//var moduleHtml = 'partials/module.html';
//var select = document.getElementById('RaceDropDown');

//dette er hvor vi kan legge inn data i en array så vi kan manipulere den i for
//løkka under

//setter opp knapper etter ønske
function populate(courses, isInModule) {
	if(courses != null){
		for (var Course in courses) {
			var courseElement = courses[Course];

			var btn; // Create a <button> element
			if (isInModule == false) {
				btn = document.createElement("BUTTON");
				btn.textContent = "Level " + courseElement.level + ": " + courseElement.domain;
				document.body.appendChild(btn); // Append <button> to <body>

				btn.addEventListener("click", function() {

					getModule(courseElement.modules, courseElement.id, isInModule);
				});
			}  else {
				getModule(courseElement.modules, courseElement.id, true);
			}

		}
	}else{
		document.write("No courses admitted");
	}
}
//henter ut modul html når man trykker på en knapp. Må sende
//med ting her fra tilhørende modul til gitt kurs
function getModule(element, courseId, isInModule) {
	var moduleArray = [];
	var tempId = courseId;

	moduleArray = element;

	setModules(moduleArray, tempId, isInModule);

}