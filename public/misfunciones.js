/*  Este archivo contiene mis funciones
	de uso frecuente                     */

exports.cabecera = function (){
    return "<h1>Formulario de contacto</h1><h2>Ingrese sus datos y en breve nos pondremos en contacto con usted.</h2>"
};

 exports.dameFila = function(vector){
    console.log("-- (vector)-->[dameFila]");
    retorno="";
    var i=0;
    for(i=0;i<vector.length;i++){
        retorno = retorno +"<td>"+vector[i]+"</td>";
    };
    console.log("<-- retorno-- [dameFila]");
    return retorno;
}

 exports.dameColu = function(vector){
    console.log("-- (vector)-->[dameColu]");
    retorno="";
    var i=0;
    for(i=0;i<vector.length;i++){
        retorno = retorno +"<tr><td>"+vector[i]+"</td></tr>";
    };
    console.log("<-- retorno-- [dameColu]");
    return retorno;
}

exports.dameSelector = function(vector_Id,vector){
    console.log("-- dameSelector(vector)-->[misfunciones]");
    console.log("<----- (radio+tabla)------[misfunciones]");
    retorno="";
    var i=0;
    for(i=0;i<vector.length;i++){
        retorno = retorno +
        "<tr><td><input type='radio' name='opcion' value='"+
        vector_Id[i]+"'></td><td>"+vector[i]+"</td></tr>";
    };

    return retorno;
}


exports.dameBoton = function(accion,metodo,control){
    console.log("-- dameBoton( , , )--> [misfunciones]");
    console.log("<--- <form>...</form>- [misfunciones]");

    return"<form action='/"+accion+"' method='"+metodo+"'>"+
        control+
        "<input type='submit' value='Guardar datos'>"+
        "</form>";
}

exports.entradaDatos = function(){
    console.log("-- entradaDatos() -->[misfunciones]");
    console.log("<--<input type=text--[misfunciones]");
    return '<p>Nombre: <input type="text" name="nombre"></p>'+
    '<p>Apellido: <input type="text" name="apellido"> </p>'+
    '<p> Correo electronico: <input type="text" name="correo"> </p>' +
    '<p> Teléfono: <input type="number" name="telefono"> </p>';
};


