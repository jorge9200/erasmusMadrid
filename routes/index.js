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
  //var date=req.body.date;
  //if(req.param('saveForm')){
    var id_user=1;
    client.query('INSERT INTO user(id_user,name_user,password,email) VALUES(?,?,?,?)',[id_user,name_user,password,email],function(err,results,fields){
      if(err){
        throw err;
      }
    });
    res.render('index', { title: 'Express' });
    //console.dir(req.body);
});

module.exports = router;
