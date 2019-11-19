var fs = require('fs');
var https = require('https');
var express = require('express');
const path = require('path');
const passport = require('passport');
var misFs = require('./misfunciones');
const session = require('express-session');
const morgan = require('morgan');
const flash = require('connect-flash')

//inicializaciones

var app = express();

require('./databases');
require('./passport/local-auth');
app.set('public', path.join(__dirname,'public'));
//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));

app.use(session({
    secret: 'mysecretsession',
    resave: false,
    saveUninitialized:false
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


var server  = app.listen(7070,function(){
	var host = server.address().address;
	var port = server.address().port;
	console.log("Example app listening at htpp://%s:%s",host, port)
});


app.use(morgan('dev'));
app.use(express.static(__dirname + "/public"));



//routes
app.use('/', require('./routes/index'));
/*
var server = https.createServer(options, app).listen(3000, function(){

console.log("https:localhost:3000");
});


*/
