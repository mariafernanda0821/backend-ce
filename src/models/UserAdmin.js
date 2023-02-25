
const mongoose = require('mongoose');
//const {VEHICLE_TYPE} = require('./enum');



const schema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required.']
    },

    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
    },
    
    owner:{
        type: Boolean,
        default: false,
    }

}, {

    timestamps: true

});

module.exports = mongoose.model('UserAdmin', schema)