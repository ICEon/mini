// JavaScript Document
var db = null;
var $todas_categorias = ["ikán","scuela","ve'e","ichi","táꞌán","kiti","so'va ká'ví yó","kuni"];


$(document).ready(function(e) {




  $red=255;
	$green=35;
	$blue=35;
	$rango = 55;
	
document.addEventListener("deviceready", onDeviceReady, false);
});

function buscar_palabras ($cat) {
	$consulta = "";
	$titulo_categoria = "";
	if ($cat == "fav")
	 {
	    $consulta = 'SELECT * FROM palabras WHERE Favorita=1';
		$titulo_categoria = "Kutoi";
	 }
	else
	 {
	  $cat = $cat.substring(3);
	  if ($cat == 0)
	   {
	    $consulta = 'SELECT * FROM palabras';
	   }
	  else
	   {
	    $consulta = 'SELECT * FROM palabras WHERE Categoria=' + $cat;
	   }
	 }

	db.transaction(function(tx) {
    tx.executeSql($consulta, [], function(tx, rs) {

		//recorrer el arreglo y llenar las palabras
//	  $('#palabras_categoria .ui-controlgroup-controls').html()= "";
      $('#palabras_categoria').empty();
	   for (var $i=0; $i<rs.rows.length; $i++)
	{

$('#palabras_categoria').append('<li data-filtertext="' + rs.rows.item($i).Mixteco + '"><a href="#"><div calss="mostrar"><h4>' + rs.rows.item($i).Mixteco + '</h4><h4>' + rs.rows.item($i).Mexicano  + '</h4></div></a><a href="#" class="btn-favorita" id="p' + rs.rows.item($i).idPalabra + '"></a></li>');



   
	}
	
	$('#palabras_categoria').listview("refresh");
	 $('.col-ref').collapsible("refresh");
      
    }, function(tx, error) {
      alert ('SELECT error: ' + error.message);
    });
  });

 if ($titulo_categoria == "")
  {
db.transaction(function(tx) {
    tx.executeSql("SELECT NombreCategoriaM FROM categorias WHERE CveCategoria=" + $cat , [], function(tx, rs) {
		$titulo_categoria=rs.rows.item(0).NombreCategoriaM; 
      
    }, function(tx, error) {
      alert ('SELECT error: ' + error.message);
    });
  });

  }
  $('#encabezado_busqueda').text($titulo_categoria);

}

function realiza_busqueda ($categoria_buscar) {


	  $(document).on("pagebeforeshow","#busqueda",function(){ 

   buscar_palabras ($categoria_buscar); 
});

}

function onDeviceReady() {
	dbcopy();
	
   $(document).on( 'tap', '.btn-favorita', function(){
	  favorita ($(this).attr('id'));
  });
  
  $(document).on( 'tap', '.btn-opciones', function(){
	  //buscar por las palabras de la opicon 
//      alert ("opcion");
   realiza_busqueda ($(this).attr('id'));   
     
   });
   
   
  if( window.plugins && window.plugins.NativeAudio ) {
    
    // Preload audio resources 
    
    
    window.plugins.NativeAudio.preloadSimple( 'note', 'audio/G.mp3', function(msg){
    }, function(msg){
        alert ( 'error: ' + msg );
    });
 
 
    // Play 
	$('#tocar').on('tap', function (){


    window.plugins.NativeAudio.play( 'note' );
	
	});
	
	
}
}



	function dbcopy()
{

        //Database filename to be copied is demo.db

        //location = 0, will copy the db to default SQLite Database Directory
		
        window.plugins.sqlDB.copy("appmixteco.db", 0, copysuccess,copyerror);

       
}



function copysuccess()
{

        //open db and run your queries
//          db = window.sqlitePlugin.openDatabase({name: 'appmixteco.db', location: 'default'});

         db = window.sqlitePlugin.openDatabase({name: 'appmixteco.db', location: 'default', androidDatabaseImplementation: 2});
		 obtener_categorias();
}

function copyerror(e)
{
        //db already exists or problem in copying the db file. Check the Log.

		if (e.code ==  516)
		 {
           db = window.sqlitePlugin.openDatabase({name: 'appmixteco.db', location: 'default', androidDatabaseImplementation: 2});
			 obtener_categorias();
		 }
        //e.code = 516 => if db exists
}



function agregar_categorias ($categorias)
 {



	for ($i=0; $i<=$categorias; $i++)
	 {
		 
	   $color = '#'+ $red.toString(16) + $green.toString(16) + $blue.toString(16);
		 if ($i==0)
		  {
		$cadena = "<a href='#busqueda' id='cat0' class='btn-opciones ui-btn ui-corner-all ui-icon-alert ui-btn-icon-right  ui-first-child' style='background-color:" + $color+ "'>Ndi'i</a>";	  
		  }
		
		 if ($i> 0 && $i < $categorias)
		  {
		  
		 $cadena += "<a href='#busqueda' id='cat"+ $i +"' class='btn-opciones ui-btn ui-corner-all ui-icon-star ui-btn-icon-right' style='background-color:" + $color +"'>"+ ($todas_categorias[$i-1]) +"</a>"
		  }
		 if ($red == 255 && $blue == 35 && $green <= 255)
		  {
			$green+= $rango;  
		  }
		 if ($red <= 255 && $blue == 35 && $green == 255)
		  {
			$red-= $rango;  
		  }
         if ($red == 35 && $blue >= 35 && $green == 255)
		  {
			$blue+= $rango;  
		  }
		 if ($red==35 && $green <= 255 && $blue==255)
		  {
			  $green -= $rango;
		  }
		 if ($red>=35 && $green ==35 && $blue==255)
		  {
			  $red += $rango;
		  }
		 if ($red==255 && $green == 35 && $blue<=255 && $blue>= 110)
		  {
			$blue -= $rango;
			if ($blue== 90)
			 {
				 $blue= 35;
			 }
		  }          
	 }
	 
	$cadena += "<a href='#busqueda' id='cat"+ ($i-1) +"' class='btn-opciones ui-btn ui-corner-all ui-icon-star ui-btn-icon-right ui-last-child' style='background-color:" + $color +"'>tu'un</a>"
	$('#opciones div.ui-controlgroup-controls').append($cadena); 
 }
 
 function obtener_categorias ()
  {
	 db.transaction(function(tx) {
    tx.executeSql('SELECT count(*) AS mycount FROM categorias', [], function(tx, rs) {
	  agregar_categorias (rs.rows.item(0).mycount);
    }, function(tx, error) {
      alert ('SELECT error: ' + error.message);
	  db.close();
}, function() {
  // OK to close here:
  console.log('transaction ok');
  db.close(function() {
    console.log('database is closed ok');
  });
    });
	
  });
  
  
  
  }