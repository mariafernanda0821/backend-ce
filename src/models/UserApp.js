
const mongoose = require('mongoose');
//const {VEHICLE_TYPE} = require('./enum');



const schema = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required.']
    },
    campanyId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Campany',
    },
    vehicle:[{
        make:{
            type: String,
        }, // DROPDOWN: We could find a schema that includes all vehicles.
        model: {
            type: String
        }, 
        year: {
            type: String
        }, // Just the year component of date and time schema
        colour: {
            type: String,
        },
        licencePlate:{
            type: String,
        } 
    }],
},{
    
    timestamps: true
    
});

module.exports = mongoose.model('UserApp', schema)