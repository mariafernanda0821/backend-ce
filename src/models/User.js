const mongoose = require('mongoose');

const schema = mongoose.Schema({
    
    firstName: {
        type: String,
        required: [true, ''],
        trim: true,
        lowercase: true
    },
    
    lastName: {
        type: String,
        required: [true, ''],
        trim: true,
        lowercase: true
    },
    
    phone: {
        code: {
            type: String,
            trim: true,
            lowercase: true
        },
        number: {
            type: String,
            trim: true,
            lowercase: true
        }

    },
    
    email: {
        type: String,
        required: [true, ''],
        trim: true,
        unique: [true, ''],
        lowercase: true
    },
    
    active: {
        type: Boolean,
        trim: true,
        default: true
    },
    
    profilePhoto: {
        type: String,
        trim: true,
        default: null
    },
    
    roleId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
        required: [true, '']
    }],

    paymentMethods: [{
        paymentMethodId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'PaymentMethod',
            //required: true
        },
        customerId: {
            type: String,
            //required: true,
        },
    }],

    socialNetworkId: {
        googleId: {
            type: String,
            required: false
        },
        facebookId: {
            type: String,
            required: false
        },
        appleId: {
            type: String,
            required: false
        },
    },

    delete: {
        deleted: {
            type: Boolean,
            default: true
        },
        reason: {
            type: String,
            require: false
        }
    },

    companyId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Business',
        required: false
    }
}, {

    timestamps: true

});

module.exports = mongoose.model('User', schema)