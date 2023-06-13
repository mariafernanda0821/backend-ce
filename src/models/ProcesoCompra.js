const mongoose = require('mongoose');
//const uniqueValidator = require('mongoose-unique-validator');

const schema = mongoose.Schema({
    
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:[true, "Se requiere el usario de la compra."]
    },

    compra:[
        {
            cantidad: {
                type: Number,
            },
            inventarioProductoId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'InventarioProducto',
            }
        }
    ],
    
    metodoPago: {
        tipo:{
            type: String,
        },
        dato: {
            tarjeta: {type: String},
            nombre: {type: String},
            cvc: {type: String},
            fecha:{type: Date},
            fechaVencimiento: {type: String},
            criptomoneda: {type: String},
        }
        
    },
    
    status: {
        type: String,
        enum: ['proceso', 'finalizada', 'rechazada'],
        default: 'proceso'
    },

    montoTotal: {
        type: Number
    },

    referenciaBanco: {
       type: String
    }
}, {

    timestamps: true

});

// Apply uniqueValidator plugin to userSchema
//This email address is already registered
//schema.plugin(uniqueValidator, { message: 'El {PATH} ya esta registrado.'});

module.exports = mongoose.model('ProcesoCompra', schema);