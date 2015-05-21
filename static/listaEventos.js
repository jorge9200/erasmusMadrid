$(function(){

    var sel= $("#sel_categ").val();
    $('.refresh').click(function(){
        location.reload();
    });

    $.get('/lista', function(data){
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
});

var addEvent = function(title, description,date){
    var eventToDom = $('.event.prototype').clone();
    eventToDom.removeClass('prototype');
    eventToDom.find('.event-image').attr("src", "./static/"+title+".jpg");
    eventToDom.find('#title').text(title);
    eventToDom.find('#description').text(description);
    eventToDom.find('#date').text(date);
    //eventToDom.find('#infoDate').text(infoDate);

    $('.search-menu').after(eventToDom);
    eventToDom.after('<hr>');
}

var fechaCorrecta = function(date){
    date=date.substring(0, 10);
    var fecha=date.split('-');
    var fechaOK=fecha[2]+'/'+fecha[1]+'/'+fecha[0];
    return fechaOK;
}

// restaFechas = function(fecha1){
// var aFecha2 = new Date().toJSON().slice(0,10)

// aFecha2 = aFecha2.split('-');
// console.log(aFecha1);

// var aFecha1=fecha1.substring(0, 10);
// aFecha1 = aFecha1.split('-');

// console.log(aFecha1);

// var fFecha1 = Date.UTC(aFecha1[2],aFecha1[1]-1,aFecha1[0]); 
// var fFecha2 = Date.UTC(aFecha2[2],aFecha2[1]-1,aFecha2[0]); 
// var dif = fFecha2 - fFecha1;
// var dias = Math.floor(dif / (1000 * 60 * 60 * 24)); 
// return dias;
// }