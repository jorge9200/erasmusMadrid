$(function(){
    var verEvento;
    var eventB=$.cookie('eventB');
    if(eventB=='true'){
        var filterType=$.cookie('event');
        $('.refresh').attr('value',filterType);
        $('.refresh').text(filterType);
        $.removeCookie('eventB');
        $.removeCookie('event');
    }
    var sel= $("#sel_categ").val();
    $('.refresh').click(function(){
        location.reload();
    });
        
    $.get('/lista',function(data){
        //var busqueda=$.cookie('busqueda');
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
    // $('.verEvento').click(function(){
    //     //var titulo = $(this).siblings("#title").val();

    //     var titulo=$('#title').val();
         if($.cookie('user')!=''){
            $('#subscribe').show();
         }
    //     console.log(titulo);
    // });

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