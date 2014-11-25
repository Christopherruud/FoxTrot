

function populate(){
	for (i = 0; i < data.length; i++) {
		var btn = document.createElement("BUTTON");        // Create a <button> element
		btn.textContent=data[i].domain + " " + courseNumber;            
		document.body.appendChild(btn);                    // Append <button> to <body>

		btn.addEventListener("click", getModule);
		courseNumber++;

	}
}