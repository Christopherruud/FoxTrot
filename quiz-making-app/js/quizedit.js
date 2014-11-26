$(document).ready(function(){
    var id=1;
    
	$("#add").click(function(){
	    $("#table3").append
	    ('<tr valign="top"><td width="100px" align="center">'
	    		+(id++) +'</td><td width="100px"> ' 
	    		+$("#question").val()+'</td><td width="100px" align="center">
	    		+$("#answer1").val()+'</td><td width="100px" align="center">
	    		+$("#answer2").val()+'</td><td width="100px" align="center">
	    		+$("#answer3").val()+'</td><td width="100px" align="center">
	    		+$("#answer4").val()+'</td><td width="100px" align="center"><a href="javascript:void(0);" class="remCF">Remove</a></td> <td><td width="100px" align="center"><a href="quizedit.html">Create test</a></td></tr>');
	}); 
        
    $("#table2").on('click','.remCF',function(){
        $(this).parent().parent().remove();
    });
});