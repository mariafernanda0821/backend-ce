const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const schema = mongoose.Schema({
    
    productoId: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Productos',
        }
    ],
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique:true,
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
schema.plugin(uniqueValidator, { message: 'El {PATH} ya tiene carrito.'});

module.exports = mongoose.model('Carrito', schema);