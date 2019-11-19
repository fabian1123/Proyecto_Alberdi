const mongoose = require('mongoose');
const { Schema } = mongoose;
const pedidoSchema = new Schema ({
    nombre: String,
    apellido: String,
    telefono:Number,
    producto: String,
    cantidad: Number,
    tipo: String
});
module.exports = mongoose.model('pedidos', pedidoSchema);