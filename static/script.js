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

		$.post( "/registry", $(this).serialize(), function( data ) {
			console.log(data);
		});
	});


});

	