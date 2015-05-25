$(function(){

/*******Cargar eventos del usuario*******/
	var sel = $("#sel_categ").val();

	$('.refresh').click(function(){
		location.reload();
	});
//deberia ser parecido al de listaEventos.js pero cogiendo SOLO los del usuario
	var nameUser={nombre: $.cookie('userName')};
	$.post('/eventSubscribe',nameUser,function(data){
	    for (var i = 0; i < data.length; i++) {
            if(sel==data[i].category || sel=='Todos'){

                fechaOK=fechaCorrecta(data[i].date);
                hour=(data[i].date).substring(11, 19);
                var mensaje=days_between(fechaOK,hour);
      
                addEvent(data[i].title,data[i].description,fechaOK,mensaje);
            }
        };

	});

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

var addEvent = function(title, description,date,mensaje){
    var eventToDom = $('.event.prototype').clone();
    eventToDom.removeClass('prototype');
    eventToDom.find('.event-image').attr("src", "./static/"+title+".jpg");
    eventToDom.find('#title').text(title);
    eventToDom.find('#description').text(description);
    eventToDom.find('#date').text(date);
    eventToDom.find('#infoDate').text(mensaje);
    eventToDom.find('#calendario').text(date);

    $('#startEvents').after(eventToDom);
    eventToDom.after('<hr>');
}


var fechaCorrecta = function(date){
	date=date.substring(0, 10);
	var fecha=date.split('-');
	var fechaOK=fecha[2]+'/'+fecha[1]+'/'+fecha[0];
	return fechaOK;
}

//Devuelve un mensaje con los días que faltan para el evento
function days_between(date1,hour) {
    var hoy=new Date();
    var arrayDate1=date1.split('/');
    var arrayHour=hour.split(':');
    var oneDay = 1000 * 60 * 60 * 24; // hours*minutes*seconds*milliseconds
    var firstDate = new Date(arrayDate1[2],arrayDate1[1]-1,arrayDate1[0],arrayHour[0],arrayHour[1],arrayHour[2]);  
    var dias=Math.round(Math.abs((hoy.getTime() - firstDate.getTime())/(oneDay)));
    var mensaje;
    if(dias==0){
        mensaje='¡El evento es hoy!';
    }else if(dias==1){
        mensaje='¡Falta '+dias+' día para el evento!';
    }else{
        mensaje='¡Faltan '+dias+' días para el evento!';
    }
    return mensaje;
}