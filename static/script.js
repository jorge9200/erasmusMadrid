$( document ).ready(function() {
	
	// LOAD MODAL CABECERA Y FOOTER
	$("#load-header").load("header-footer.html #header");
	$("#load-registry").load("header-footer.html #formRegistryModal");
	$("#load-log").load("header-footer.html #formLogModal");
	$("#load-footer").load("header-footer.html #footer");

	
	// EVENTOS
	$("#config").click(function(){
		$("#ownEvents").slideToggle(500);
		$("#configOptions").slideToggle(500);
	});
	
	$("#profileEvents").click(function(){
		$("#ownEvents").slideToggle(500);
	});
	
	$('.register-modal').on( 'submit', function(e){
		e.preventDefault();

		var passOK = checkPassword();

		if(passOK){
			$.post( "/registry", $(this).serialize(), function( data ) {
				console.log(data);
			});

		}	
	});

});

// Functions

var checkPassword = function(){
	var passOk = false;
	var pass1 = $('.password1').val();
	var pass2 = $('.password2').val();
	if(pass1!=pass2){
		$('.errorMessage').text("Las contraseñas no coinciden")
	}else{
		$('.errorMessage').text("")
	}
	return passOk;
}
var afterLogged = function(){
	 $('.createEvent').show();
	 $('.signIn').hide();
	 $('.logIn').hide();	 
	 var user = $('.user').val();
	$('.userProfile').text(user);
	$('.userProfile').show();
}

	