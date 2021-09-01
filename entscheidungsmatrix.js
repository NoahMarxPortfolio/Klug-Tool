<p class="selQuestion">Bitte bewerten Sie Ihre Optionen einzeln auf jedes Ziel.<br/><br/></p>
<div class="selExplain">
    <p>- Bewerten Sie, wie gut sich eine Option dazu eignet, ein Ziel zu erreichen.</p>
    <p>- <span style="font-weight: bold">Verwenden Sie dafür die Vergabe von Schulnoten von 0 bis 15 Punkten.</span></p>
    <p>- Eine Bewertung mit 0 Punkten (also Note 6) bedeutet, dass sich die Option überhaupt nicht dafür eignet das Ziel zu erreichen.</p>
    <p>- Eine Bewertung mit 15 Punkten (also Note 1+) bedeutet, dass das Ziel absolut erfüllt wird.</p>
    <p>- Bewerten Sie so jede Option auf jedem Ziel.</p>
</div>

<script>
document.addEventListener('readystatechange', event => {
    //console.log("1");
    document.getElementById('question1023').setAttribute("style","width:2100px"); 


    for(a = 2; a< 12; a++){
        element = document.getElementById("answer486587X93X1023SQ"+ a +"_SQ1")
        element.setAttribute("pattern", "^([0-9]|1[0-5])$");
    }   

   for(var x = 1; x < 12; x++){
		for(var i = 2; i < 22; i=i +2){
		    try{ //--
			element = document.getElementById("answer486587X93X1023SQ"+ x +"_SQ" + i)
			element.setAttribute("readonly", ""); 
			element.setAttribute("style", "box-shadow: none; border: 0.1px solid lightgrey;");
			i2 = i +1
            element = document.getElementById("answer486587X93X1023SQ"+ x +"_SQ" + i2)
            element.setAttribute("pattern", "^([0-9]|1[0-5])$");
		    }
            catch (e) {
            break;
            } ///--
		        
		    }
	}
	//---------------
    
    //console.log("2");
    var table = document.getElementsByClassName("ls-answers subquestion-list questions-list text-array  ls-input-maxchars table table-bordered table-hover ")[0];
    var row = table.rows[0];
    
        for(h = 10 +1; h < 21; h ++){
        try{
            row.cells[h].style.display = 'none';
        }
        catch (e) {
        break;
        }
        
    }
    //console.log("3");
    //---
    for(var i = 2; i < 300; i=i +2){
		    try{ 
				$("td:eq("+i+")").css("background-color","white");
				i2 = i +1
				$("td:eq("+i2+")").css("background-color","lightblue");
		    }
            catch (e) {
				break;
            }        
    }
    $('input[value="Punkte"]').parent().css("background-color","lightgrey");
    $('input[value="Gewichtete bewertung"]').parent().css("background-color","lightgrey");
    $('th').css('color', 'white');
    $('th').css('background-color', '#e0303a');
    $('td:eq(0)').css('background-color', '#e0303a');
    $('td:eq(1)').css("background-color","lightblue");
    //---
    for(var i = 1; i < 20; i=i +2){
        try{
            element = document.getElementById("answer486587X93X1023SQ1_SQ" + i) 
            element.remove();
            
            element = document.getElementsByClassName("answer_cell_SQ" + i)
            var text = document.createTextNode("Punkte");
            element[0].appendChild(text);
            
            var i2 = i +1;
            
            element = document.getElementById("answer486587X93X1023SQ1_SQ" + i2) 
            element.remove();
            
            element = document.getElementsByClassName("answer_cell_SQ" + i2)
            var text = document.createTextNode("Gewichtete Bewertung");
            element[0].appendChild(text);
            
            
            }
            catch (e) {
                break;
            }
    }
    //console.log("4");
    for(var i = 0; i < 20; i = i +1){
        document.getElementsByTagName('th')[i].setAttribute("colspan","2");
    }
    //for(var i = 0; i < 10; i++){
    document.getElementsByTagName('table')[0/*i*/].style.width = '2000px';
    //}
    
    //console.log("5");
    ////--------------

    var xhr = new XMLHttpRequest();
    
    	function datenSenden() {
       
    		var suchbegriff = "{TOKEN}";
    
    		if (suchbegriff.length > 3) {
    			xhr.open("GET", "****/testSqlOptions.php?suchbegriff=" + suchbegriff, true);
    			xhr.send();
    			xhr.onreadystatechange = function() {
    				if (xhr.readyState == 4 && xhr.status == 200) {
    					//document.getElementById("ausgabe").innerHTML = xhr.responseText;
    					//console.log(xhr.responseText)
    					var response = JSON.parse(xhr.responseText);
    					//console.log("response:" + response[1]);
    					eventStart(response)
    					format(response[1],response[0]);
    				}
    			}
    			
    		}
      }

    datenSenden();
    ///
    
    function eventStart(response){
    //alert(response[3]);
    
    //assocResponse = [];
    //for(var y = 0; y < response[1].length; y++){
    //assocResponse[""+ response[1][y] +""] = response[3][y]; 
    //}	
    //console.log("6");
    ////---Test
    assocTest  = []
    var b = 0;
    for(var a = 1; a < response[2]. length * 2;a = a +2){
    	if(b >= 10){
    		b = 0;
    	}
    	assocTest[""+a+""] = response[3][b]
    	b++
    }
    //console.table(assocTest);
    //console.log("7");
    ///----
    
    
   
    
    $(".form-control ").each(function(i) {
    	if(i%2 != 0){
    		return;	
    	}
    	//if($(this).is(":visible") && !$(this).is(":disabled") ){
    	$(this).change(function(){
    		var id = $(this).attr('id').split("Q")[2]
    		//alert(assocTest[""+ id +""]);
    		$(this).parent().next().children().val(assocTest[""+ id +""]* $(this).val());
    	});
    	//}
    	
    });
    
    //console.table(assocTest);
    //console.log("8")
    }
    
    function format(var1,var2){
    	var reihe;

    	var anzahlZiele = var1.length;
        var anzahlOptionen = var2.length;
        //------------
    	
    	for(var b = anzahlZiele; b < 100; b++){
            try{
                $('th:eq('+b+')').css('background-color', '#e8640f');
            }
            catch (e) {
                break;    
            }
    	}
    	//___________
    	///alert("0000");
        var table = document.getElementsByClassName("ls-answers subquestion-list questions-list text-array  ls-input-maxchars table table-bordered table-hover ")[0];
        var row = table.rows[0];
        //alert("anzahlZiele");
        for(h = anzahlZiele +1; h < 20; h ++){
            try{
                row.cells[h].style.display = 'none';
            }
            catch (e) {
            break;
            }
            
        }
    	$('th[style*="display: none"]').remove()
    	
    	
    	for (var a = (anzahlZiele * 2) +1; a < 30;a++){
    		var elemente = document.getElementsByClassName('answer_cell_SQ'+ a +' answer-item text-item');
    		for (var b = 0; b < elemente.length; b ++) {
                elemente[b].style.display = 'none';
                //alert("in loop");
            }
    		
    	}
    	$('td[style*="display: none"]').remove()
    	
    	for (var b = anzahlOptionen/*anzahlZiele*/ +2;b < 20;b++){
    		try{
    		reihe = document.getElementById('javatbd486587X93X1023SQ'+ b);
    	    reihe.style.display = 'none';
    		}
            catch (e) {
            continue;
            }
    	}
    	$('tr[style*="display: none"]').remove()    
        }
//_________________
    
});


</script>