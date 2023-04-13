const mongoose = require('mongoose');
//const uniqueValidator = require('mongoose-unique-validator');

const schema = mongoose.Schema({
    
    productos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Productos',
        }
    ],
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Se requiere el usuario del carrito."]
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

module.exports = mongoose.model('Carrito', schema);