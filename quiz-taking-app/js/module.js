console.log("loading.module");

var moduleNumber = 0;
//var id;
var modules = [];
var idCourse;
var currentCourse;
var currentModule;
var results = [];

function Result() {

    var courseId;
    var moduleId;
    var testResults = [];
}


function setModules(array, courseId, isInModule) {
	console.log(array);
	modules = array;

	console.log(modules);
	idCourse = courseId;

	populateModule(isInModule);
}

//vi må diskutere om dette er måten vi vil velge for å populere siden med valg (knapper)
function populateModule(isInModule) {
	console.log(isInModule, " utenfor modul");

	for (var Module in modules) {

		console.log(Module);

		console.log(courses[idCourse].modules[Module].moduleId);

        //Hvis vi er inne i riktig modul
        if (isInModule) {
            //kan putte dette i en egen FUNCTION
            parseURL();
            console.log(isInModule + " i modul");

			var testElements = courses[currentCourse].modules[currentModule].tests;
			var nr = 1;


			//testElements.forEach(function(test){
			console.log(testElements);
			var btn = document.createElement("BUTTON");
			btn.textContent = "Test " + nr;
			document.body.appendChild(btn);
			//her sender vi med testen fra modulet
			btn.addEventListener("click", function () {
				setTest(testElements)
			});
			//test er nok ikke noe
			nr++;
			break;

		} else {
			//addInfo(courses[idCourse].modules[Module].moduleId);
			var moduleElement = courses[idCourse].modules[Module].moduleName;
			var btn = document.createElement("BUTTON");        // Create a <button> element

			var urlString = "module.html";
			urlString += '?course=' + idCourse;
			urlString += '&module=' + courses[idCourse].modules[Module].moduleId;
			console.log(urlString);

			btn.textContent = moduleElement + " " + moduleNumber;

			document.body.appendChild(btn);                    // Append <button> to <body>

			//id = moduleElement.moduleId;


			//setter riktig URL til Modul man skal inn i
			(function (urlString) {
				btn.addEventListener("click", function () {
					window.location = urlString
				});
			})(urlString);


			moduleNumber++;
		}


	}

}

//setter opp spørsmålene i HTML
function setTest(sporsmol) {
    //console.log(sporsmol);
    var spm = sporsmol;
    //console.log(spm);
    var setup = document.getElementById("newtest");

    //riktig svar må taes vare på
    //var answers = [];

    //for å ta vare på alle alternativer og teste på svar
    var qu = document.getElementById("questions");

    for (var i = 0; i < spm.length; i++) {

        //legger inn svar. kun et svar pr spm
        //answers[i] = spm[i].answer;

        //lager hvert enkelt spm i wrapper hvert spm får en id man søke på.
        var question = document.createElement("div");
        question.setAttribute("id", "question" + i);
        question.setAttribute("class", "question");

        //lager en ny div for å putte alternativer i.
        var alternatives = document.createElement("div");
        alternatives.setAttribute("class", "alternatives");

        //spm tekst
        var questionElement = document.createElement("P");
        questionElement.innerHTML = spm[i].question;
        questionElement.setAttribute("class", "question-text");
        question.appendChild(questionElement);


        //MANGLER MÅTE Å GODKJENNE PÅ!
        //mangler å sjekke riktig svar!
        //mangler lagre funksjon
        //lenger ned er det to funksjoner i progress som kan brukes?

        //svar
        var answerElement = document.createElement("input");
        var answer = document.createElement("label");
        answerElement.setAttribute("type", "radio");
        answerElement.setAttribute("name", "group" + i);

        //burde være en lik id for alle riktige svar
        //flere submittknapper pr alternativ liste
        answerElement.setAttribute("id", "radio_correct_" + i);

        answerElement.setAttribute("value", spm[i].answer);
        answer.innerHTML = spm[i].answer;
        answer.setAttribute("for", "radio_" + i + "_");
        alternatives.appendChild(answerElement);
        alternatives.appendChild(answer);

        answerElement.innerHTML = spm[i].answer;
        //genererer alternativer til spm / radio btn.
        for (var j = 0; j < spm[i].alternatives.length; j++) {
            //kan wrappe alternatives med radio buttons
            var alternativeElement = document.createElement("input");
            //lager tekst for hver input dvs tekst på alternativene
            var alternativeElementLabel = document.createElement("label");

            //fester radio buttons
            alternativeElement.setAttribute("type", "radio");
            alternativeElement.setAttribute("name", "group" + i);

            //her får hver radio btn en id
            alternativeElement.setAttribute("id", "radio_" + i + "_" + j);//skal være unik

            //setter verdi for å vise tekst?
            alternativeElement.setAttribute("value", spm[i].alternatives[j]);

            alternativeElementLabel.innerHTML = spm[i].alternatives[j];
            alternativeElementLabel.setAttribute("for", "radio_" + i + "_" + j);

            //fester elementene til html
            alternatives.appendChild(alternativeElement);
            alternatives.appendChild(alternativeElementLabel);


        }
        //fester alt til divene
        question.appendChild(alternatives);
        qu.appendChild(question);

    }

}
//litt usikker på hvor vi vil sjekke om radio btns er checked...
function checkRadio() {
	var tmpTest = new Result();
	tmpTest.courseId = currentCourse;
	tmpTest.moduleId = currentModule;
	tmpTest.testResults = [];
	var poeng = 0;
	var divs = document.getElementsByClassName("alternatives");
	for(var i = 0; i<divs.length; i++){
		if (document.getElementById("radio_correct_"+i).checked == true){
			poeng++;
			tmpTest.testResults.push(1);
			
		}else{
			tmpTest.testResults.push(0);
		}
	}
	var element = document.getElementById("anSwer").innerHTML;
	var svar = "Totalt antall riktige: "+ poeng;
	element.appendChild(svar);

}

//usikker på hvor vi skal lage denne btn fra. 
//kan være lurt å lage den i html, men er usikker på listener der.
function makeCheckBtn(radioBtn) {
	var btn = document.createElement("BUTTON");
	btn.textContent = "Check it!";
	document.body.appendChild(btn);
	//her sender vi med testen fra modulet
	btn.addEventListener("click", function () {
		validateAnswer()
	});
}

//sjekker riktig svar
function validateAnswer(radioBtn) {
	//sjekke med denne radio btn siden den har en id
	//id tilsvarer spm nr og alternative nr.
	//linje 120

}


//skriver arrayet med resultater til JSON
function postResults(json) {
	var jsonString = JSON.stringify(json);
	$.ajax({
		type: "POST",
		contentType: "text/plain",
		url: "/api/userSettings/quizResults",
		data: jsonString,
		success: function (data) {
			// lolno
		},
		dataType: "text"
	});

}

//metode som henter data for brukerens kursprogress

function getResults() {

    $.getJSON("/api/userSettings/quizResults", function (data) {



	}).done(function (data) {

		populateResultData(data);
	});

}

//hente resultater fra JSON og lagre de i nettsiden.

function populateResultData(json) {


    for (var s = 0; s < json.length; s++) {
        var result = json[s];
        result = explodeJSON(result);

        var tempResult = new Result();
        tempResult.courseId = result.courseId;
        tempResult.moduleId = result.moduleId;
        tempResult.testResults = result.testResults.slice();
        results.push(tempResult);
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

function parseURL() {

    currentCourse = getQueryVariable("course");
    currentModule = getQueryVariable("module");
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