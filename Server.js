var fs = require('fs');
var https = require('https');
var express = require('express');

   
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

/*
var options = {

 key: fs.readFileSync('/home/flavia/Escritorio/grupo\ 2/Proyecto_Alberdi/ssl/Server.key'),
 cert: fs.readFileSync('/home/flavia/Escritorio/grupo\ 2/Proyecto_Alberdi/ssl/Server.crt'),
 requestCert:false,
 rejectUnauthorized:false
};*/

var server  = app.listen(7070,function(){
	var host = server.address().address;
	var port = server.address().port;
	console.log("Example app listening at htpp://%s:%s",host, port)
});
 

app.use(express.static(__dirname + "/public"));

//routes

app.get("/",function(req, res){
	res.render("index");

});

/*var server = https.createServer(options, app).listen(3000, function(){

console.log("https:localhost:3000");
});*/


var miVector = [];
app.post('/enviarInfo',function(req,res){
	console.log("/enviarInfo - POST");
	console.log(req.body.apellido);
	
	miVector.push(req.body.apellido);
	miVector.push(req.body.nombre);
	miVector.push(req.body.Correo);
	miVector.push(req.body.telefono);
	res.send("<h1>se envio con exito el formulario</h1>")
});
 
app.get('/devolverTabla',function(req,res){
	res.send(dameTabla(miVector));
});
function dameTabla(Vect){
	var str ="";
	var i=0;
	for(i=0;i<Vect.length;i++){
		str =str +"<td>"+Vect[i]+"</td>";
	};
	str = "<table border = 1><tr>"+str+"</tr></table>"
	console.log(str);
	return str;
}


var usuarios = [];
app.post('/enviarDatos',function(req,res){
	console.log("/enviarDatos - POST");
	console.log(req.body.usuario);
	console.log(req.body.contraseña);
	
	usuarios.push(req.body.usuario);
	usuarios.push(req.body.contraseña);
	res.send('se ha logueado con exito')
});

app.get('/devolverDatos',function(req,res){
	res.send(dameTabla2(usuarios));
});

function dameTabla2(Vect2){
	var str2 ="";
	var i=0;
	for(i=0;i<Vect2.length;i++){
		str2 =str2 +"<td>"+Vect2[i]+"</td>";
	};
	str2 = "<table border = 1><tr>"+str2+"</tr></table>"
	console.log(str2);
	return str2;
}
