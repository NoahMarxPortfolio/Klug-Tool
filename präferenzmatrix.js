<p class="selQuestion">Nutzen Sie die Präferenzmatrix, um jedes Ziel mit jedem paarweise zu vergleichen. Als Ergebnis erhalten Sie zu jedem Ziel eine Gewichtung.<br/><br/></p>

<div class="selExplain">
    <p>- Wählen Sie in jeder hellblauen Zellen aus, welche der beiden Ziele Sie wichtiger finden.</p>
    <p>- Haben Sie alle hellblauen Felder ausgefüllt, können Sie rechts das Gewicht des jeweiligen Ziels in der Zeile ablesen. Das Gewicht wird automatisch in das Blatt "Entscheidungsmatrix" übertragen.</p>
    <p>- Eine niedrige Gewichtung bedeutet, dass Ihnen das Ziel weniger wichtig ist. Bevor Sie die Gewichtung durchgeführt haben, sind alle Ziele automatisch mit 1 gewichtet.</p>
    <p>- Eine höhere Gewichtung bedeutet, dass Ihnen dieses Ziel wichtiger ist.</p>
</div>



<script type="text/javascript" charset="utf-8">

  $( document ).ready(function() {
    //document.getElementById('ls-button-previous').style.visibility = 'hidden';
    
  });
  $(document).on('ready pjax:scriptcomplete', function() {

    //-----------------
    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
    $( "#limesurvey" ).submit(function( event ) {
        //alert( "Handler for .submit() called." );
        var a = [];
        var count = 0;
        $("select").each(function() {
            if($('option:selected',this).text() != " "){        
                a.push($('option:selected',this).val());
                count++;
                console.log( $('option:selected',this).text());
            }
           });
        //alert(a);
    	var aString = a.join('|'); 
    	setCookie("array",aString,10);
    	//event.preventDefault();
      
    });
    
    function getCookie(cname) {
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(';');
      for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }
    //-----------------

    var thisQuestion = $('#question{QID}');

    var anzahlZiele = 10; //response.length;  
    for (i = 0; i <= anzahlZiele; i++) {
      //alert("first i = " +  i);
      $('.answer-item.answer_cell_SQ0' + i, thisQuestion).addClass('with-select').append('<select class="inserted-select form-control list-question-select">\
    													<option value="">...</option>\
    												</select>');
    												
      if(i == 10){
        $('.answer-item.answer_cell_SQ10', thisQuestion).addClass('with-select').append('<select class="inserted-select form-control list-question-select">\
    													<option value="">...</option>\
    												</select>');

}
    }
    // Listeners
    $('.inserted-select', thisQuestion).on('change', function(i) {
      if ($(this).val() != '') {
        $(this).closest('.answer-item').find('input:text').val($.trim($('option:selected', this).text())).trigger('change');
      } else {
        $(this).closest('.answer-item').find('input:text').val('').trigger('change');
      }
    });

    // Returning to page
    $('.with-select input:text', thisQuestion).each(function(i) {
      var thisCell = $(this).closest('.answer-item');
      var inputText = $.trim($(this).val());
      var selectval = $('select.inserted-select option', thisCell).filter(function() {
        return $(this).html() == inputText;
      }).val();
      $('select.inserted-select', thisCell).val(selectval);
    });

    // Clean-up styles
    $('select.inserted-select', thisQuestion).css({
      'max-width': '100%'
    });
    $('.with-select input:text', thisQuestion).css({
      'position': 'absolute',
      'left': '-9999em'
    });
    

    var xhr = new XMLHttpRequest();
    var response;

    function datenSenden() {
      //alert("1");
      var suchbegriff = "{TOKEN:TOKEN}";
      //alert(suchbegriff);
      xhr.open("GET", "*****/testSqlOptions.php?suchbegriff=" + suchbegriff, true);
      xhr.send();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
          response = JSON.parse(xhr.responseText);
          //alert(response[1]);
          aReturn(response[1]);
        }
      }
    }

    function aReturn(var1) {
     
      response = var1;
      //console.log("response")
      //console.table(response);
      var count = 0;
      //alert("in function" + response);
      for (i = 0; i < anzahlZiele; i++) {
        //alert("i:" +i);
        for (x = 0; x <= anzahlZiele - 1; x++) {
          //alert("x:" + x);
          var select = $('.inserted-select:eq(' + count + ')');
          select.empty().append('<option value="'+i+'"> </option><option value="'+i+1+'">' + response[i] + '</option><option value="'+i+2+'">' + response[x] + '</option>');
          count = count + 1;
        }
      }
    //-----------!
    if(document.cookie.indexOf('array=') == -1){
        var a = [];
        var count = 0;
        $("select").each(function() {
            if($('option:selected',this).text() != " "){        
                a.push($('option:selected',this).val());
                count++;
                console.log( $('option:selected',this).text());
            }
           });
    	var aString = a.join('|'); 
    	setCookie("array",aString,10);
    }
    //-----------!
    dissable(response);
    }

    datenSenden();
    
    count = 0;
    for(i = 0; i < 10; i++ ){
    
        for(a = 0; a< 10; a++){
            
            if(a < i +1){
                
                //console.log("a: "+ a);
                $("select").eq(count).prop('disabled', 'disabled');
                $("select").eq(count).addClass("hidden");
            }else{
                $("select").eq(count).addClass("row"/* + i*/);
            }
            count++; 
    }
    }

    //_________________


function dissable(var1) {

function calcWeight(){
    arrGewicht = [0,0,0,0,0,0,0,0,0,0];
    
    for( o = 0;o < 10; o++){
        $(".row/*"+o+"*/").each(function() { 
            t = $(this).find(":selected").text();
            if(t == var1[o]){
                arrGewicht[o] = arrGewicht[o] + 1;
            }
            
        });
    }
    return(arrGewicht);
}
   
 
    $("select").change(function () {
    //console.log("weight");
    weight= calcWeight();
    //console.log(weight);
    for(i = 0; i < 10; i++){
    $("#answer486587X92X1001SQ0"+i+"_SQ11").val(weight[i -1] +1 );
    }
    $("#answer486587X92X1001SQ10_SQ11").val(weight[9] +1);
    });

    //console.log("format:");
    format(var1);
}
     ////_________________

function format(var1){
anzahlZiele = var1.length;
var table = document.getElementsByClassName("ls-answers subquestion-list questions-list text-array  ls-input-maxchars table table-bordered table-hover ")[0];
var row = table.rows[0];
//alert("anzahlZiele");
for (h = anzahlZiele + 1; h < 20; h++) {

    try {
        if (row.cells[h].innerText.trim() == "Gewichtung") {
            continue;
        }
        //console.log("h:" + h + "; header: " + row.cells[h].innerText.trim());
        row.cells[h].style.display = 'none';
    } catch (e) {
        break;
    }

}

$('th[style*="display: none"]').remove();


var reihe;
var Zehnerstelle = 0;
///alert("0000");
for (h = anzahlZiele + 1; h < 20; h++) {
    try {
        if (row.cells[h].innerText.trim() == "Gewichtung") {
            continue;
        }
        row.cells[h].style.display = 'none';
    } catch (e) {
        break;
    }

}
for (var a = anzahlZiele + 1; a < 20; a++) {
    if (a >= 10) {
        var Zehnerstelle = "";
    }
    if (a == 11) {
        continue;
    }
    var elemente = document.getElementsByClassName('answer_cell_SQ' + Zehnerstelle + "" + a + ' answer-item text-item');
    //alert(elemente.length);
    for (var b = 0; b < elemente.length; b++) {
        elemente[b].style.display = 'none';
        //alert("in loop");
    }
    try {
        reihe = document.getElementById('javatbd486587X92X1001SQ' + Zehnerstelle + "" + a);
        reihe.style.display = 'none';
    } catch (e) {
        break;
    }

}

$('td[style*="display: none"]').remove();

//---------
$('th').css('color', 'white');
$('th').css('background-color', '#e0303a');
$('td:eq(0)').css('background-color', '#e0303a');
$('select:not(:disabled)').parent().css('background-color', 'lightblue');
$(".answer_cell_SQ11").each(function( index ) {
    $(this).css('background-color', '#4eb8ec');
});
//$('input').prop( "disabled", true );
//$('input').val("1");
for(var y = 1; y < 10;y++){
    $("#answer486587X92X1001SQ0"+y+"_SQ11").prop('readonly', true);    
    }
$("#answer486587X92X1001SQ10_SQ11").prop('readonly', true);


//--------!
if(document.cookie.indexOf('array=') != -1){
    var count = 0;
    var arrCookie = getCookie("array").split('|');
    $("select").each(function() {
        $(this).val(arrCookie[count]);
        count++;
    });
    document.cookie = "array=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
} 
//---------!
//--------
}
	// nicht ganz fertig
  });

</script>
<style>
  .question-valid-container {
    display: none;
  }

</style>
