$(function(){
		// LOAD MODAL CABECERA Y FOOTER
	$("#load-header").load("header-footer.html #header");
	$("#load-registry").load("header-footer.html #formRegistryModal");
	$("#load-log").load("header-footer.html #formLogModal");
	$("#load-footer").load("header-footer.html #footer");
	$("#load-createevent").load("header-footer.html #formCreateEvent")

    $.get('/lista', function(data){  
         for (var i = 0; i < data.length; i++) {
             addEvent(data[i].title,data[i].description);
         };
    });
});

var addEvent = function(title, description){
    var eventToDom = $('.event.prototype').clone();
    eventToDom.removeClass('prototype');
    eventToDom.find('.event-image').attr("src", "./static/"+title+".jpg");
    eventToDom.find('#title').text(title);
    eventToDom.find('#description').text(description);
    $('.search-menu').after(eventToDom);
    eventToDom.after('<hr>');
}