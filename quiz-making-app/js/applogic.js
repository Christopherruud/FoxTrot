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
    this.domain = domain;
    var level, id, nextCourse, descriptiveText;
    var modules = [];
}

/**
 *
 * @param level
 *            the ID of the course this module belongs to
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
    $.getJSON("/api/systemSettings/quizKey", function (data) {

        populateCourseData(data);

    });

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
    // console.log("console.log(courses) before stringify");
    // console.log(courses);
    // jsonAlexander(courses);
}
// function for messing about with JSON
function jsonAlexander(json) {

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

function postTestData(json) {
    var jsonString = JSON.stringify(json);
    $.ajax({
        type: "POST",
        contentType: "text/plain",
        url: "/api/systemSettings/quizTestKey",
        data: jsonString,
        success: function (data) {
            //lolno
        },
        dataType: "text"
    });

}