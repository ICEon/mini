var db = null;
var preguntas = null;	
var cualp = 0;
var correcta = 0;
var puntaje = 0;
$(document).ready(function(e) {
/*	$('label').on('click', function (){
		alert ($(this).attr('id'));
	});*/

	document.addEventListener("deviceready", onDeviceReady, false);
	function onDeviceReady() {
	dbcopy();
	
	$('#btnquiz').on('click', function (){
	  if (confirm('Vas a comenzar un quiz, una vez iniciado deberas terminar, si no empezarás de nuevo')) {
	   obtener_preguntas ();	  
       $('#divpregunta').html(preguntas.rows.item(cualp).pregunta);
	   $('#tr1').html (preguntas.rows.item(cualp).r1);
	   $('#tr2').html (preguntas.rows.item(cualp).r2);
	   $('#tr3').html (preguntas.rows.item(cualp).r3);
	   $('#tr4').html (preguntas.rows.item(cualp).r4);
	   correcta = preguntas.rows.item(cualp).correcta;
	   $( ":mobile-pagecontainer" ).pagecontainer( "change", "#quiz");
      } else {
     alert ('Puedes repasar los temas antes de comenzar');
     }	
	});
	

	
	
    $('#btncontinuar').on('click', function (){
		alert ("correcta: " + correcta + " respuesta: " + $('#respuestas').val());
		
		if (correcta ==  $('#respuestas').val())
		 {
			 puntaje = puntaje + 1;
		 }
		 
		cualp = cualp + 1;
		if (cualp < 2)
		 {
		colocar_pregunta(cualp);
		 }
		 else
		  {
			alert ("fin del quiz, tu puntaje final es de: " + puntaje);  
		  }
	});
	} //device ready
	
	function dbcopy()
     {
      window.plugins.sqlDB.copy("mini.db", 0, copysuccess,copyerror);
	 }
	 
	 function copysuccess()
	  {
       db = window.sqlitePlugin.openDatabase({name: 'mini.db', location: 'default', androidDatabaseImplementation: 2});
	//   alert ("copiada");
 	 //  obtener_categorias();
	  }

 	 function copyerror(e)
	  {
  	   if (e.code ==  516) // la bd ya existe
		{
		 db = window.sqlitePlugin.openDatabase({name: 'mini.db', location: 'default', androidDatabaseImplementation: 2});		
		}		
 	  }
     function obtener_preguntas ()
      {
		  cualp = 0;
		  puntaje = 0;
	   db.transaction(function(tx) {
       tx.executeSql('SELECT * FROM preguntas ORDER BY RANDOM() LIMIT 2', [], function(tx, rs) {
//		   alert (rs.rows.item(0).pregunta);
preguntas = rs;	   
    }, function(tx, error) {
      alert ('SELECT error: ' + error.message);
	  db.close();
}, function() {
  db.close(function() {
  });
    });
	
  });
  
  
  
  }	  
  function colocar_pregunta (c)
   {
	   $('#divpregunta').html(preguntas.rows.item(c).pregunta);
	   $('#tr1').html (preguntas.rows.item(c).r1);
	   $('#tr2').html (preguntas.rows.item(c).r2);
	   $('#tr3').html (preguntas.rows.item(c).r3);
	   $('#tr4').html (preguntas.rows.item(c).r4);
	   correcta = preguntas.rows.item(c).correcta;   
   }
   

});