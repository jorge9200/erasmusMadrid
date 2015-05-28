var express = require('express');
var router = express.Router();

var id_user=1;
var id_event;
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
      maxIdUser(function(err, rows){
        var id_string = JSON.stringify(rows);
        id_string = id_string.replace('max(id_user)','');
        id_string = id_string.replace('"','');
        id_string = id_string.replace('"','');
        id_string = id_string.replace(':','');
        id_string = id_string.replace('[{','');
        id_string = id_string.replace('}]','');
        if(id_string!='null'){
          id_user=parseInt(id_string)+1;
        }else{
          id_user=1;
        }
        insertUser(id_user, name_user, password, email, birthDate, function(err, result){
            id_user=id_user+1;
            res.send('OK');
        });
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
      res.send(result[0].email);
    }
  });
});

router.post('/insertNewEvent', function(req, res, next){
  var title=req.body.title;
  var category = '';
  if(req.body.category == 'Gastronomia'){
    category = 'Gastronomía'
  }else{
    category = req.body.category;
  }
  var description=req.body.description;
  var address=req.body.address;
  var calle=req.body.calle;
  var number=req.body.number;
  address=calle+' '+address+', '+number;
  var date=req.body.date;
  var hour=req.body.hora;
  var arrayDate=date.split('/');
  date=arrayDate[2]+'-'+arrayDate[1]+'-'+arrayDate[0]+' '+hour+':00';
  var comment=req.body.comment;

  maxIdEvent(function(err, rows){
    var id_string = JSON.stringify(rows);
    id_string = id_string.replace('max(id_event)','');
    id_string = id_string.replace('"','');
    id_string = id_string.replace('"','');
    id_string = id_string.replace(':','');
    id_string = id_string.replace('[{','');
    id_string = id_string.replace('}]','');
    id_event=parseInt(id_string)+1;
    getTitle(title,function(err, rows){
      if (rows.length != 0) {
        res.send('ERROR');
      }else{
        insertNewEvent(id_event,title,category,description,address,date,comment,function(err, rows){
          id_event=id_event + 1;
          res.send('OK');
        });
      }
    });
  });
});

router.get('/lista', function(req, res, next){
	var evento;
	getEvent(function(err, rows){
  	   evento=rows;
       res.send(evento);
	});

});

router.post('/eventSubscribe', function(req, res, next){
  var nombre=req.body.nombre;
   getIdUser(nombre,function(err, rows){
    var id=rows[0].id_user;
    subscribeEvent(id,function(err, rows){
      res.send(rows);
    });
  });
});

router.post('/userSubscribe', function(req, res, next){
  var user=req.body.user;
  var titulo=req.body.titulo;
  getIdEvent(titulo,function(err, rows){
   var id_event=rows[0].id_event;
   getIdEventFromUserEventTable(id_event, function(err, rows){
     console.log(rows);
     if(rows.length == 0){
       getIdUser(user,function(err, rows){
        var id=rows[0].id_user;
        userSubscribe(id,id_event,function(err, rows){
          res.send('OK');
        });
       });
     }else{
       res.send('Evento ya subscrito');
     }
   });
  });
});

router.post('/evento', function(req, res, next){
  var titulo=req.body.titulo;
	getOneEvent(titulo,function(err, rows){
       res.send(rows);
	});
});

//perfil
router.post('/changeUser', function(req, res, next){
  var name_userOld=req.body.name_userOld;
  var name_userNew=req.body.name_userNew;
  getUser(name_userNew, function(err, result){
      if (result.length != 0) {
        res.send('ERROR');
      }else{
      changeUser(name_userNew,name_userOld,function(err, result){
          res.send('OK');
      });
      }
  });
});

router.post('/changePassword', function(req, res, next){
  var name_userOld=req.body.name_userOld;
  var newPassword=req.body.newPassword;
  changePassword(name_userOld,newPassword,function(err, result){
      res.send('OK');
  });
});

router.post('/changeMail', function(req, res, next){
  var name_userOld=req.body.name_userOld;
  var newEmail=req.body.newEmail;
  changeMail(name_userOld,newEmail,function(err, result){
      res.send('OK');
  });
});

module.exports = router;
