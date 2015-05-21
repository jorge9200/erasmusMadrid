$(function(){

    var sel= $("#sel_categ").val();
    $('.refresh').click(function(){
        location.reload();
    });

    $.get('/lista', function(data){
        for (var i = 0; i < data.length; i++) {
            if(sel==data[i].category || sel=='Todos'){
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

    $('.search-menu').after(eventToDom);
    eventToDom.after('<hr>');
}

var fechaCorrecta = function(date){
    date=date.substring(0, 10);
    var fecha=date.split('-');
    var fechaOK=fecha[2]+'/'+fecha[1]+'/'+fecha[0];
    return fechaOK;
}