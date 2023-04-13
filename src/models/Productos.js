const mongoose = require('mongoose');
//const uniqueValidator = require('mongoose-unique-validator');

const schema = mongoose.Schema({
    
    codigo: {
        type: String,
        required: [true, "Se requiere el codigo de productos."]
    },

    tipo:{
        type: String,
        enum: ["collar", "pulsera", "anillo"],
        required: [true, "Se requiere el tipo de productos."]
    },
    
    categoria:{
        type: String,
        enum: ["artesanal", "Indigena", "Moda"],
        required: [true, "Se requiere la categoria del productos."]
    },
    
    nombre:{
        type: String,
        required: [true, "Se requiere el tipo de productos."]
    },
    
    descripcion:{
        type: String,
        required: [true, "Se requiere el tipo de productos."]
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

module.exports = mongoose.model('Producto', schema);