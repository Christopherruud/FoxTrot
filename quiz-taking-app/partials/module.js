
var moduleNumber = 1;
var data = getCourseData();

//vi må diskutere om dette er måten vi vil velge for å populere siden med valg (knapper)
function populate(){
    
	for (i = 0; i < data.length; i++) {
		var btn = document.createElement("BUTTON");        // Create a <button> element
		btn.textContent=data[i].modules[i].moduleName + " " + courseNumber;            
		document.body.appendChild(btn);                    // Append <button> to <body>

		//btn.addEventListener("click", getModule);
		moduleNumber++;
        
	}
}

function getTest(){
	//her må vi populere siden med innhold fra testen
	
}