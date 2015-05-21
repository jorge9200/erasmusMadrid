var express = require('express');
var router = express.Router();

var id_user=1;
var titulo;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/registry', function(req, res, next){
	var name_user=req.body.username;
	var password=req.body.password;
	var email=req.body.email;
  var birthDate = req.body.date;

  getUser(name_user, function(err, result){
    if (result.length != 0) {
      res.send('ERROR');
    }else{
      insertUser(id_user, name_user, password, email, birthDate, function(err, result){
        id_user=id_user+1;
          res.send('OK');
      });
    }
  });
});

router.post('/log', function(req, res, next){
	var name_user=req.body.username;
	var password=req.body.password;

  getUser(name_user, function(err, result){
    if (result.length == 0 || password != result[0].password) {
      res.send('ERROR');
    }else{
      res.send('OK');
    }
  });
});

router.get('/lista', function(req, res, next){
	var evento;
	//console.log('aaaaaaaaaa'+req.body);
	//titulo=req.body.titulo;
	getEvent(function(err, rows){
  	   evento=rows;
  	   //console.log(evento);
       res.send(evento);
	});

});

router.get('/enviarTitulo', function(req, res, next) {
	console.log('POST RECIBIDO');
  console.log(req.x);
});

router.get('/evento', function(req, res, next){
	//title="BeerPong Tournament";
	getOneEvent(titulo,function(err, rows){
  	   //console.log(rows);
       res.send(rows);
	});

});

module.exports = router;
