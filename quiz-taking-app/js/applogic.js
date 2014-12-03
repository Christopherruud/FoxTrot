var mainWindow, quizWindow;

function openWin() {
	mainWindow = window.open("/", "mainNavigationWindow", "width=250",
			"height=250", "location=yes");
	quizWindow = window.open("quiz.html", "quizPanel", "width=250, height=250",
	"location=yes");
	if (!quizWindow || quizWindow.closed
			|| typeof quizWindow.closed == 'undefined') {
		// First Checking Condition Works For IE & Firefox
		// Second Checking Condition Works For Chrome
		alert("Popup Blocker is enabled! Please add this site to your exception list.");
	} else {
		quizWindow.resizeTo(400, screen.height);
		mainWindow.resizeTo(screen.width - 400, screen.height);
		quizWindow.moveTo(screen.width - 400, 100);
		mainWindow.moveTo(0, 100);
		quizWindow.focus();
	}

}
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

function getCourseData(isInModule) {
	console.log(isInModule + "martin er her i getCourse");
	var location = window.location.host;
	// console.log(location);
	console.log("ELLÅ TRIGGER");
	if (location == 'localhost:8000') {
		console.log("TRIGGER");
		$.getJSON("http://inf5750-7.uio.no/api/systemSettings/quizKey",
				function(data) {
			console.log(data);
			populateCourseData(data);
		});

	} else {
		var result = $.getJSON("/api/systemSettings/quizKey", function(data) {
			populateCourseData(data, isInModule);

		});
	}
}

//variant function for populating the course-table with data from json if
//exists.
//This is the one you can use to iterate through the data
var courses = [];

function populateCourseData(json, isInModule) {
	console.log("console.log(json)");
	console.log(json);

	for (var s = 0; s < json.length; s++) {
		var course = json[s];
		course = explodeJSON(course);
		// Name
		var tempCourse = new Course(course.domain);
		tempCourse.level = course.level;
		tempCourse.id = course.id;
		tempCourse.nextCourse = course.nextCourse;
		tempCourse.descriptiveText = course.descriptiveText;
		tempCourse.modules = [];

		courses.push(tempCourse);

		

		// Modules
	
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
		}
		
	}
	//finnes populate
	if(typeof populate == 'function'){
		populate(courses, isInModule);	
	}
}


//TODO - add logic for reading and writing to and from usersettings and the
//datastructure therein.

//lifted from the demo - used to turn json notation into js object...
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
		type : "POST",
		contentType : "text/plain",
		url : "/api/systemSettings/quizKey",
		data : jsonString,
		success : function(data) {
			// lolno
		},
		dataType : "text"
	});

}