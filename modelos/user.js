const mongoose = require('mongoose');
const { Schema } = mongoose;
const userSchema = new Schema ({
    usuario: String,
    contraseña: String
});
module.exports = mongoose.model('users', userSchema);