const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const schema = mongoose.Schema({
    
    credenciales: {
        type: String
    },
    
    active: {
        type: Boolean,
        trim: true,
        default: true
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
schema.plugin(uniqueValidator, { message: 'El {PATH} ya esta registrado.'});

module.exports = mongoose.model('Administrador', schema);