var express = require('express');
const router = express.Router();
const passport = require('passport');
const Contacto = require('../modelos/contactos');
const Pedidos = require('../modelos/pedidos');
const misFs = require('../misfunciones');
router.get('/',(req,res, next)=>{
    res.render('index');
});
    
router.get('/signup',(req, res, next) =>{
   res.render('signup.html');
});



router.post('/signup', passport.authenticate('local-signup',{
successRedirect: '/perfilUsaurio.html',
failureRedirect: '/signup.html',
passReqToCallback:true

}));



router.get('/signin', isAuthenticated,(req, res, next) =>{
res.render('signin.html');

});

router.post('/signin', passport.authenticate('local-signin',{
    successRedirect: '/administrador.html',
    failureRedirect: '/signin.html',
    passReqToCallback:true
}));
router.post('/signin', passport.authenticate('local-signin-usuario',{
    successRedirect: '/perfilUsuario.html',
    failureRedirect: '/signin.html',
    passReqToCallback:true
}));
router.get('/logout',(req,res, next)=>{
    req.logout();
    res.redirect('/')
})
 router.get('/pedidos',(req, res, next)=>{
     res.render('/pedidos.html')
 })
 router.post('/pedidoProductos',(req,res, next)=>{
     const pedido = new Pedidos({
      nombre: req.body.nombre,
      apellido:req.body.apellido,
      telefono:req.body.apellido,
      producto:req.body.producto,
      cantidad: req.body.cantidad,
      tipo:req.body.tipo
     })
     
     pedido.save(function(error, documento){
        console.log("--(Pedidos)-->[ BBDD ]");
        if(error){
            console.log("<--error--[ BBDD ]");
        }else{
            console.log(documento);
            console.log("<-- OK --[ BBDD ]");
        };
    });
     console.log(req.body);
     res.res('<h1>Gracias por acer tu pedido pronto estaremos en contacto</h1>');
 })
router.get('/Contacto',(req, res, next) =>{
    res.render('Contacto.html');
 });
 router.post('/cargaContacto',(req, res, next) =>{
    var contacto = new Contacto({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
		Correo: req.body.Correo,
        telefono: req.body.telefono
        

    });
    /*Insertar contacto en la colección*/
    contacto.save(function(error, documento){
        console.log("--(contacto)-->[ BBDD ]");
        if(error){
            console.log("<--error--[ BBDD ]");
        }else{
            console.log(documento);
            console.log("<-- OK --[ BBDD ]");
        };
    });
     console.log(req.body);
     res.send("<h1>Gracias por comunicarte a Catalago Alberdi Estaremos en Contacto</h1>");

 }),
 router.get('/DatosCargado',(req, res, next)=>{
    res.render('DatosCargado.html')
    });

    router.get('/administrador',isAuthenticated, (req, res, next)=>{
        res.render('administrador.html')
        });
        
        function isAuthenticated(req, res, next){
            if(req.isAuthenticated()){
                return next();
            }
            res.redirect('/');
        };
        
        
        router.post('/MostarContacto', (req, res, next)=>{
        
            console.log("--(post/user)-->[ server ]");
             
                Contacto.find({}, function(error,documento){
                    console.log("--(.find())-->[ BBDD ]");
                    if(error){
                        console.log("<-- error --[ BBDD ]");
                    }else{
                        console.log("<-- (contacto)--[ BBDD ]");
                        console.log("Datos obtenidos");
                        console.log(documento.length);
                        valores=[];
                        for(var i=0;i<documento.length;i++){
                            valores[i]="<tr><td>"+documento[i].nombre+"</td>"+"<td>"+documento[i].apellido+"</td>"+"<td>"+
                            documento[i].Correo+"</td>"+"<td>"+documento[i].telefono+ "</td>"+"<td>"+documento[i].leido+"</td></tr>";
                        };
        
                            strMio=misFs.dameColu(valores);
                            strMio=misFs.cabecera()+"<table class='table table-bordered table-dark'><tr><td>Nombre</td><td>Apellido</td>"+
                            "<td>Correo</td><td>Teléfono</td><td>Leído</td></tr>"+strMio+"</table>";                    
                            console.log("<-- (Listado de clientes)--[server]");
                            res.send(strMio);                
        
                    }
                });
            });
            router.post('/mostrarPedidos', (req, res, next)=>{
        
                console.log("--(post/user)-->[ server ]");
                 
                    Pedidos.find({}, function(error,documento){
                        console.log("--(.find())-->[ BBDD ]");
                        if(error){
                            console.log("<-- error --[ BBDD ]");
                        }else{
                            console.log("<-- (pedidos)--[ BBDD ]");
                            console.log("Datos obtenidos");
                            console.log(documento.length);
                            valores=[];
                            for(var i=0;i<documento.length;i++){
                                valores[i]="<tr><td>"+documento[i].nombre+"</td>"+"<td>"+documento[i].apellido+"</td>"+"<td>"+
                                documento[i].telefono+ "</td>"+"<td>"+documento[i].producto+"</td>"+"<td>"+
                                documento[i].cantidad+"</td>"+"<td>"+documento[i].tipo+"</td>"+"<td></tr>";
                            };
            
                                strMio=misFs.dameColu(valores);
                                strMio=misFs.cabecera()+"<table class='table table-bordered table-dark'><tr><td>Nombre</td><td>Apellido</td>"+
                                "<td>Teléfono</td><td>Producto</td><td>cantidad</td><td>Tipo</td></tr>"+strMio+"</table>";                    
                                console.log("<-- (Listado de clientes)--[server]");
                                res.send(strMio);                
            
                        }
                    });
                });
           
            var i = 0;
            var valores = [];
            var _id =[];
            router.get('/modificar1',function(req,res){
                console.log("--get('modificar1..-->[server]");
                /*  consulto por todos los registros  */
                        Contacto.find({}, function(error,documento){
                        if(error){
                            console.log("error");
                        }else{
            
                            for(i=0;i<documento.length;i++){
                                /* cargo el vector valores con documento */
                                valores[i]=documento[i].nombre+"  "+
                                            documento[i].apellido+"  "+
                                            documento[i].Correo+"   "+
                                            documento[i].telefono+"  "+
                                            documento[i].leido;

                                _id[i] = documento[i]._id;
                            };
                            /* obtengo selector a partir de vectores */
                            strMio=misFs.dameSelector(_id,valores);
                            /* agrego la cabecera */
                            strMio=misFs.cabecera()+
                            "<table class='table table-bordered'>"+strMio+"</table>";
                            /* agrego los controles de los datos de entrada */
                            var strEntradaDatos = misFs.entradaDatos();
                            /* agrego todo a un formulario */
                            var strtmp = misFs.dameBoton("modificar2","POST",strMio+strEntradaDatos); 
                            /* devuelvo todo al cliente */ 
                            res.send(strtmp);              
            
                        }
                    });
                //res.send("<a href='/index.html' >Volver</a>")
            });

            router.post('/modificar2',function(req,res){
                console.log(" --'/modificar2 -->[server]");
            
            /** Consulta de actualización por _id  */
                console.log("-- nuevos datos--->[Base de Datos]")
                Contacto.updateOne({_id : req.body.opcion },
                    {$set:{
                        leido: req.body.leido
                        }
                    }, {upsert: true},function(error){
                        if(error){
                            console.log("<-- ERROR -----[ BBDD ]");
                        }else{
                            console.log("<---  OK ------[ BBDD ]");
                        }
                });
                res.redirect('/administrador.html');
            
            });
           

module.exports = router;