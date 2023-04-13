const mongoose = require('mongoose');
//const uniqueValidator = require('mongoose-unique-validator');

const schema = mongoose.Schema({
    
    nombre: {
        type: String,
        required: [true, "Se requiere el nombre del inventario a registrar."]
    },

    fecha:{
        type: Date,
        required: [true, "Se requiere la fecha del inventarioa a registrar."]
    },
    responsable: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Administrador',
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

module.exports = mongoose.model('InventarioRegistro', schema);