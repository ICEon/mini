var db = null;
var preguntas = null;	
var cualp = 0;
var textop ="";
$(document).ready(function(e) {
/*	$('label').on('click', function (){
		alert ($(this).attr('id'));
	});*/

	document.addEventListener("deviceready", onDeviceReady, false);
	function onDeviceReady() {
	dbcopy();
	
	$(document).on("pagebeforeshow","#quiz",function(event){
      obtener_preguntas ();	  
	  if (confirm('Vas a comenzar un quiz, una vez iniciado deberas terminar, si no empezarás de nuevo')) {
textop = "" + preguntas.rows.item(0).pregunta;
//$('#divpregunta').html(textop);
} else {
  alert ('Puedes repasar los temas antes de comenzar');
}
	});
    $('#btncontinuar').on('click', function (){

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
		   alert (rs.rows.item(0).pregunta);
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
});