$(function(){

/*******Cargar eventos del usuario*******/
	var sel = $("#sel_categ").val();

	$('.refresh').click(function(){
		location.reload();
	});
/* deberia ser parecido al de listaEventos.js pero cogiendo SOLO los del usuario
	$.get('/lista',function(data){
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
*/

/****************************************/

/*******Animacion del menu*******/
	//abre menu
	var animated = false;
	$('#config').click(function() {
		if(animated == false) {
			$('.menu').animate({
				left: '0px'
			}, 200);
			$('#wrapper').animate({
				left: '380px'
			}, 200);
			animated = true;
		}else{
			$('.menu').animate({
				left: '-380px'
			}, 200);
			$('#wrapper').animate({
				left: '0px'
			}, 200);
			animated = false;
		}
	});
	
	//cierra menu
	$('.icon-close').click( function(){
		$('.menu').animate({
			left: '-380px'
			}, 200);
		$('#wrapper').animate({
			left: '0px'
		}, 200);
	});
	$('.foto-perfil').click(function(){
		$('.perfil-guardar-foto').show();
		$('#image-perfil').show();
	});
	$('.perfil-guardar-foto').click(function(){
		if (checkValue($('#image-perfil').val(),'foto')) {
			$.post( "/changeImage", $(this).serialize(), function( data ) {
				$('#event-success').text("¡Enhorabuena! Ha modificado el parámetro correctamente");
				$("#load-alert").load("header-footer.html #perfil-success");
				window.setTimeout(function() { $("#perfil-success").alert('close'); }, 2000);
			});
		}
	});
	$('.perfil-guardar-usuario').click(function(){
		if (checkValue($('#usuario-perfil').val(),'usuario')) {
			$.post( "/changeUser", $(this).serialize(), function( data ) {
				// Receive answer with OK (if the event isn't in the DB) or ERROR (if  is in the DB)
				if (data == 'ERROR') {
					$('.usuario-perfil-error .text').text("ERROR: El nombre de usuario ya existe");
					$('.usuario-perfil-error').show();
				}else{
					$('.usuario-perfil-error .sr-only').text("");
					$('.usuario-perfil-error').hide();
					$('#event-success').text("¡Enhorabuena! Ha modificado el parámetro correctamente");
					$("#load-alert").load("header-footer.html #perfil-success");
					window.setTimeout(function() { $("#perfil-success").alert('close'); }, 2000);
				}
				});
		}
	});
	$('.perfil-guardar-password').click(function(){
		if (checkValue($('#password-perfil').val(),'password')) {
			$.post( "/changePassword", $(this).serialize(), function( data ) {
				$('#event-success').text("¡Enhorabuena! Ha modificado el parámetro correctamente");
				$("#load-alert").load("header-footer.html #perfil-success");
				window.setTimeout(function() { $("#perfil-success").alert('close'); }, 2000);
			});
		}
	});
	$('.perfil-guardar-mail').click(function(){
		if (checkValue($('#mail-perfil').val(),'mail')) {
			$.post( "/changeMail", $(this).serialize(), function( data ) {
				$('#event-success').text("¡Enhorabuena! Ha modificado el parámetro correctamente");
				$("#load-alert").load("header-footer.html #perfil-success");
				window.setTimeout(function() { $("#perfil-success").alert('close'); }, 2000);
			});
		}
	});
	$('.usuario-perfil').click(function(){
		$('.perfil-guardar-usuario').show();
		$('#usuario-perfil').show();
	});
	$('.password-perfil').click(function(){
		$('.perfil-guardar-password').show();
		$('#password-perfil').show();
	});
	$('.email-perfil').click(function(){
		$('.perfil-guardar-mail').show();
		$('#mail-perfil').show();
	});
	// When focus out the email input
	$('.mail-perfil').on('focusout',function(){
		validateEmail($(this).val());
	});
/********************************/
});

var addEvent = function(title, description,date){
	var eventToDom = $('.event.prototype').clone();
	eventToDom.removeClass('prototype');
	eventToDom.find('.event-image').attr("src", "./static/"+title+".jpg");
	eventToDom.find('#title').text(title);
	eventToDom.find('#description').text(description);
	eventToDom.find('#date').text(date);
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

// Validate/show/hide the email input and date error
var validateEmail = function(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    if (!re.test(email)){
    	$('.email-perfil-error .text').text("ERROR: Mail incorrecto");
		$('.email-perfil-error').show();
	}else{
		$('.email-perfil-error .sr-only').text("");
		$('.email-perfil-error').hide();
    }
}

// Validate/show/hide the email input and date error
var checkValue = function(param,value) {
	var parametersOk = false;
    if (param==''){
    	$('.'+value+'-perfil-error .text').text("ERROR: Debe introducir "+value);
		$('.'+value+'-perfil-error').show();
	}else{
		parametersOk = true;
		$('.'+value+'-perfil-error .sr-only').text("");
		$('.'+value+'-perfil-error').hide();
    }
    return parametersOk;
}
