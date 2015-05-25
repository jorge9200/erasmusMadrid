$(function(){
	var verEvento;
	var sel= $("#sel_categ").val();
	$('.refresh').click(function(){
		location.reload();
	});

   $.get('/lista',function(data){
		for (var i = 0; i < data.length; i++) {
			if(sel==data[i].category || sel=='Todos'){

				fechaOK=fechaCorrecta(data[i].date);
				hour=(data[i].date).substring(11, 19);
				var mensaje=days_between(fechaOK,hour);

				description=(data[i].description).split('.');
				description=description[0]+'...';
				addEvent(data[i].title,description,fechaOK,mensaje);
			}
		};

	});
	
	//blink(".dateMssg", -1, 1000);

});

var addEvent = function(title,description,date,mensaje){
	var eventToDom = $('.event.prototype').clone();

	var fechaImg = date.split('/');
	var year = fechaImg[2];
	var monthName = monthToName(fechaImg[1]);
	var day = fechaImg[0];

	eventToDom.removeClass('prototype');
	
	eventToDom.find('.event-image').attr("src", "./static/"+title+".jpg");
	eventToDom.find('#title').text(title);
	eventToDom.find('#description').text(description);
	eventToDom.find('#year').text(year);
	eventToDom.find('#month').text(monthName);
	eventToDom.find('#day').text(day);
	eventToDom.find('#infoDate').text(mensaje);

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

//Devuelve un mensaje con los días que faltan para el evento
function days_between(date1,hour) {
	var hoy = new Date();
	var arrayDate1 = date1.split('/');
	var arrayHour = hour.split(':');
	var oneDay = 1000 * 60 * 60 * 24; // hours*minutes*seconds*milliseconds
	var firstDate = new Date(arrayDate1[2],arrayDate1[1]-1,arrayDate1[0],arrayHour[0],arrayHour[1],arrayHour[2]);
	
	console.log(hoy);
	console.log('fecha modificada: '+firstDate);
	var dias=Math.round(Math.abs((hoy.getTime() - firstDate.getTime())/(oneDay)));
	console.log(dias);
	console.log('--------------------------');
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

function monthToName(month){
	var monthText = parseInt(month);
	switch(monthText){
		case 1:
			monthText = "Enero";
			break;
		case 2:
			monthText = "Febrero";
			break;
		case 3:
			monthText = "Marzo";
			break;
		case 4:
			monthText = "Abril";
			break;
		case 5:
			monthText = "Mayo";
			break;
		case 6:
			monthText = "Junio";
			break;
		case 7:
			monthText = "Julio";
			break;
		case 8:
			monthText = "Agosto";
			break;
		case 9:
			monthText = "Septiembre";
			break;
		case 10:
			monthText = "Octubre";
			break;
		case 11:
			monthText = "Noviembre";
			break;
		case 12:
			monthText = "Diciembre";
			break;
	}
	return monthText;
}


/*function blink(elem, times, speed) {
    if (times > 0 || times < 0) {
        if ($(elem).hasClass("neonLights")) 
            $(elem).removeClass("neonLights");
        else
            $(elem).addClass("neonLights");
    }

    clearTimeout(function () {
        blink(elem, times, speed);
    });

    if (times > 0 || times < 0) {
        setTimeout(function () {
            blink(elem, times, speed);
        }, speed);
        times -= .5;
    }
}*/