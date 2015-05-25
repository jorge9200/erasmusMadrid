// When the document is ready
$( document ).ready(function() {

	// LOAD MODAL CABECERA Y FOOTER
	$("#load-log").load("header-footer.html #formLogModal",function(){
		$('.log-modal').on('submit', function(e){
		e.preventDefault();
		if(checkParametersLog()){
			// Send log in
			$.post( "/log", $(this).serialize(), function( data ) {
				// Receive answer with OK (if the user is in the DB) or ERROR (if the user isn't in the DB)
				if (data == 'ERROR') {
					$('.log-error .text').text("ERROR: El nombre de usuario no está registrado o la contraseña no es válida");
					$('.log-error').show();
				}else{
					afterLogged();
					$('.log-error .sr-only').text("");
					$('.log-error').hide();
				}
			});
		}
	});

	});
	$("#load-header").load("header-footer.html #header",function(){
		cargaCabecera();
	});

	$("#load-registry").load("header-footer.html #formRegistryModal", function(){
		// When submit the registry modal
		$('.register-modal').on('submit', function(e){
			e.preventDefault();
			if (checkParameters()){
				$.post( "/registry", $(this).serialize(), function( data ) {
					// Receive answer with OK (if the user is in the DB) or ERROR (if  isn't in the DB)
					if (data == 'ERROR') {
						$('.registry-error .text').text("ERROR: El nombre de usuario ya existe");
						$('.registry-error').show();
					}else{
						$('#formRegistryModal').modal('toggle');
						$('.registry-error .sr-only').text("");
						$('.registry-error').hide();
						$("#load-alert").load("header-footer.html #sign-success");
						window.setTimeout(function() { $("#sign-success").alert('close'); }, 2000);
					}
				});
			}
		});
		// When focus out the password 2 input
		$('.password2').on('focusout',function(){
			checkPassword();
		});
		// When focus out the email input
		$('.email').on('focusout',function(){
			validateEmail($(this).val());
		});
		// When focus out the date input
		$('.date').on('focusout',function(){
			validateDate($(this).val());
		});
		// When change the status of the checkPolicy radio button
		$('.check').on('change',function(){
			if ($('.check').prop('checked')){
				$('.check-error .sr-only').text("");
				$('.check-error').hide();
			}
		});
	});

	$("#load-event").load("header-footer.html #formCreateEvent", function(){
		// When submit the event modal
		$('.event-modal').on('submit', function(e){
			e.preventDefault();
			if (checkParametersEvent()){
				$.post( "/insertNewEvent", $(this).serialize(), function( data ) {
				console.log('VALOR DE DATA: '+data);
				// Receive answer with OK (if the user is in the DB) or ERROR (if  isn't in the DB)
				if (data == 'ERROR') {
					$('.cevent-error .text').text("ERROR: El nombre de evento ya existe");
					$('.cevent-error').show();
				}else{
					$('#formCreateEvent').modal('toggle');
					$('.cevent-error .sr-only').text("");
					$('.cevent-error').hide();
				}
				});
			}
		});
		// When focus out the email input
		$('.descripcion').on('focusout',function(){
			checkDescription($(this).val());
		});
		// When focus out the date input
		$('.date').on('focusout',function(){
			validateDate($(this).val());
		});		
		$('.hora').on('focusout',function(){
			checkHour($(this).val());
		});	
		$('.numero').on('focusout',function(){
			checkNumber($(this).val());
		});	
		$('.image1').on('change',function(){
			if(checkIfFileIsImage($(this).val(),'img1')){
				$(".image2").prop('disabled', false);
				$(".image3").prop('disabled', false);
				$(".image4").prop('disabled', false);
				$(".image5").prop('disabled', false);
			}
		});
		$('.image2').on('change',function(){
			checkIfFileIsImage($(this).val(),'img3');
		});
		$('.image3').on('change',function(){
			checkIfFileIsImage($(this).val(),'img4');
		});
		$('.image4').on('change',function(){
			checkIfFileIsImage($(this).val(),'img4');
		});
		$('.image5').on('change',function(){
			checkIfFileIsImage($(this).val(),'img5');
		});
		$('.imgEvent').click(function () {
		    swichImage($(this).attr('id'));
		});
		$('.toEventFilter').click(function () {
		   searchEvent($(this).attr('id'));
		});
	});

	// EVENTOS
	$("#config").on('click', function(){
		$("#ownEvents").slideToggle(500);
		$("#configOptions").slideToggle(500);
	});

	$("#profileEvents").on('click', function(){
		$("#ownEvents").slideToggle(500);
	});
	$("#load-footer").load("header-footer.html #footer");
});

// -- AUXILIAR FUNCTIONS --

// Validate/show/hide the password input and date error
var checkPassword = function(){
	var pass1 = $('.password1').val();
	var pass2 = $('.password2').val();
	if(pass1!=pass2){
		$('.password-error .text').text("ERROR: Las contraseñas no coinciden");
		$('.password-error').show();
	}else{
		$('.password-error .sr-only').text("");
		$('.password-error').hide();
	}
}

// Validate/show/hide the email input and date error
var validateEmail = function(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    if (!re.test(email)){
    	$('.email-error .text').text("ERROR: Mail incorrecto");
		$('.email-error').show();
	}else{
		$('.email-error .sr-only').text("");
		$('.email-error').hide();
    }
}

// Validate/show/hide the date input and date error
var validateDate = function(date){
    var matches = /^(\d{2})[-\/](\d{2})[-\/](\d{4})$/.exec(date);
    if (matches == null) {
    	$('.date-error .text').text("ERROR: Formato de fecha incorrecto, introducir dd/mm/aaaa");
		$('.date-error').show();
	}else{
		$('.date-error .sr-only').text("");
		$('.date-error').hide();
    }
}

// Check if all the inputs are filled
var checkParametersLog = function(){
	// Gets the input values
	var usuario = $('.user').val();
	var password = $('.pass').val();

	// Show a error message if remains some input to fill
	var parametersOk = false;
	if (usuario=="" || password==""){
		$('.paramlog-error .text').text("ERROR: Por favor, rellene todos los campos");
		$('.paramlog-error').show();
	}else{
		parametersOk = true;
		$('.paramlog-error .sr-only').text("");
		$('.paramlog-error').hide();
	}
	return parametersOk;
}

// Check if all the inputs are filled
var checkParameters = function(){
	// Gets the input values
	var usuario = $('.usuario').val();
	var password1 = $('.password1').val();
	var password2 = $('.password2').val();
	var mail = $('.email').val();
	var date = $('.date').val();
	// Check if the policy is checked
	var checkbox = policyChecked();

	// Show a error message if remains some input to fill
	var parametersOk = false;
	if (usuario=="" || password1=="" || password2=="" || email=="" || date=="" || !checkbox){
		$('.param-error .text').text("ERROR: Por favor, rellene todos los campos");
		$('.param-error').show();
	}else{
		parametersOk = true;
		$('.param-error .sr-only').text("");
		$('.param-error').hide();
	}
	return parametersOk;
}

// Check if the policy is checked
var policyChecked = function(){
	var isChecked = $('.check').prop('checked');
	if (!isChecked) {
		$('.check-error .text').text("ERROR: Debe aceptar las condiciones y políticas de uso de la empresa");
		$('.check-error').show();
	}else{
		$('.check-error .sr-only').text("");
		$('.check-error').hide();
	}
	return isChecked;
}

var checkDescription = function(desc){
	var longitud = desc.length;
	if (longitud<10) {
		$('.desc-error .text').text("ERROR: La descripcion es demasiado corta");
		$('.desc-error').show();
	}if (longitud>500) {
		$('.desc-error .text').text("ERROR: La descripcion es demasiado larga");
		$('.desc-error').show();
	}if (longitud>=10 && longitud<=500){
		$('.desc-error .sr-only').text("");
		$('.desc-error').hide();
	}
}

// Check if the file uploaded is an image
var checkIfFileIsImage = function(img, nImg){
	var ext = img.split('.').pop().toLowerCase();
	var isImage = false;
	if($.inArray(ext, ['gif','png','jpg','jpeg']) == -1) {
		if (ext != "") {
			$('.'+nImg+'-error .text').text("ERROR: Por favor, debe subir únicamente archivos que sean imágenes");
			$('.'+nImg+'-error').show();
		}
	}else{
		isImage = true;
		$('.'+nImg+'-error .sr-only').text("");
		$('.'+nImg+'-error').hide();
	}
	return isImage;
}

// Check if the input is a number
var checkNumber = function(number){
	var isNumber = $.isNumeric(number);
	if (!isNumber) {
		$('.num-error .text').text("ERROR: Por favor, debe introducir un número");
		$('.num-error').show();
	}else{
		$('.num-error .sr-only').text("");
		$('.num-error').hide();
	}
}

// Validate/show/hide the hour input and date error
var checkHour = function(hour){
    var matches = /^(\d{2})[-\:](\d{2})$/.exec(hour);
    var hh = hour.substring(0,2);
    var mm = hour.substring(3,5);
   if (matches == null || hh > 24 || hh < 00 || mm > 60 || mm < 00 ) {
    	$('.hour-error .text').text("ERROR: Formato de hora incorrecto, debe introducir otros valores (hh:mm)");
		$('.hour-error').show();
	}else{
		$('.hour-error .sr-only').text("");
		$('.hour-error').hide();
    }
}

// Check if all the inputs are filled
var checkParametersEvent = function(){
	// Gets the input values
	var titulo = $('.titulo').val();
	var descripcion = $('.descripcion').val();
	var direccion = $('.direccion').val();
	var numero = $('.numero').val();
	var date = $('.event-modal .form-group .date').val();
	var hour = $('.hour').val();
	var image1 = $('.image1').val();

	// Show a error message if remains some input to fill
	var parametersEventOk = false;
	var isImage = checkIfFileIsImage(image1,'img1');
	if (titulo=="" || descripcion=="" || direccion=="" || numero=="" || date=="" || !isImage || hour==""){
		$('.param-error .text').text("ERROR: Por favor, rellene todos los campos obligatorios");
		$('.param-error').show();
	}else{
		parametersEventOk = true;
		$('.param-error .sr-only').text("");
		$('.param-error').hide();
	}
	return parametersEventOk;
}

var cargaCabecera = function(){
	var logged=$.cookie('logged');
	if(logged=='true'){
		var userName=$.cookie('userName');
		$('.createEvent').show();
		$('.signIn').hide();
		$('.logIn').hide();
		$('.userProfile').text(userName);
		$('.userProfile').show();
		$('.signOut').show();
	}
	
}
//Función para hacer log in TODO: comprobar que usuario esta en BD y almacenar en coockie 
var afterLogged = function(){
	$('#formLogModal').modal('toggle');
	var logged=$.cookie('logged');
	 $('.createEvent').show();
	 $('.signOut').show();
	 $('.signIn').hide();
	 $('.logIn').hide();	 
	 var user = $('.user').val();
	$('.userProfile').text(user);
	$('.userProfile').show();
	$.cookie('logged', 'true');
	$.cookie('userName', user);	
	var logged=$.cookie('logged');
	var userName=$.cookie('userName');
}

//Sign Out TODO: actualizar cockie
var signOut=function(){
	$.removeCookie('logged');
	$.removeCookie('userName');
	 $('.createEvent').hide();
	 $('.signOut').hide();
	 $('.signIn').show();
	 $('.logIn').show();	 
	 var user = $('.user').val();
	$('.userProfile').text("");
	$('.userProfile').hide();
}
var swichImage= function(id){
	var x=id;
	var image=$('#'+x).attr('src')
	var principal=$('#eventImg1').attr('src');
	$('#eventImg1').attr('src',image);
	$('#'+x).attr('src',principal);
}
var searchEvent=function(id){
	$.cookie('event', id);
	$.cookie('eventB', 'true');

}

