const mongoose = require('mongoose');
const { Schema } = mongoose;
const contactoSchema = new Schema ({
  
        nombre: String,
        apellido: String,
		Correo: String,
        telefono: Number,
        leido: String
});
module.exports = mongoose.model('contactos', contactoSchema);