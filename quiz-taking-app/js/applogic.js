var mainWindow, quizWindow;

function openWin() {
	mainWindow = window.open("/", "mainNavigationWindow", "width=250",
			"height=250", true);
	quizWindow = window.open("quiz.html", "quizPanel", "width=250, height=250",
			true);
	quizWindow.resizeTo(400, screen.height);
	mainWindow.resizeTo(screen.width - 400, screen.height);
	quizWindow.moveTo(screen.width - 400, 100);
	mainWindow.moveTo(0, 100);
	quizWindow.focus();
}

setTimeout(
		function() {
			if (!quizWindow || quizWindow.outerHeight === 0) {
				// First Checking Condition Works For IE & Firefox
				// Second Checking Condition Works For Chrome
				alert("Popup Blocker is enabled! Please add this site to your exception list.");
			} else {
				// Popup Blocker Is Disabled
				window.open('', '_self');
				window.close();
			}
		}, 25);