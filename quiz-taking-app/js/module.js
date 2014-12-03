console.log("loading.module");

var moduleNumber = 1;
var id;
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
	console.log(isInModule, "Martin hjelper ikke");
	for (var Module in modules) {
		console.log(Module);


		addInfo(courses[idCourse].modules[Module].moduleId);
		if(isInModule){
			console.log(isInModule, "Martin hjelper");

			var testElements = courses[idCourse].modules[Module].tests;

			testElements.forEach(function(test){
				var btn = document.createElement("BUTTON");  
				btn.textContent=test.question; 
				document.body.appendChild(btn);
				btn.addEventListener("click", function(){setTest(tests[0])});
			});
			break;
		}
		var moduleElement = courses[idCourse].modules[Module].moduleName;
		var btn = document.createElement("BUTTON");        // Create a <button> element

		btn.textContent=moduleElement + " " + moduleNumber;            

		document.body.appendChild(btn);                    // Append <button> to <body>

		id = moduleElement.moduleId;

		btn.addEventListener("click", function(){getTest()});
		moduleNumber++;


	}

}
var url;
function addInfo(modul){
	var urlString = "module.html";
	urlString+='?module='+modul;
	console.log(urlString);
	url = urlString;
}

function getTest(){
	//her må vi populere siden med innhold fra testen
	window.location = url;
}

function setTest(tests){
	var setup = document.getElementsByClassName("new-tests")[0];
	var tests = tests;
	for(var i = 0; i<tests.length; i++){
		var h5 = document.createElement("h5");
		h5.innerHTML = tests[i].question;
		setup.appendChild(h5);
		var p = document.createElement("p");
		p.innerHTML = tests[i].answer;
		setup.appendChild(p);
		var h6 = document.createElement("h6");
		h6.innerHTML = tests[i].alternatives[i];
		setup.appendChild(h6);
	}
}



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