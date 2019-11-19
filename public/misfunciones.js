/*  Este archivo contiene mis funciones
	de uso frecuente                     */

 exports.muestraDatos = function(vector){
    console.log("-- (vector)-->[muestraDatos]");
    retorno="";
    var i=0;
    for(i=0;i<vector.length;i++){
        retorno = retorno +"<tr><td>"+vector[i]+"</td></tr>";
    };
    console.log("<-- retorno-- [muestraDatos]");
    return retorno;
}



