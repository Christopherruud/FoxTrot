var options = {
  valueNames: [ 'id', 'name', 'number' ]
};

// Init list
var courseList = new List('course', options);

var idField = $('#id-field'),
    nameField = $('#name-field'),
    numberField = $('#number-field'),
    addBtn = $('#add-btn'),
    editBtn = $('#edit-btn').hide(),
    removeBtns = $('.remove-item-btn'),
    editBtns = $('.edit-item-btn');

// Sets callbacks to the buttons in the list
refreshCallbacks();

addBtn.click(function() {
  courseList.add({
    id: Math.floor(Math.random()*110000),
    name: nameField.val(),
    number: numberField.val()
  });
  clearFields();
  refreshCallbacks();
});

editBtn.click(function() {
  var item = courseList.get('id', idField.val())[0];
  item.values({
    id:idField.val(),
    name: nameField.val(),
    number: numberField.val()
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
    idField.val(itemValues.id);
    nameField.val(itemValues.name);
    numberField.val(itemValues.number);
    
    editBtn.show();
    addBtn.hide();
  });
}

function clearFields() {
  nameField.val('');
  numberField.val('');
}