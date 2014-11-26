console.log("loading.module");

var moduleNumber = 1;

var modules = [];

function setModules(array){
	console.log(array);
	modules = array;
	console.log(modules);
	populateModule();
}

//vi må diskutere om dette er måten vi vil velge for å populere siden med valg (knapper)
function populateModule(){

	for (var Module in modules) {
		console.log(Module);

		var moduleElement = modules[Module].moduleName;
		var btn = document.createElement("BUTTON");        // Create a <button> element
		btn.textContent=moduleElement + " " + moduleNumber;            
		document.body.appendChild(btn);                    // Append <button> to <body>
		btn.addEventListener("click", getTest);
		moduleNumber++;

	}

}

function getTest(){
	//her må vi populere siden med innhold fra testen
	window.location = "module.html";
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
