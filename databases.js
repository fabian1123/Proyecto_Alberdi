
const mongoose = require('mongoose');

const { mongodb } = require('./keys');

mongoose.connect(mongodb.URI, {useNewUrlParser:true, useUnifiedTopology: true})
.then(db => console.log('Hola la Base de Datos conectada :)'))
.catch(err => console.error(err));