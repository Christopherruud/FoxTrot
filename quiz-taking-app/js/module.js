console.log("loading.module");

var moduleNumber = 0;
//var id;
var modules = [];
var idCourse;

function setModules(array, courseId, isInModule){
	console.log(array);
	modules = array;

	console.log(modules);
	idCourse = courseId;

	populateModule(isInModule);
}

//vi må diskutere om dette er måten vi vil velge for å populere siden med valg (knapper)
function populateModule(isInModule){
	console.log(isInModule, " utenfor modul");

	for (var Module in modules){

		console.log(Module);

		console.log(courses[idCourse].modules[Module].moduleId);

		//Hvis vi er inne i riktig modul
		if(isInModule){
			console.log(isInModule + " i modul");

			var testElements = courses[idCourse].modules[Module].tests;
			debugger;
			var nr = 1;


			//testElements.forEach(function(test){
			console.log(testElements);
			var btn = document.createElement("BUTTON");  
			btn.textContent="Test "+ nr; 
			document.body.appendChild(btn);
			//her sender vi med testen fra modulet
			btn.addEventListener("click", function(){setTest(testElements)});
			//test er nok ikke noe
			nr++;
			break;

		} else {
			//addInfo(courses[idCourse].modules[Module].moduleId);
			var moduleElement = courses[idCourse].modules[Module].moduleName;
			var btn = document.createElement("BUTTON");        // Create a <button> element

			var urlString = "module.html";
			urlString+='?module='+courses[idCourse].modules[Module].moduleId;
			console.log(urlString);

			btn.textContent=moduleElement + " " + moduleNumber;            

			document.body.appendChild(btn);                    // Append <button> to <body>

			//id = moduleElement.moduleId;


			//setter riktig URL til Modul man skal inn i
			(function(urlString) {
				btn.addEventListener("click", function(){window.location = urlString});
			})(urlString);


			moduleNumber++;
		}


	}

}

//setter opp spørsmålene i HTML
function setTest(sporsmol){
	//console.log(sporsmol);
	var spm = sporsmol;
	//console.log(spm);
	var setup = document.getElementById("newtest");

	//for å ta vare på alle alternativer og teste på svar
	var qu = document.getElementById("questions");

	for(var i = 0; i< spm.length; i++){
		
		//lager hvert enkelt spm i wrapper hvert spm får en id man søke på. 
		var question = document.createElement("div");
		question.setAttribute("id", "question" +i);
		question.setAttribute("class", "question");

		//lager en ny div for å putte alternativer i.
		var alternatives = document.createElement("div");
		alternatives.setAttribute("class", "alternatives");

		//spm tekst
		var questionElement = document.createElement("P");
		questionElement.innerHTML = spm[i].question;
		questionElement.setAttribute("class", "question-text");
		question.appendChild(questionElement);

		//genererer alternativer til spm / radio btn.
		
		//MANGLER MÅTE Å GODKJENNE PÅ! 
		//mangler å sjekke riktig svar! 
		//mangler lagre funksjon
		
		for(var j = 0; j<spm[i].alternatives.length; j++){
			//kan wrappe alternatives med radio buttons
			var alternativeElement = document.createElement("input");
			//lager tekst for hver input dvs tekst på alternativene
			var alternativeElementLabel = document.createElement("label");
			//fester radio buttons
			alternativeElement.setAttribute("type", "radio");
			alternativeElement.setAttribute("name", "group"+i);
			
			//her får hver radio btn en id
			alternativeElement.setAttribute("id", "radio_"+i+"_"+j);//skal være unik
			
			//setter verdi for å vise tekst?
			alternativeElement.setAttribute("value", spm[i].alternatives[j]);
			
			alternativeElementLabel.innerHTML = spm[i].alternatives[j];
			alternativeElementLabel.setAttribute("for", "radio_"+i+"_"+j);
			
			alternatives.appendChild(alternativeElement);
			alternatives.appendChild(alternativeElementLabel);
			
			
		}

		question.appendChild(alternatives);
		qu.appendChild(question);

	}
}

//sjekker riktig svar
function validateAnswer(radioBtn){
	//sjekke med denne radio btn siden den har en id
	//id tilsvarer spm nr og alternative nr.
	//linje 120
}


