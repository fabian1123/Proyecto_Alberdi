

exports.cabecera = function (){
    return "<link rel='stylesheet' href='css/bootstrap.min.css'><link rel='stylesheet' href='css/style.css'>"+
    "<h2>Cátalogo Alberdi:</h2><br>"
   
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
        "<input type='submit' value='enviar'>"+
        "</form>";
}

exports.entradaDatos = function(){
    console.log("-- entradaDatos() -->[misfunciones]");
    console.log("<--<input type=text--[misfunciones]");
    return '<p> Leido: <select name="leido">'+
    
    '<option value="leido">Leido</option>'+
    '</select> </p>'
};


