
const mongoose = require('mongoose');
const {VEHICLE_TYPE} = require('./enum');



const schema = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        requered: [true, '']
    },
    type: {
        type: String,
        emun: VEHICLE_TYPE
    }
    //esquema
},{
    
    timestamps: true
    
});

module.exports = mongoose.model('NombreColleccion', schema)