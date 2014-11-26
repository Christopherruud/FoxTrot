getCourseData();
var moduleNumber = 1;
var data = getCourseData();

//vi må diskutere om dette er måten vi vil velge for å populere siden med valg (knapper)
function populate(){
    
	for (var Module in courses) {
		var btn = document.createElement("BUTTON");        // Create a <button> element
		btn.textContent=Module.moduleName + " " + courseNumber;            
		document.body.appendChild(btn);                    // Append <button> to <body>

		//btn.addEventListener("click", getModule);
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
}