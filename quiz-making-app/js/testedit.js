var courseNumber = 0;
var moduleCounter = 0;
var moduleLevel = 0;
var table3 = $("#table3");


$(document).ready(function () {
    parseURL();
    getCourseData();
    $("#add").click(function () {
        table3.append
        ('<tr valign="top"><td width="100px" align="center">'
        + $("#question").val() + '</td><td width="200px">'
        + $("#answer").val() + '</td><td width="150px">'
        + $("#alt1").val() + '</td><td width="150px" align="center">'
        + $("#alt2").val() + '</td><td width="150px" align="center">'
        + $("#alt3").val() + '</td><td width="150px" align="center"><a href="javascript:void(0);" class="remCF">Remove</a></td> <td><td width="100px" align="center"></td></tr>');
    var tempArray = [$("#alt1").val(), $("#alt2").val(), $("#alt3").val()];
    addTestToModule(moduleCounter,$("#question").val(), $("#answer").val(),tempArray );
    });

    table3.on('click', '.remCF', function () {
        $(this).parent().parent().remove();
    });
});
//adds the TEST - data to the HTML
function populateTestData() {
    var module = courses[courseNumber].modules[moduleCounter];
    moduleLevel = module.level;
    if (typeof(module.tests[0]) != 'undefined') {
        for (var y = 0; y < module.tests.length; y++) {
            var table3String = '<tr valign="top">';
            var test = module.tests[y];
            table3String += '<td width="200px">'
            + test.question + "</td>";
            table3String += '<td width="150px">'
            + test.answer + "</td>";
            var counter;
            for (var g = 0; g < test.alternatives.length; g++) {
                var alternative = test.alternatives[g];
                counter = g;
                table3String += '<td width="150px" align="center">'
                + alternative + "</td>";

            }
            if (counter < 2) {
                if (counter < 1) {
                    table3String += '<td width="150px" align="center">""</td>'
                }

                table3String += '<td width="150px" align="center">""</td>'
            }
            table3String += '<td width="150px" align="center"><a href="javascript:void(0);"class="remCF">Remove</a></td><td width="100px" align="center"></td>';
            table3String += '</tr>';
            table3.append(table3String);
        }
    }


}

//adds the test to the datastructure, then POST it to API
function addTestToModule(parent, question, answer, alternatives) {
    var tempTest = new Test(parent);
    tempTest.question = question;
    tempTest.answer = answer;
    tempTest.alternatives = alternatives.slice();
    courses[courseNumber].modules[moduleCounter].tests.push(tempTest);
    postCourseData(courses);


}

//read the current URL, parses it for URL varables.
function parseURL() {
    courseNumber = getQueryVariable("course");
    moduleCounter = getQueryVariable("module")
}

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return (false);
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

//GET json data from the API
function getCourseData() {
    $.getJSON("/api/systemSettings/quizKey", function (data) {


    }).done(function (data) {

        populateCourseData(data);
    });

}

//populates the Course - data so that it can be read and written via javascript calls.

var courses = [];
var currentId = 0;

function populateCourseData(json) {
    courses = [];
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

        if (undefined != course.modules) {


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


            }

        }



    }
    populateTestData();
}

//checks if the JSON data consists of OBJECTS or something else
var objectStorage = new Object();

function explodeJSON(object) {
    if (object instanceof Object == true) {
        objectStorage[object['@id']] = object;

    } else {

        object = objectStorage[object];

    }

    return object;
}

//POST the datastructure to the API
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

//Function for posting to a TEST-key to prevent disruption of production data
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