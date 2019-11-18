var express = require('express');
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

var misFs = require('./public/misfunciones');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ContactosAlberdi',{ useNewUrlParser: true })

var db = mongoose.connection;
db.once('open', function(){
    console.log("Base de datos conectada.");
});



/*--------------------- Esquema para la base de datos------------------- */
var ContactoSchema = mongoose.Schema({
    nombre: String,
    apellido: String,
    correo: String,
    telefono: Number,
    mensaje: String,
});

var Contacto = mongoose.model('Contacto',ContactoSchema);



//import body-parser
var bodyParser = require('body-parser');

//creamos un servidor que escucha en el puerto 7070 y envia un mensaje
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
/* ----------permitimos a express acceder a nuestro archivo (Contacto.html)--------------------- */
app.get('/Contacto.html', function(req, res) {

        res.sendFile(__dirname + "/" + "Contacto.html");
        console.log(__dirname + "/" + "Contacto.html")
        var respuesta = misFs.cabecera();

    });


app.post('/carga',function(req,res){
    console.log("--(post/carga)-->[server]");

    /*Instancio un objeto documento de la clase Cliente*/
    var contacto = new Contacto({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        correo: req.body.correo,
        telefono: req.body.telefono,
        mensaje: req.body.mensaje,
    });
    /*Insertar cliente en la colección*/
    contacto.save(function(error, documento){
        console.log("--(cliente)-->[ BBDD ]");
        if(error){
            console.log("<--error--[ BBDD ]");
        }else{
            console.log(documento);
            console.log("<-- OK --[ BBDD ]");
        };
    });
    console.log("<--( <a index.html>) --[ server ]");

    res.send("<p>Cargado</p><a href='/Contacto.html' >Volver</a>");

});

/*---------------------------------FIN FORMULARIO-----------------------------*/

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