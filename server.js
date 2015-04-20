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

var app = express();

//VIEW ENGINE SETUP
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/')

app.use('/' ,express.static(path.join(__dirname, '/')));
app.use('/static' ,express.static(path.join(__dirname, '/static')));
app.use(favicon(__dirname + '/static/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', routes);
app.use('/users', users);

//Server
/*
app.get('/:nombre', function(req, res){
    req.send('Hola' + req.params.nombre);
});
app.get('*', function(req, res){
    

});
*/
app.listen(1000);

// DATABASE
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    port     : 3306,
    database : 'erasmus_madrid',
});

//Query test como encapsular una funcion asincrona
/*
connection.query('SELECT id_user FROM user', function(err, rows, fields) {    
    console.log('The solution is: ', rows[0].id_user);
});


var getUserInfo = function(callback) {
    connection.query('SELECT id_user FROM user', function(err, rows, fields) {
        callback(err, rows);
    });
};

getUserInfo(function(err, result){
    console.log(err || result);
});
*/
//Conection end
connection.end();


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


module.exports = app;
