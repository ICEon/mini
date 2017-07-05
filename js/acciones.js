var db = null;
var preguntas = null;	
var cual = 0;
$(document).ready(function(e) {
/*	$('label').on('click', function (){
		alert ($(this).attr('id'));
	});*/

	document.addEventListener("deviceready", onDeviceReady, false);
	function onDeviceReady() {
	dbcopy();
	
	$(document).on("pagebeforeshow","#quiz",function(event){
		       obtener_preguntas ();
			   colocar_pregunta(cual); 
	  if (confirm('Vas a iniciar un Quiz de HTML, una vez comenzado tendras que terniarlo, si sales comenzaras de nuevo')) {		  


} else {
    alert('Puedes repasar las temas antes de iniciar un Quiz');
	$( ":mobile-pagecontainer" ).pagecontainer( "change", "#principal" );
}
	});
	
    $('#btncontinuar').on('click', function (){
		colocar_pregunta(cual);
	});
	} //device ready
	
	function dbcopy()
     {
      window.plugins.sqlDB.copy("mini.db", 0, copysuccess,copyerror);
	 }
	 
	 function copysuccess()
	  {
       db = window.sqlitePlugin.openDatabase({name: 'mini.db', location: 'default', androidDatabaseImplementation: 2});
	   alert ("copiada");
 	 //  obtener_categorias();
	  }

 	 function copyerror(e)
	  {
  	   if (e.code ==  516) // la bd ya existe
		{
		 db = window.sqlitePlugin.openDatabase({name: 'mini.db', location: 'default', androidDatabaseImplementation: 2});
		 obtener_categorias();
		}		
 	  }
     function obtener_preguntas ()
      {
	   db.transaction(function(tx) {
       tx.executeSql('SELECT * FROM preguntas ORDER BY RANDOM() LIMIT 15', [], function(tx, rs) {
       preguntas = rs;	   
	   cual = 0;
    }, function(tx, error) {
      alert ('SELECT error: ' + error.message);
	  db.close();
}, function() {
  db.close(function() {
  });
    });
	
  });  
  }	 
  
  function colocar_pregunta (numero) {
	  alert (preguntas.rows.item(0).pregunta);
//      $('#pregunta').html (preguntas.rows.item(0).pregunta);

  }
});
