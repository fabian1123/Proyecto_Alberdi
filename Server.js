var express = require('express');
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

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


