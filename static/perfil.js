$(function(){

/*******Cargar eventos del usuario*******/
	var sel = $("#sel_categ").val();

	$('.refresh').click(function(){
		location.reload();
	});
/* deberia ser parecido al de listaEventos.js pero cogiendo SOLO los del usuario
	$.get('/lista',function(data){
		for (var i = 0; i < data.length; i++) {
			if(sel==data[i].category || sel=='Todos'){
				//var prueba=(data[i].date).substring(11,19); Esta línea cogería la hora del dataTime de la BBDD
				//var infoDate=restaFechas(data[i].date);
				//console.log(data[i].date);
				fechaOK=fechaCorrecta(data[i].date);
				var description=(data[i].description).split('.');
				description=description[0]+'...';
				addEvent(data[i].title,description,fechaOK);
			}
		};

	});
*/

/****************************************/

/*******Animacion del menu*******/
	//abre menu
	$('#config').click(function() {
		$('.menu').animate({
			left: '0px'
		}, 200);
		$('#wrapper').animate({
			left: '285px'
		}, 200);
	});
	
	//cierra menu
	$('.icon-close').click( function(){
		$('.menu').animate({
			left: '-285px'
			}, 200);
		$('#wrapper').animate({
			left: '0px'
		}, 200);
	});
/********************************/
});

var addEvent = function(title, description,date){
	var eventToDom = $('.event.prototype').clone();
	eventToDom.removeClass('prototype');
	eventToDom.find('.event-image').attr("src", "./static/"+title+".jpg");
	eventToDom.find('#title').text(title);
	eventToDom.find('#description').text(description);
	eventToDom.find('#date').text(date);
	//eventToDom.find('#verEvento').data('id', title);;
	//eventToDom.find('#infoDate').text(infoDate);
	eventToDom.find('.verEvento').on('click', function(){
		$.get('/enviarTitulo', {x: 'title'}, function(){

		});
	});

	$('#startEvents').after(eventToDom);
	eventToDom.after('<hr>');
}

var fechaCorrecta = function(date){
	date=date.substring(0, 10);
	var fecha=date.split('-');
	var fechaOK=fecha[2]+'/'+fecha[1]+'/'+fecha[0];
	return fechaOK;
}