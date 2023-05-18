const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const schema = mongoose.Schema({
    
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido.'],
        trim: true,
        lowercase: true
    },
    
    apellido: {
        type: String,
        required: [true, 'El apellido es requerido.'],
        trim: true,
        lowercase: true
    },

    password: {
        type: String,
        required: [true, 'Contrasena es requerido.'],
       
    },
    
    email: {
        type: String,
        required: [true, 'El correo Electronico es querido.'],
        trim: true,
        unique: true,
        lowercase: true,
    },
    
    active: {
        type: Boolean,
        trim: true,
        default: true
    },
    
    photo: {
        type: String,
        trim: true,
        //default: null
    },
    
    role: {
        type: String,
        enum: ['userApp', 'admin'],
        default: 'userApp'
    },

    paymentMethods: [{
        paymentMethodId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'PaymentMethod',
        },
        data: {
            type: Object,
            default: null
        },
    }],

    delete: {
       type: Boolean,
       default: false
    },

}, {

    timestamps: true

});

// Apply uniqueValidator plugin to userSchema
//This email address is already registered
schema.plugin(uniqueValidator, { message: 'El {PATH} ya esta registrado.'});

module.exports = mongoose.model('User', schema);