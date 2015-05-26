$(function(){
/*Carga datos del evento*/

    var titleEvent={titulo: $.cookie('evento')};
    console.log(titleEvent);
    var prueba=$.cookie('prueba');
    console.log(prueba);
    //Borrar coockie carga la primera vez siempre el mismo evento
    //$.removeCookie('evento');
	$.post('/evento',titleEvent,function(data){
		fechaOK=fechaCorrecta(data[0].date);
		horaOK=(data[0].date).substring(11, 16);
		completeEvent(data[0].title,data[0].description,data[0].address,fechaOK,horaOK,data[0].comment);
	});
/***********************/

/*Carga el mapa con la direccion marcada*/
	google.maps.event.addDomListener(window, 'load', cargaMapa);
	//cargarDireccion();
/****************************************/
});


var completeEvent = function(title,description,address,date,hour,comment){
	/*Cargamos las imágenes*/
	$('#eventImg1').attr("src", "./static/" + title + "1.jpg");
	$('#eventImg2').attr("src", "./static/" + title + "2.jpg");
	$('#eventImg3').attr("src", "./static/" + title + "3.jpg");
	$('#eventImg4').attr("src", "./static/" + title + "4.jpg");
	$('#eventImg5').attr("src", "./static/" + title + "5.jpg");

	/*Cargamos los campos de información*/
	$('#eventTitle').text(title);
	$('#eventDescription').text(description);
	$('#eventAddress').text('Dirección: '+address);
	$('#eventDate').text('Fecha: '+date);
	$('#eventHour').text('Hora: '+hour);
	$('#eventEslogan').text(comment);
}

var fechaCorrecta = function(date){
	date=date.substring(0, 10);
	var fecha=date.split('-');
	var fechaOK=fecha[2]+'/'+fecha[1]+'/'+fecha[0];
	return fechaOK;
}

var cargaMapa = function initialize(){
	var coord = new google.maps.LatLng(40.415152, -3.702341);
	var geocoder = new google.maps.Geocoder();
	var address = $('#eventAddress').text();
	
	var mapProp = {
		center: coord,
		zoom:17,
		mapTypeId:google.maps.MapTypeId.ROADMAP
	};

	geocoder.geocode( { 'address': address}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			coord = results[0].geometry.location;
			map.setCenter(coord);
			var marker = new google.maps.Marker({
				map: map,
				position: coord
			});
		}
		/*else {
			alert('ERROR: ' + status);
		}*/
	});

	var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
}
