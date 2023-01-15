const mongoose = require('mongoose');
const {COMPANY_TYPE} = require('./enum');


const schema = mongoose.Schema({
    
    UserId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    name: {
        type: String,
        required: [true, ''],
        trim: true,
        unique: true,
        lowercase: true

    },
    type: {
        type: String,
        required: true,
        trim: true,
        enum: COMPANY_TYPE
    },

    address: [{
        postCode: {
            type: Number
        },
        address: {
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
    
}, {

    timestamps: true

});


module.exports = mongoose.model('Business', schema)