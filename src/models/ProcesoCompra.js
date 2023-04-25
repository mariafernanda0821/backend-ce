const mongoose = require('mongoose');
//const uniqueValidator = require('mongoose-unique-validator');

const schema = mongoose.Schema({
    
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserId',
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MetodoPago',
    },
    
    status: {
        type: String
    },

    delete: {
       type: Boolean,
       default: false
    },

    montoTotal: {
        type: Number
    },

    procesoBanco: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProcesoBanco',
    }
}, {

    timestamps: true

});

// Apply uniqueValidator plugin to userSchema
//This email address is already registered
//schema.plugin(uniqueValidator, { message: 'El {PATH} ya esta registrado.'});

module.exports = mongoose.model('ProcesoCompra', schema);