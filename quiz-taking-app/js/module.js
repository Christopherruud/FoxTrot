
//Placeholder variables for global access
var moduleNumber = 0;
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
var courses = [];

function setModules(array, courseId, isInModule) {
	modules = array;

	idCourse = courseId;

	populateModule(isInModule);
}

//Reads the Module - data and writes it into HTML, depending on if it's called from within module.html or not
function populateModule(isInModule) {
	// console.log(isInModule, " utenfor modul");
	if(modules != null){
		for (var Module in modules) {
			//Hvis vi er inne i riktig modul
			if (isInModule) {
				//kan putte dette i en egen FUNCTION
				parseURL();
				if(courses[currentCourse].modules[currentModule].tests != null){
					$("#modulename").html(courses[currentCourse].modules[currentModule].moduleName);
					$("#moduletext").html(courses[currentCourse].modules[currentModule].moduleDescriptiveText);
					$("#moduleMtext").html(courses[currentCourse].modules[currentModule].moduleMotivation);
					var testElements = courses[currentCourse].modules[currentModule].tests;
					var nr = 1;


					//testElements.forEach(function(test){
					//  console.log(testElements);
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
				}else{
					document.write("No tests admitted");
				}
			} else {
				var moduleElement = courses[idCourse].modules[Module].moduleName;
				var btn = document.createElement("BUTTON");        // Create a <button> element

				var urlString = "module.html";
				urlString += '?course=' + idCourse;
				urlString += '&module=' + courses[idCourse].modules[Module].moduleId;

				btn.textContent = "Module " + (courses[idCourse].modules[Module].moduleId +1) + ": " + moduleElement;

				document.body.appendChild(btn);                    // Append <button> to <body>

				//id = moduleElement.moduleId;

				//setter riktig URL til Modul man skal inn i
				(function (urlString) {
					btn.addEventListener("click", function () {
						window.location = urlString
					});
				})(urlString);

			}


		}
	}else{
		document.write("No modules admitted ");
	}
}

//setter opp spørsmålene i HTML
function setTest(sporsmol) {
	var spm = sporsmol;
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

		//svar
		var answerElement = document.createElement("input");
		var answer = document.createElement("label");
		answerElement.setAttribute("type", "radio");
		answerElement.setAttribute("name", "group" + i);

		//burde være en lik id for alle riktige svar
		//flere submitknapper pr alternativ liste
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

//Method dedicated to iterate over all radio buttons and see if the answer-ones are correctly checked.
//Will then display number of correct answers, and persist.
function checkRadio() {
	var tmpTest = new Result();
	tmpTest.courseId = currentCourse;
	tmpTest.moduleId = currentModule;
	tmpTest.testResults = [];
	var poeng = 0;
	var divs = document.getElementsByClassName("alternatives");
	for (var i = 0; i < divs.length; i++) {
		if (document.getElementById("radio_correct_" + i).checked == true) {
			poeng++;
			tmpTest.testResults.push(1);

		} else {
			tmpTest.testResults.push(0);
		}
	}
	document.getElementById("anSwer").innerHTML = "Totalt antall riktige: " + poeng;
	var found = false;
	for (var xxl = 0; xxl < results.length; xxl++) {

		if (results[xxl].courseId == currentCourse && results[xxl].moduleId == currentModule) {
			found = true;
			console.log(found);
			break;
		}

	}
	if (!found) {
		console.log(found);
		results.push(tmpTest);
	}
	postResults(results);
}

//usikker på hvor vi skal lage denne btn fra. 
//kan være lurt å lage den i html, men er usikker på listener der.
/*function makeCheckBtn(radioBtn) {
 var btn = document.createElement("BUTTON");
 btn.textContent = "Check it!";
 document.body.appendChild(btn);
 //her sender vi med testen fra modulet
 btn.addEventListener("click", function () {
 validateAnswer()
 });
 }*/

//sjekker riktig svar
/*function validateAnswer(radioBtn) {
 //sjekke med denne radio btn siden den har en id
 //id tilsvarer spm nr og alternative nr.
 //linje 120

 }
 */

//skriver arrayet med resultater til JSON
function postResults(json) {
	var jsonString = JSON.stringify(json);
	$.ajax({
		type: "POST",
		contentType: "text/plain",
		url: "/api/userSettings/quizDebugResults",
		data: jsonString,
		success: function (data) {
			// lolno
		},
		dataType: "text"
	});

}

//metode som henter data for brukerens kursprogress

(function getResults() {

	$.getJSON("/api/userSettings/quizResults", function (data) {


	}).done(function (data) {

		populateResultData(data);
	});

})();

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
		object = objectStorage[object];
	}
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