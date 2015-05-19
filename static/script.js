$( document ).ready(function() {
	
	// LOAD MODAL CABECERA Y FOOTER
	$("#load-header").load("header-footer.html #header");
	$("#load-registry").load("header-footer.html #formRegistryModal", function(){
		$('.register-modal').on('submit', function(e){
			//e.prevcentDefault();
			var checkRes = checkParameters();
			if (checkParameters == true){
				$.post( "/registry", $(this).serialize(), function( data ) {
					console.log(data);
				});
			}
		});

		$('.password2').on('focusout',function(){
			checkPassword();
		});

		$('.email').on('focusout',function(){
			validateEmail($(this).val());
		});

		$('.date').on('focusout',function(){
			validateDate($(this).val());
		});

		$('.check').on('change',function(){
			if ($('.check').prop('checked')){
				$('.check-error .sr-only').text("");
				$('.check-error').hide();
			}
		});
	});
	
	$("#load-log").load("header-footer.html #formLogModal");
	$("#load-footer").load("header-footer.html #footer");

	// EVENTOS
	$("#config").on('click', function(){
		$("#ownEvents").slideToggle(500);
		$("#configOptions").slideToggle(500);
	});
	
	$("#profileEvents").on('click', function(){
		$("#ownEvents").slideToggle(500);
	});

});

// Functions
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

function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    if (!re.test(email)){
    	$('.email-error .text').text("ERROR: Mail incorrecto");
		$('.email-error').show();
	}else{
		$('.email-error .sr-only').text("");
		$('.email-error').hide();
    }
}

function validateDate(date)
{
    var matches = /^(\d{2})[-\/](\d{2})[-\/](\d{4})$/.exec(date);
    if (matches == null) {
    	$('.date-error .text').text("ERROR: Formato de fecha de nacimiento incorrecto, introducir dd/mm/aaaa");
		$('.date-error').show();
	}else{
		$('.date-error .sr-only').text("");
		$('.date-error').hide();
    }
}

var checkParameters = function(){
	var usuario = $('.usuario').val();
	var password1 = $('.password1').val();
	var password2 = $('.password2').val();
	var mail = $('.email').val();
	var date = $('.date').val();
	var checkbox = isChecked()
	var checkRes = false;
	if (usuario=="" || password1=="" || password2=="" || email=="" || date=="" || checkbox){
		checkRes = false;
		$('.param-error .text').text("ERROR: Por favor, introduzca todos los caracteres obligatorios");
		$('.param-error').show();
	}else{
		checkRes = true;
		$('.param-error .sr-only').text("");
		$('.param-error').hide();
	}
	return checkRes;
}

var isChecked = function(){
	var checkedProp = $('.check').prop('checked');
	if (!checkedProp) {
		$('.check-error .text').text("ERROR: Debe aceptar las condiciones y políticas de uso de la empresa");
		$('.check-error').show();
	}else{
		$('.check-error .sr-only').text("");
		$('.check-error').hide();
	}
	return checkedProp;
}

var afterLogged = function(){
	$('.createEvent').show();
	$('.signIn').hide();
	$('.logIn').hide();	 
	var user = $('.user').val();
	$('.userProfile').text(user);
	$('.userProfile').show();
}



	