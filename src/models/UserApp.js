
const mongoose = require('mongoose');
//const {VEHICLE_TYPE} = require('./enum');



const schema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required.']
    },

    campanyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Campany',
    },

    vehicleId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle',
    }],
}, {

    timestamps: true

});

module.exports = mongoose.model('UserApp', schema)