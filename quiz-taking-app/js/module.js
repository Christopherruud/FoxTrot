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
	var spm = sporsmol;
	var setup = document.getElementsByClassName("new-test")[0];

	//for å ta vare på alle alternativer og teste på svar
	var qu;
	var answer = [];
	var alternative = [];
	//går igjennom spørsmålene
	for(var i = 0; i< spm.length; i++){
		if(spm.length>1){
			qu = document.getElementById("question");
			answer[i] = spm.answer;
			if(qu){
				qu.innerHTML = spm.question;
				for(var j = 0; j<spm.alternatives.length; j++){
					alternative[j] = smp.alternatives[j];
					var element;
					element = document.getElementById("alternatives");
					if(element){
						element.innerHTML = spm.alternatives[j];
					}
				}
			}
		}
	}

}

/*
for(var i = 0; i<spm.length; i++){
	var h5 = document.createElement("h5");
	h5.innerHTML = tests[i].question;
	setup.appendChild(h5);

	//var element;
	//element = document.getElementById("logo");
	//if (element) {
	//    element.innerHTML = "-new content-";
	//}


	//var p = document.createElement("p");
	//p.innerHTML = tests[i].answer;
	//setup.appendChild(p);

	var h6 = document.createElement("h6");
	h6.innerHTML = tests[i].alternatives[i];
	setup.appendChild(h6);
}*/

//$('#module').append(mId);
//VIKTIG om vi vil ha en "one page app"
/*$.ajax({
		  url: "test.html",
		  context: document.body
		}).done(function(response) {
		  $( this ).addClass( "done" );
		  console.log(response);
		});
 */	


/*	if(mId == id){

 */
