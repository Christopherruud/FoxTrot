$(document).ready(function(){
    var id=1;
    
	$("#add").click(function(){
	    $("#table2").append
	    ('<tr valign="top"><td width="100px" align="center">'
	    		+(id++) +'</td><td width="100px"> ' 
	    		+$("#level").val()+'</td><td width="100px" align="center"><a href="javascript:void(0);" class="remCF">Remove</a></td> <td><td width="100px" align="center"><a href="quizedit.html">Create test</a></td></tr>');
	}); 
        
    $("#table2").on('click','.remCF',function(){
        $(this).parent().parent().remove();
    });
});