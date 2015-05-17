$(function(){
		// LOAD MODAL CABECERA Y FOOTER
	$("#load-header").load("header-footer.html #header");
	$("#load-registry").load("header-footer.html #formRegistryModal");
	$("#load-log").load("header-footer.html #formLogModal");
	$("#load-footer").load("header-footer.html #footer");
	$("#load-createevent").load("header-footer.html #formCreateEvent")

    $.get('/lista', function(data){
        $("#title").html(data[0]);
        $("#description").html(data[1]);
        var numEvents  = parseInt(data[2]); //tenemos el nnumero de eventos de la BBDD para hacer un bucle y crear prototipos ese número de veces
        $("#time").html(data[2]);
        //$("#address").html(data[3]);
    });
});