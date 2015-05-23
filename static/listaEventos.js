$(function(){
    var verEvento;
    var sel= $("#sel_categ").val();
    $('.refresh').click(function(){
        location.reload();
    });

    $.get('/lista',function(data){
        for (var i = 0; i < data.length; i++) {
            if(sel==data[i].category || sel=='Todos'){
                //var prueba=(data[i].date).substring(11,19); Esta línea cogería la hora del dataTime de la BBDD
                //var infoDate=restaFechas(data[i].date);
                //console.log(data[i].date);

                fechaOK=fechaCorrecta(data[i].date);
                var dias=days_between(fechaOK);

                var description=(data[i].description).split('.');
                description=description[0]+'...';
                addEvent(data[i].title,description,fechaOK,dias);
            }
        };

    });
});

var addEvent = function(title, description,date,dias){
    var eventToDom = $('.event.prototype').clone();
    eventToDom.removeClass('prototype');
    eventToDom.find('.event-image').attr("src", "./static/"+title+".jpg");
    eventToDom.find('#title').text(title);
    eventToDom.find('#description').text(description);
    eventToDom.find('#date').text(date);
    eventToDom.find('#infoDate').text('Faltan '+dias+' días para el evento.');
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

function days_between(date1) {
    var hoy=new Date();
    var arrayDate1=date1.split('/');
    var oneDay = 1000 * 60 * 60 * 24; // hours*minutes*seconds*milliseconds
    var firstDate = new Date(arrayDate1[2],arrayDate1[1],arrayDate1[0]);
    return Math.round(Math.abs((hoy.getTime() - firstDate.getTime())/(oneDay)));

}