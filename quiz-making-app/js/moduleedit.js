var courseNumber
$(document)
		.ready(
				function() {
					var id = 1;

					$("#add")
							.click(
									function() {
										$("#table2")
												.append(
														'<tr valign="top"><td width="100px" align="center">'
																+ (id++)
																+ '</td><td width="100px"> '
																+ $("#level")
																		.val()
																+ '</td><td width="100px" align="center"><a href="javascript:void(0);" class="remCF">Remove</a></td> <td><td width="100px" align="center"><a href="quizedit.html">Create test</a></td></tr>');
									});

					$("#table2").on('click', '.remCF', function() {
						$(this).parent().parent().remove();
					});
				});
function populateModuleData() {
	var course = courses[courseNumber];
	var table2 = $("#table2");
	table2.empty();
	if (course.modules != 'undefined') {
		for (var y = 0; y < course.modules.length; y++) {
			var tableString = "<tr>";
			var module = course.modules[y];
			tableString += '<td width="100px" align="center">'
					+ module.moduleId + "</td>";

		}
	}

}

function parseURL() {
	courseNumber = getQueryVariable("course");
	console.log(courseNumber);
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