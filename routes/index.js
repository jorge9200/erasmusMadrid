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
	var evento;
	getEvent(function(err, rows){
  	   evento=rows;
  	   //console.log(evento);
       res.send(evento);
	});

});

module.exports = router;
