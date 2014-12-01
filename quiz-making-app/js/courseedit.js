$(document)
		.ready(
				function() {

					$("#add")
							.click(
									function() {
										$("#table1")
												.append(
														'<tr valign="top"><td width="100px" align="center">'
																+ (++currentId)
																+ '</td><td            width="100px">'
																+ $("#domain")
																		.val()
																+ '</td><td width="100px" align="center">'
																+ $("#level")
																		.val()
																+ '</td><td width="100px" align="center">'
																+ $(
																		"#descriptiveText")
																		.val()
																+ '</td><td width="100px" align="center">'
																+ $("#module")
																		.val()
																+ '</td><td width="100px" align="center"> <a href="javascript:void(0);" class="remCF">Remove</a><td width="100px" align="center"><a href="moduleedit.html">Create modules</a></td></tr>');
										addToCourseList($("#domain").val(), $(
												"#level").val(), currentId, $(
												"#descriptiveText").val());

									});

					$("#table1").on('click', '.remCF', function() {
						$(this).parent().parent().remove();
					});
				});

function addToCourseList(domain, level, id, descriptiveText) {
	var tempcourse = new Course(domain, level, id, descriptiveText);
	tempcourse.level = level;
	tempcourse.id = id;
	tempcourse.descriptiveText = descriptiveText;
	courses.push(tempcourse);
	postTestData(courses);
}

/**
 *
 * @param domain
 *            the name of the area (domain) the course represents. Acts as the
 *            name of the course.
 */

function Course(domain) {
	this.domain = domain;
	var level, id, descriptiveText;
	var modules = [];
}

/**
 *
 * @param level
 *            the level of the course this module belongs to
 */

function Module(level) {
	var moduleName, moduleId, moduleDescriptiveText, moduleMotivation; //motivation: why is this valuable
	this.level = level;
	var tests = [];

}

/**
 *
 * @param moduleId
 *            the ID of the module this course belongs to
 */
function Test(moduleId) {
	var parentModule;
	this.parentModule = moduleId;
	var question;
	var answer;
	var alternatives = [];
}

function getCourseData() {
	$.getJSON("/api/systemSettings/quizKey", function (data) {


	}).done(function (data) {

		populateCourseData(data);
	});

}

var courses = [];
var currentId = 0;

function populateCourseData(json) {
	var courseTable = $('#courseTable');

	for (var s = 0; s < json.length; s++) {
		var course = json[s];
		course = explodeJSON(course);
		var tableString = "<tr>";
		// Name
		var tempCourse = new Course(course.domain);
		tempCourse.level = course.level;
		tempCourse.id = course.id;
		currentId = course.id;
		tempCourse.descriptiveText = course.descriptiveText;
		tempCourse.modules = [];

		courses.push(tempCourse);

		tableString += '<td width="100px" align="center">' + course.id
		+ "</td>";
		tableString += '<td width="100px" align="center">' + course.domain
		+ "</td>";
		tableString += '<td width="100px" align="center">' + course.level
		+ "</td>";
		tableString += '<td width="100px" align="center">'
		+ course.descriptiveText + "</td>";

		// Modules

		if (undefined != course.modules) {
			tableString += '<td width="100px" align="center">'
			+ course.modules.length + "</td>";
			tableString += "<td>";

			for (var c = 0; c < course.modules.length; c++) {
				var module = course.modules[c];
				module = explodeJSON(module);

				var tempModule = new Module(course.level);
				tempModule.moduleName = module.moduleName;
				tempModule.moduleId = module.moduleId;
				tempModule.moduleDescriptiveText = module.moduleDescriptiveText;
				tempModule.moduleMotivation = module.moduleMotivation;
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

				// tableString += module.moduleName + ' ';
			}
		} else {
			tableString += "<td>";
		}

		var moduleEdit = "moduleedit.html";
		moduleEdit += "?course=" + course.id;
		tableString += '</td><td><a href="javascript:void(0);"class="remCF">Remove</a></td><td><a href="' + moduleEdit + '">Create modules</a></td>';
		tableString += '</tr>';
		$("#table1").append(tableString);
	}
	if (typeof parseURL == 'function') {
		var moduleCourseId = parseURL();
	}
	if (typeof populateModuleData == 'function') {
		populateModuleData(courses, moduleCourseId);
	}
}

var objectStorage = new Object();

function explodeJSON(object) {
	if (object instanceof Object == true) {
		objectStorage[object['@id']] = object;

	} else {
		//console.log('Object is not object');
		object = objectStorage[object];
		//console.log(object);
	}
	//console.log(object);
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
			// lolno
		},
		dataType: "text"
	});

}

function postTestData(json) {
	var jsonString = JSON.stringify(json);
	$.ajax({
		type: "POST",
		contentType: "text/plain",
		url: "/api/systemSettings/quizTestKey",
		data: jsonString,
		success: function (data) {
			// lolno
		},
		dataType: "text"
	});

}

