/**
 * Initialize variables and updates database. 
 * All functions and variables are declared here. They are 
 * used/called from the index.html file (making)
 */

/**
 * 
 * @param domain
 *            the name of the area (domain) the course represents. Acts as the
 *            name of the course.
 */

function Course(domain) {
	var domain;
	this.domain = domain;
	var level, id, nextCourse, descriptiveText;
	var modules = [];
}

/**
 * 
 * @param courseId
 *            the ID of the course this module belongs to
 */

function Module(level) {
	var moduleName, moduleId, level;
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
	$.getJSON("/api/systemSettings/quizKey", function(data) {
		populateCourseData(data);
		// jsonAlexander(data);
	});

}

// variant function for populating the course-table with data from json if
// exists.
function populateCourseData(json) {
	$('#courseTable').empty(); // empties the coursedata -table before
	// initializing
	console.log("console.log(json)");
	console.log(json);
	var courses = [];

	for (var s = 0; s < json.courses.length; s++) {
		var course = json.courses[s];
		course = explodeJSON(course);
		var tableString = "<tr>";
		// Name
		var tempcourse = new Course(course.domain);
		tempcourse.level = course.level;
		tempcourse.id = course.id;
		tempcourse.nextCourse = course.nextCourse;
		tempcourse.descriptiveText = course.descriptiveText;
		tempcourse.modules = [];

		courses.push(tempcourse);

		tableString += "<td>" + course.domain + "</td>";

		// Modules
		tableString += "<td>";
		for (var c = 0; c < course.modules.length; c++) {
			var module = course.modules[c];
			module = explodeJSON(module);

			var tempmodule = new Module(course.level);
			tempmodule.moduleName = module.moduleName;
			tempmodule.moduleId = module.moduleId;
			tempmodule.tests = [];

			courses[s].modules.push(tempmodule);

			for (var f = 0; f < module.tests.length; f++) {
				var test = module.tests[f];
				test = explodeJSON(test);

				var temptest = new Test(module.moduleID);

				temptest.question = test.question
				temptest.answer = test.answer;
				temptest.alternatives = test.alternatives.slice();
				courses[s].modules[c].tests.push(temptest);
			}

			tableString += module.moduleName + ' ';
		}
		tableString += '</td>';
		tableString += '</tr>';
		$('#courseTable').append(tableString);
	}
	console.log("console.log(courses)");
	console.log(courses);
}
var quizData

// function for posting and parsing the json object
function jsonAlexander(json) {
	console.log(typeof json);
	console.log(json);

}

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