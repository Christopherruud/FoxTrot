//This method is used for opening up the QUIZ - window and the WORKING-window into two separate halves of the window
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
        mainWindow.focus();
        quizWindow.focus();
    }

}


//Class-declaration for data instanciation
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

//reads from JSON
function getCourseData(isInModule) {

    var location = window.location.host;
    // console.log(location);

    var result = $.getJSON("/api/systemSettings/quizKey", function (data) {
        populateCourseData(data, isInModule);

    });

}

//variant function for populating the course-table with data from json if
//exists.
//This is the one you can use to iterate through the data
var courses = [];
var testProgress = [];

//populates Course Data - and should also draw a table for test progress -
//TODO finish writing test progress table - lacks drawing table, then coloring in fields that are failed or passed
function populateCourseData(json, isInModule) {

    var table = $("#progressList");

    for (var s = 0; s < json.length; s++) {
        var course = json[s];
        course = explodeJSON(course);
        // Name
        var tableList = '<tr>';
        var tempCourse = new Course(course.domain);
        tempCourse.level = course.level;
        tempCourse.id = course.id;
        currentId = course.id;
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


    //finnes populate
    if (typeof populate == 'function') {
        populate(courses, isInModule);
    }
}
//lifted from the demo - used to turn json notation into js object...
var objectStorage = new Object();

function explodeJSON(object) {
    if (object instanceof Object == true) {
        objectStorage[object['@id']] = object;
    } else {
        object = objectStorage[object];
    }
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


//GET's results from the API
(function getResults() {

    $.getJSON("/api/userSettings/quizResults", function (data) {


    }).done(function (data) {

        populateTempResultData(data);
    });

})();

//helper - Method for populating the test - data used for drawing a table for test progress

function populateTempResultData(json) {


    for (var s = 0; s < json.length; s++) {
        var result = json[s];
        result = explodeJSON(result);

        var tempResult = new Result();
        tempResult.courseId = result.courseId;
        tempResult.moduleId = result.moduleId;
        tempResult.testResults = result.testResults.slice();
        testProgress.push(tempResult);
    }
}