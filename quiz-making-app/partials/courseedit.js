var idValue = document.getElementById("id").value;
var nameValue = document.getElementById("domain").value;
var levelValue = document.getElementById("level").value;
var textValue = document.getElementById('descriptiveText').value;
var moduleValue = document.getElementById('module').value;


$(document).ready(function(){
    var id=1;
    
	$("#add").click(function(){
	    $("#table1").append
        ('<tr valign="top"><td width="100px" align="center">'+(id++)+'</td><td width="100px">'
           +$("#domain").val()+'</td><td width="100px" align="center">'
         +$("#level").val()+'</td><td width="100px" align="center">'
         +$("#descriptiveText").val()+'</td><td width="100px" align="center">'
         + $("#module").val()+'</td><td width="100px" align="center"> <a href="javascript:void(0);" class="remCF">Remove</a></td></tr>');
	}); 
        
    $("#table1").on('click','.remCF',function(){
        $(this).parent().parent().remove();
    });
});



