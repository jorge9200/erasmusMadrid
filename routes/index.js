var express = require('express');
var router = express.Router();

var id_user=1;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/registry', function(req, res, next){
		
	var name_user=req.body.username;
	var password=req.body.password;
	var email=req.body.email;
	
	insertUser(id_user, name_user, password, email, function(err, result){
    	id_user=id_user+1;
	});
	res.render('index', { title: 'Express' });
    	
});

router.get('/lista', function(req, res, next){
	
	getEvent(function(err, rows){
		//console.log(rows);
		var evento = JSON.stringify(rows);
        evento = toStringQuest(evento);
        evento = evento.split(":");
        maxId(function(err, rows){
			//console.log(rows);
			var id = JSON.stringify(rows);
        	id = toStringQuest(id);
        	//console.log(id);
        	evento=evento.concat(id);
        	res.send(evento);
		});
	});

});

module.exports = router;
