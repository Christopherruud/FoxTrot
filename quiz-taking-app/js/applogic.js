var mainWindow, quizWindow;

function openWin() {
	mainWindow = window.open("/", "mainNavigationWindow", "width=250",
			"height=250", "location=yes");
	quizWindow = window.open("quiz.html", "quizPanel", "width=250, height=250", "location=yes");
	quizWindow.resizeTo(400, screen.height);
	mainWindow.resizeTo(screen.width - 400, screen.height);
	quizWindow.moveTo(screen.width - 400, 100);
	mainWindow.moveTo(0, 100);
	quizWindow.focus();
}

setTimeout(
		function() {
			if (!quizWindow || quizWindow.outerHeight === 0) {
				// First Checking Condition Works For IE & Firefox
				// Second Checking Condition Works For Chrome
				alert("Popup Blocker is enabled! Please add this site to your exception list.");
			} else {
				// Popup Blocker Is Disabled
				window.open('', '_self');
				window.close();
			}
		}, 25);

//check if variable is initialized, otherwize initialize it. 

//hent info fra Making course
/**
 *
 * @param domain
 *            the name of the area (domain) the course represents. Acts as the
 *            name of the course.
 */

function Course(domain) {
	this.domain = domain;
	var level, id, nextCourse, descriptiveText;
	var modules = [];
}

/**
 *
 * @param level
 *            the level of the course this module belongs to
 */

function Module(level) {
	var moduleName, moduleId;
	this.level = level;
	var tests = [];

}

/**
 *
 * @param moduleId
 *            the ID of the module this course belongs to
 */
function Test(moduleId) {
	var parent;
	this.parent = moduleId;
	var question;
	var answer;
	var alternatives = [];
}

function getCourseData() {
	var result = $.getJSON("/api/systemSettings/quizKey", function (data) {

		//populateCourseData(data);
		return data;
	});
	return result;
}

// variant function for populating the course-table with data from json if
// exists.
var courses = [];

function populateCourseData(json) {
	var courseTable = $('#courseTable');
	courseTable.empty(); // empties the coursedata -table before
	// initializing
	console.log("console.log(json)");
	console.log(json);

	for (var s = 0; s < json.length; s++) {
		var course = json[s];
		course = explodeJSON(course);
		var tableString = "<tr>";
		// Name
		var tempCourse = new Course(course.domain);
		tempCourse.level = course.level;
		tempCourse.id = course.id;
		tempCourse.nextCourse = course.nextCourse;
		tempCourse.descriptiveText = course.descriptiveText;
		tempCourse.modules = [];

		courses.push(tempCourse);

		tableString += "<td>" + course.domain + "</td>";

		// Modules
		tableString += "<td>";
		for (var c = 0; c < course.modules.length; c++) {
			var module = course.modules[c];
			module = explodeJSON(module);

			var tempModule = new Module(course.level);
			tempModule.moduleName = module.moduleName;
			tempModule.moduleId = module.moduleId;
			tempModule.tests = [];

			courses[s].modules.push(tempModule);

			for (var f = 0; f < module.tests.length; f++) {
				var test = module.tests[f];
				test = explodeJSON(test);

				var tempTest = new Test(module.moduleID);

				tempTest.question = test.question;
				tempTest.answer = test.answer;
				tempTest.alternatives = test.alternatives.slice();
				courses[s].modules[c].tests.push(tempTest);
			}

			tableString += module.moduleName + ' ';
		}
		tableString += '</td>';
		tableString += '</tr>';
		courseTable.append(tableString);
	}
	// jsonAlexander(courses);
}
// function for messing about with JSON
function jsonAlexander(json) {

}

//TODO - add logic for reading and writing to and from usersettings and the datastructure therein.


// lifted from the demo - used to turn json notation into js object...
var objectStorage = new Object();

function explodeJSON(object) {
	if (object instanceof Object == true) {
		objectStorage[object['@id']] = object;
		// console.log('Object is object');
	} else {
		console.log('Object is not object');
		object = objectStorage[object];
		console.log(object);
	}
	console.log(object);
	return object;
}

function postCourseData(json) {
	var jsonString = JSON.stringify(json);
	$.ajax({
		type: "POST",
		contentType: "text/plain",
		url: "/api/systemSettings/quizKey",
		data: jsonString,
		success: function (data) {
			//lolno
		},
		dataType: "text"
	});

}