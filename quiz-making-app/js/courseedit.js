$(document)
		.ready(
				function() {

					$("#add")
							.click(
									function() {
										$("#table1")
												.append(
														'<tr valign="top"><td width="100px" align="center">'
																+ (++currentId)
																+ '</td><td            width="100px">'
																+ $("#domain")
																		.val()
																+ '</td><td width="100px" align="center">'
																+ $("#level")
																		.val()
																+ '</td><td width="100px" align="center">'
																+ $(
																		"#descriptiveText")
																		.val()
																+ '</td><td width="100px" align="center">'
																+ $("#module")
																		.val()
																+ '</td><td width="100px" align="center"> <a href="javascript:void(0);" class="remCF">Remove</a><td width="100px" align="center"><a href="moduleedit.html">Create modules</a></td></tr>');
										addToCourseList($("#domain").val(), $(
												"#level").val(), currentId, $(
												"#descriptiveText").val());

									});

					$("#table1").on('click', '.remCF', function() {
						$(this).parent().parent().remove();
					});
				});

function addToCourseList(domain, level, id, descriptiveText) {
	var tempcourse = new Course(domain, level, id, descriptiveText);
	tempcourse.level = level;
	tempcourse.id = id;
	tempcourse.descriptiveText = descriptiveText;
	courses.push(tempcourse);
	postTestData(courses);
}

