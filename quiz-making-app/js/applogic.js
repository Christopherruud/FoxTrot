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

function Module(courseId) {
	var moduleName, moduleId, parentId;
	this.parentId = courseId;
	var test = [];

}

/**
 * 
 * @param moduleId
 *            the ID of the module this course belongs to
 */
function Test(moduleId) {
	var testId;
	this.testId = moduleId;
	var question;
	var answer;
}

function getCourseData() {
	// $.getJSON("/api/systemSettings/quizKey", populateCourseData(data));
	var json = [ { "domain" : "testdomain",
		"modules" : [ {
			"moduleName" : "1",
			"id" : 1
		}, {
			"moduleName" : "2",
			"id" : 2
		}, {
			"moduleName" : "3",
			"id" : 3
		}, {
			"moduleName" : "4",
			"id" : 4
		} ]
	} ];
	populateCourseData(json);
}

// variant function for populating the course-table with data from json if
// exists.
function populateCourseData(json) {
	$('#courseTable').empty(); // empties the coursedata -table before
								// initializing

	for (var s = 0; s < json.length; s++) {
		var course = json[s];
		course = explodeJSON(course);
		var tableString = "<tr>";
		console.log('Course');
		console.log(course);
		// Name
		tableString += "<td>" + course.domain + "</td>";

		// Courses
		tableString += "<td>";
		for (var c = 0; c < course.modules.length; c++) {
			var module = course.modules[c];
			modules = explodeJSON(module);
			tableString += module.moduleName + ' ';
		}
		tableString += '</td>';
		tableString += '</tr>';
		$('#courseTable').append(tableString);
	}

}

// lifted from the demo - used to turn json notation into js object...
var objectStorage = new Object();

function explodeJSON(object) {
	if (object instanceof Object == true) {
		objectStorage[object['@id']] = object;
		console.log('Object is object');
	} else {
		console.log('Object is not object');
		object = objectStorage[object];
		console.log(object);
	}
	console.log(object);
	return object;
}