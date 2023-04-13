const mongoose = require('mongoose');
//const uniqueValidator = require('mongoose-unique-validator');

const schema = mongoose.Schema({
   
    nombre:{
        type: String,
        required: [true, "Se requiere el nombre de la categoria"]
    },
    descripcion:{
        type: String,
        required: [true, "Se requiere la descripcion de la categoria."]
    },
    delete: {
       type: Boolean,
       default: false
    },

}, {

    timestamps: true

});

// Apply uniqueValidator plugin to userSchema
//This email address is already registered
//schema.plugin(uniqueValidator, { message: 'El {PATH} ya esta registrado.'});

module.exports = mongoose.model('Categoria', schema);