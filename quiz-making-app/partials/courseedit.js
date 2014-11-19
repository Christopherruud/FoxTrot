var options = {
  valueNames: ['domain', 'level', 'id', 'nextCourse', 'descriptiveText']
};

// Init list

var courseList = new List('course', options);

var domainField = $('#domain-field')
	levelField = $('#level-field') 
	idField = $('#id-field'),
    nextCourseField = $('#nextCourse-field'),
    descriptiveTextField = $('#descriptiveText-field'),
    addBtn = $('#add-btn'),
    editBtn = $('#edit-btn').hide(),
    removeBtns = $('.remove-item-btn'),
    editBtns = $('.edit-item-btn');

// Sets callbacks to the buttons in the list
refreshCallbacks();

addBtn.click(function() {
  courseList.add({
	domain: domainField (),
	level: levelField (),
    id: Math.floor(Math.random()*110000),
    nextCourse: nextCourseField.val(),
    descriptiveText: descriptiveTextField.val()
    var tmp = new Course(domain);
  });
  clearFields();
  refreshCallbacks();
});

editBtn.click(function() {
  var item = courseList.get('id', idField.val())[0];
  item.values({
    id:idField.val(),
    domain: domainField (),
	level: levelField (),
	id:idField.val(),
    nextCourse: nextCourseField.val(),
    descriptiveText: descriptiveTextField.val()
  });
  clearFields();
  editBtn.hide();
  addBtn.show();
});

function refreshCallbacks() {
  // Needed to add new buttons to jQuery-extended object
  removeBtns = $(removeBtns.selector);
  editBtns = $(editBtns.selector);
  
  removeBtns.click(function() {
    var itemId = $(this).closest('tr').find('.id').text();
    courseList.remove('id', itemId);
  });
  
  editBtns.click(function() {
    var itemId = $(this).closest('tr').find('.id').text();
    var itemValues = courseList.get('id', itemId)[0].values();
    id:idField.val(),
    domain: domainField (),
	level: levelField (),
	id:idField.val(),
    nextCourse: nextCourseField.val(),
    descriptiveText: descriptiveTextField.val()
    
    editBtn.show();
    addBtn.hide();
  });
}

function clearFields() {
	nextCourseField.val('');
	descriptiveText: descriptiveTextField.val('');
}

