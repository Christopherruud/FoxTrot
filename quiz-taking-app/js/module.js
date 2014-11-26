console.log("loading.module");

var moduleNumber = 1;
var id;
var modules = [];
var idCourse;

function setModules(array, courseId){
	console.log(array);
	modules = array;
	console.log(modules);
	idCourse = courseId;
	populateModule();
}

//vi må diskutere om dette er måten vi vil velge for å populere siden med valg (knapper)
function populateModule(){

	for (var Module in modules) {
		console.log(Module);
		addInfo(courses[idCourse].modules[Module]);
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
	urlString+='?module='+modul.moduleId;
	console.log(urlString);
	url = urlString;
}

function getTest(){
	//her må vi populere siden med innhold fra testen
	window.location = url;
	
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
}
