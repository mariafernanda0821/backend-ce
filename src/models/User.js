const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const schema = mongoose.Schema({
    
    firstName: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        lowercase: true
    },
    
    lastName: {
        type: String,
        required: [true, 'Last Name is required'],
        trim: true,
        lowercase: true
    },
    
    phone: {
        code:{
            type: String,
            required: [true, 'Se required code phone.'],
            trim: true,
            lowercase: true
        },
        number:{
            type: String,
            required: [true, 'Phone is required.'],
            trim: true,
            lowercase: true
        }
    },
    
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        unique: true,
        lowercase: true,
       // validate: [true, 'Please fill a valid email address'],

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
    
    roleId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
        required: [true, 'User role required.']
    }],

    paymentMethods: [{
        paymentMethodId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'PaymentMethod',
        },
        customerId: {
            type: String,
        },
    }],

    magicLink:{
        issuer:{
            type: String,
            trim: true,
        },
        publicAddress:{
            type: String,
            trim: true,
        }
    },

    delete: {
        deleted: {
            type: Boolean,
            default: false
        },
        reason: {
            type: String,
            require: false
        }
    },

}, {

    timestamps: true

});

// Apply uniqueValidator plugin to userSchema
//This email address is already registered
schema.plugin(uniqueValidator, { message: 'This {PATH} address is already registered'});

module.exports = mongoose.model('User', schema);