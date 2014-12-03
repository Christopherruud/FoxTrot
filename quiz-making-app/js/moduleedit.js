var courseNumber = 0;
var moduleCounter = 0;
var moduleLevel = 0;
var table2 = $("#table2");
$(document).ready(
    function () {
        getCourseData();
        $("#add").click(
            function () {
                table2.append(
                    '<tr valign="top"><td width="100px" align="center">'
                    + (++moduleCounter)
                    + '</td><td width="100px" align="center">'
                    + (moduleLevel)
                    + '</td><td width="100px" align="center">'
                    + $("#name").val()
                    + '</td><td width="100px" align="center">'
                    + $("#descriptiveText").val()
                    + '</td><td width="100px" align="center">'
                    + $("#motivationalText").val()
                    + '</td><td width="100px" align="center">'
                    + ("none")
                    + '</td><td width="100px" align="center"><a href="javascript:void(0);" class="remCF">Remove</a></td>'
                    + '<td width="100px" align="center"><a href="testedit.html?course='
                    + courseNumber + '&module=' + moduleCounter
                    + '">Create test</a></td></tr>');
                addModuleToCourse(moduleLevel, $("#name").val(), $("#descriptiveText").val(), $("#motivationalText").val(), moduleCounter);
            });

        $("#table2").on('click', '.remCF', function () {
            $(this).parent().parent().remove();
        });
    });
function populateModuleData() {
    var course = courses[courseNumber];
    moduleLevel = course.level;
    if (course.modules != 'undefined') {
        for (var y = 0; y < course.modules.length; y++) {
            var table2String = '<tr valign="top">';
            var module = course.modules[y];
            table2String += '<td width="100px" align="center">'
            + module.moduleId + "</td>";
            moduleCounter = module.moduleId;
            table2String += '<td width="100px" align="center">'
            + module.level + "</td>";
            table2String += '<td width="100px" align="center">'
            + module.moduleName + "</td>";
            table2String += '<td width="100px" align="center">'
            + module.moduleDescriptiveText + "</td>";
            table2String += '<td width="100px" align="center">'
            + module.moduleMotivation + "</td>";
            if (module.tests != 'undefined') {
                table2String += '<td width="100px" align="center">'
                + module.tests.length + "</td>";
            } else {
                // table2String += '</td>';
            }
            table2String += '<td width="100px" align="center"><a href="javascript:void(0);" class="remCF">Remove</a></td>'
            + '<td width="100px" align="center"><a href="testedit.html?course='
            + courseNumber + '&module=' + moduleCounter
            + '">Create test</a></td>';
            table2String += '</tr>';
            table2.append(table2String);
        }
    }


}

function addModuleToCourse(level, moduleName, moduleDescriptiveText, moduleMotivationalText, moduleId) {
    var tempModule = new Module(level);
    tempModule.moduleDescriptiveText = moduleDescriptiveText;
    tempModule.moduleId = moduleId;
    tempModule.moduleMotivation = moduleMotivationalText;
    tempModule.moduleName = moduleName;
    console.log(courses);
    courses[courseNumber].modules.push(tempModule);
    postTestData(courses);


}

function parseURL() {
    courseNumber = getQueryVariable("course");
    return courseNumber;
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

function getCourseData() {
    $.getJSON("/api/systemSettings/quizKey", function (data) {


    }).done(function (data) {

        populateCourseData(data);
    });

}

var courses = [];
var currentId = 0;

function populateCourseData(json) {

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


            }
        }
    }
    parseURL();
    populateModuleData();
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