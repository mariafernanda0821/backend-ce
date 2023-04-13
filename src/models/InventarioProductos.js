const mongoose = require('mongoose');
//const uniqueValidator = require('mongoose-unique-validator');

const schema = mongoose.Schema({
    
    inventarioRegistroId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'InventarioRegistro',
        required:[true, "Se requiere agregar el a que inventario de registro"]
    },
    productoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Producto',
        required: [true, "Se requiere especificar el producto."]
    },
    cantidadDisponible: {
        type: Number,
        required: [true, "Se requiere la cantidad disponible del producto."]
    },
    cantodadInicial: {
        type: Number,  
        required: [true, "Se requiere la cantidad inicial del producto."]
    },
    cantidadVentida: {
        type: Number,
        required: [true, "Se requiere la cantidad vendida del producto del producto."]
    },
    costoIndividual: {
        type: Number,
        required: [true, "Se requiere el precio  del producto."]
    },
    activo: {
        type: Boolean,
        default: true,
    }

}, {

    timestamps: true

});

// Apply uniqueValidator plugin to userSchema
//This email address is already registered
//schema.plugin(uniqueValidator, { message: 'El {PATH} ya esta registrado.'});

module.exports = mongoose.model('InventarioProducto', schema);