$(function(){

    var sel= $("#sel_categ").val();
    $('.refresh').click(function(){
        location.reload();
    });

    $.get('/lista', function(data){
        for (var i = 0; i < data.length; i++) {
            if(sel==data[i].category || sel=='Todos'){
                fechaOK=fechaCorrecta(data[i].time);
                var description=(data[i].description).split('.');
                description=description[0]+'...';
                addEvent(data[i].title,description,fechaOK);
            }
        };

    });
});

var addEvent = function(title, description,time){
    var eventToDom = $('.event.prototype').clone();
    eventToDom.removeClass('prototype');
    eventToDom.find('.event-image').attr("src", "./static/"+title+".jpg");
    eventToDom.find('#title').text(title);
    eventToDom.find('#description').text(description);
    eventToDom.find('#time').text(time);

    $('.search-menu').after(eventToDom);
    eventToDom.after('<hr>');
}
var fechaCorrecta = function(time){
    time=time.substring(0, 10);
    var fecha=time.split('-');
    var fechaOK=fecha[2]+'/'+fecha[1]+'/'+fecha[0];
    return fechaOK;
}