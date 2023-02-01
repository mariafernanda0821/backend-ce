const mongoose = require('mongoose');

const schema = mongoose.Schema({
    
    UserId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    
    companyId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    }, 

    towTruck:[{
        make: {
            type: String,
        }, // DROPDOWN: We could find a schema that includes all vehicles.
        
        model:{
            type: String
        },
         
        year:{
            type: Date(),
        } ,  // Just the year component of date and time schema
        colour:{
            type: String
        },

        licencePlate: {
            type: String
        },
    }],

    driversLicence:{
        type: String 
    },

    towTruckLicencePlate:{
        type: String 

    },
}, {

    timestamps: true

});

module.exports = mongoose.model('User', schema);