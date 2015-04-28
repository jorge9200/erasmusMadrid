var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/registry', function(req, res, next){
		
		var name_user=req.body.username;
		var password=req.body.password;
		var email=req.body.email;
		var id_user=2;
	
		insertUser(id_user, name_user, password, email, function(err, result){
    	console.log(err || result);
		});

    console.dir(req.body);
});

module.exports = router;
