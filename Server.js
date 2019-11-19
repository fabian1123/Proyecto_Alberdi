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


        /*--------------------- Esquema de las Collectiones de la base de datos------------------- */
        var ContactoSchema = mongoose.Schema({
            nombre: String,
            apellido: String,
            correo: String,
            telefono: Number,
            mensaje: String,
        });
        var UsuarioSchema = mongoose.Schema({
            usuario: String,
            contraseña: String,
         });
        var Contacto = mongoose.model('Contacto',ContactoSchema);
        var Usuario = mongoose.model('Usuario',UsuarioSchema);


        /*----------------------creamos un servidor que escucha en el puerto 7070 y envia un mensaje-----*/
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

            });
        app.get('/Login.html', function(req,res){
                res.sendFile(__dirname + "/Login.hrml");
                console.log(__dirname + "/Login.html")

        });
        app.get('/accionesLogin.html', function(req, res) {
            console.log("---.get('/accionesLogin.html-->[server]");

                res.sendFile(__dirname + "/accionesLogin.html");

        });



           app.post('/carga',function(req,res,next){
                        console.log("--(post/carga)-->[server]");
    //-----Instancio un objeto documento de la clase Cliente
                var contacto = new Contacto({
                    nombre: req.body.nombre,
                    apellido: req.body.apellido,
                    correo: req.body.correo,
                    telefono: req.body.telefono,
                    mensaje: req.body.mensaje,
                });
        //-Inserta en la colección
           // cliente
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

                res.send("<h2><center>Datos cargados exitosamente</center></h1><a href='/Contacto.html' ><center>Volver</center></a>");

            });
               /*--------------------Carga los datos por 1 vez--------------*/
              app.post('/cargaLogin',function(req,res){
                            console.log("--(post/carga)-->[server]");
                  var users = new Usuario({
                                   usuario: req.body.usuario,
                                   contraseña: req.body.contraseña,
                               });
              //usuarios
                         users.save(function(error, documento){
                               console.log("--(cliente)-->[ BBDD ]");
                               if(error){
                                  console.log("<--error--[ BBDD ]");
                                }else{
                                console.log(documento);
                               console.log("<-- OK --[ BBDD ]");
                                };
                             });
                             console.log("<--( <a index.html>) --[ server ]");
                             res.send("<h2><center>Usted se há logueado exitosamente!</center></h1><a href='/Login.html'><center>Volver</center></a>");

                   });


        app.post("/validar", function (req,res,next){

          Usuario.findOne({ usuario: req.body.usuario, contraseña: req.body.contraseña },
          function(err, usuarioEncontrado){
            if (err) throw err;


            if(usuarioEncontrado) {
              //usuario existe
              res.send("<h2> Usuario validado correctamente </h2>" + usuarioEncontrado +"<p><a href='/validacion.html'>Acciones de Usuario</a></p>");
            } else {
              //usuario no existe
              res.send("<h2> El usuario no existe </h2>");
            }
        }).catch(error => res.send({error}));

   });
   /*-----------------Busca los datos de los Contactos----------------*/
       app.post('/user', function(req, res){
               /* Recuperar registros */
               Contacto.find({}, function(error,documento){
                   if(error){
                       console.log("<-- error --[ BBDD ]");
                   }else{
                       console.log("<-- (clientes)--[ BBDD ]");
                       console.log("Datos obtenidos");
                       console.log(documento.length);
                       valores=[];
                       for(var i=0;i<documento.length;i++){
                            valores[i]=documento[i].nombre+
                                   " "+documento[i].apellido+
                                   " "+documento[i].correo+
                                   " "+documento[i].telefono;
                       };
                           strMio=misFs.muestraDatos(valores);
                           mostrar="<table border=1>"+strMio+"</table>";
                           res.send("<h2>Listado de clientes</h2>" + mostrar +"<a href='/accionesLogin.html' >Volver</a>");


                   }
               });

           });
    /*---------------------------------FIN FORMULARIO-----------------------------*/

