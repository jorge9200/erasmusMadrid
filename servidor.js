//MODULOS
var express = require('express'),
    ipfilter = require('ipfilter'),//
    //http = require('http'),//
    // mongooe= require('mongoose');//bbdd 
    mysql= require('mysql');
    //modelos=require('./models');

    var path = require('path');
    var favicon = require('serve-favicon');
    var logger = require('morgan');
    var cookieParser = require('cookie-parser');
    var jadephp = require('jade-php');
var bodyParser = require('body-parser');//

var app = express();

// var client=mysql.createConnection({
//   user: 'root',
//   pasword: 'root',
//   database : 'myapp',
//   host: 'localhost',
//   port: '3306', //07 xampp y 06 mysql
// });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//filtro de ips
// var ips = ['192.168.1.37']; //'138.100.12.23','138.100.12.53','138.100.12.24'
// app.use(ipfilter(ips, {mode: 'allow'}));

//funciones aux
// function toStringQuest(question){
//   question=question.replace('text',"");
//   question=question.replace(':',"");
//   question=question.replace('[{',"");
//   question=question.replace('}]',"");
//   question=question.replace('help',""); //para la ayuda 
//   question=question.replace('nextyes',""); //para nextyes  
//   question=question.replace('nextno',""); //para nextno
//   question=question.replace('id',""); //para id
 

//   var myFinal=false;
//   for (var i = 0; i < question.length; i++) {     
//     if(question[i]=='"'){
//       question=question.replace(question[i],"");
//     }
//     if(question[i]=='?'){
//       i=i+1;
//       myFinal=true;
//     }
//     if(myFinal){
//       question=question.replace(question[i],"");
//     }
//   };
//   question=question.replace('rnt',"");
//   question=question.replace('"',"");
//   return question;
// }

// function toStringClauses(clauses){
//   for (var j = 0; j < clauses.length; j++) {
//     if(clauses[j]==':' || clauses[j]=='"' || clauses[j]=='[' || clauses[j]==']' 
//       || clauses[j]=='{' || clauses[j]=='}'){
//       clauses=clauses.replace(clauses[j],"");
//   }
// };
//   clauses=clauses.replace('id:',"");
//   clauses=clauses.replace('tittle:',"");
//   clauses=clauses.replace('"',"");
//   clauses=clauses.replace('}',"");
//   clauses=clauses.replace(',',"  ");
//   clauses=clauses.replace('idClause',""); //para idClause
//   clauses=clauses.replace(':',""); //para idClause
//   clauses=clauses.replace('{',""); //para idClause
//   return clauses;
// }


//variables globales


//load home
// app.get('/', function(req, res){
//   res.render('page1', {title: 'MyApp'});
// });


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(8000);

console.log('Server running at http://192.168.1.37:8000');//138.100.12.23:8000 //192.168.1.37:8000


module.exports = app;