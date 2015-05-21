$(function(){

    $.get('/evento', function(data){
        fechaOK=fechaCorrecta(data[0].date);
        horaOK=(data[0].date).substring(11, 16);
        completeEvent(data[0].title,data[0].description,data[0].address,fechaOK,horaOK,data[0].comment);
    });
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
    $('#eventAddress').text(address);
    $('#eventDate').text(date);
    $('#eventHour').text(hour);
    $('#eventEslogan').text(comment);
}

var fechaCorrecta = function(date){
    date=date.substring(0, 10);
    var fecha=date.split('-');
    var fechaOK=fecha[2]+'/'+fecha[1]+'/'+fecha[0];
    return fechaOK;
}