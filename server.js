// MODULES
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var mysql = require('mysql');
var routes = require('./routes/index');
var users = require('./routes/users');

// APPLICATION
var app = express();

//VIEW ENGINE SETUP
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/');

app.use('/' ,express.static(path.join(__dirname, '/')));
app.use('/static' ,express.static(path.join(__dirname, '/static')));
app.use(favicon(__dirname + '/static/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/', routes);
app.use('/users', users);

app.listen(1000);

// DATABASE
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    port     : 3306,
    database : 'erasmus_madrid',
});

//función para dejar los datos de las consultas listos para mostrarlos bien en el cliente
// global.toStringEvento=function(evento){
//   evento=evento.replace('title',"");
//   evento=evento.replace(':',"");
//   evento=evento.replace(',',"");
//   evento=evento.replace('[{',"");
//   evento=evento.replace('}]',"");
//   evento=evento.replace('description',""); //para nextyes 
//   evento=evento.replace('comment',""); //para la ayuda  
//   evento=evento.replace('address',""); //para nextno
//   evento=evento.replace('time',""); //para id
//   evento=evento.replace('MAX(id_event)',""); //para max(id_event)
 
//   for (var i = 0; i < evento.length; i++) {     
//     if(evento[i]=='"'){
//       evento=evento.replace(evento[i],"");
//     }
//   };
//   evento=evento.replace('rnt',"");
//   evento=evento.replace('"',"");
//   evento=evento.replace('"',"");
//   evento=evento.replace('"',"");
//   evento=evento.replace('"',"");
//   return evento;
// }

//insertar usuario
global.insertUser = function(id_user, name_user, password, email ,callback) {
    connection.query("INSERT INTO user(id_user,name_user,password,email) VALUES ("+id_user+",'"+name_user+"','"+password+"','"+email+"');", function(err, rows, fields) {
        callback(err, rows);
    });
};

global.getEvent = function(callback) {
    connection.query('SELECT title,description FROM event', function(err, rows, fields) {
        callback(err, rows);
    });
};

// global.maxId = function(callback) {
//     connection.query('SELECT MAX(id_event) FROM event', function(err, rows, fields) {
//         callback(err, rows);
//     });
// };

// ERROR HANDLERS
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
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


var router = express.Router();

module.exports = app;
