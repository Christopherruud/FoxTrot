// js 1 - fungerer med html skjema 1 courseedit.html
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

/*
 * Js 2 - denne koden fungere for en eller annen grunn ikke, men snakker med
 * html skjema 2 courseedit.html
 * 
 * $(function () {
 * 
 * var $courses = $('#courses'); var $id = $('#id'); var $domain = $('#domain');
 * var $level = $('level'); var $descriptiveText = $('descriptiveText'); var
 * $module = $('module');
 * 
 * var courseTemplate = $('#course-template').html();
 * 
 * function addCourse(course){ $courses.append(Mustache.render(courseTemplate,
 * order)); }
 * 
 * $ajax({ type: 'GET', url: '/api/systemSettings/quizTestKey', success:
 * function(courses){ $.each(courses, function(i, course){ addCourse(course);
 * }); }, error: function() { alert('error loading courses'); } });
 * 
 * $('#add-course').on('click', function() {
 * 
 * var course ={ id: $id.val(), domain: $domain.val(), level: $level.val(),
 * descriptiveText: $descriptiveText.val(), module: $module.val(), };
 * 
 * $ajax({ type: 'POST', url: '/api/systemSettings/quizTestKey', data: course,
 * success: function(newCourse) { addCourse(newCourse); }, error: function() {
 * alert('error saving course'); } }); });
 * 
 * $courses.delegate('.remove', 'click', function(){
 * 
 * var $li =$(this).closest('li');
 * 
 * $.ajax({ type: 'DELETE', url: '/api/systemSettings/quizTestKey' +
 * $(this).attr('data-id'), success: function (){ $li.fadeOut(300, function() {
 * $(this).remove(); }); } }); }); });
 * 
 */