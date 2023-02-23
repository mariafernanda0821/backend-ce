const mongoose = require('mongoose');
const {COMPANY_TYPE} = require('./enum');


const schema = mongoose.Schema({
    
    name: {
        type: String,
        required: [true, ''],
        trim: true,
        unique: true,
        lowercase: true

    },
 
    userOwnerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User Owner required.']
    },
    
    roleId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
        required: [true, 'Company role required.']
    }],

    address: [{
        postCode: {
            type: String
        },
        address01: {
            type: String
        },
        address02: {
            type: String
        },
        city:{
            type: String 
        },
        state:{
            type: String

        },
        ref: {
            type: String
        }
    }],
    
    active: {
        type: Boolean,
        trim: true,
        default: true
    },

    phone:[ {
        code:{ 
            type: String,
            trim: true,
            default: '+00',
            lowercase: true
        },
        number:{
            type: String,
            required: [true, 'Phone is required.'],
            trim: true,
            lowercase: true
        }
    }]
}, {

    timestamps: true

});


module.exports = mongoose.model('Company', schema)