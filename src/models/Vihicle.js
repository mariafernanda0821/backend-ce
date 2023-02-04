
const mongoose = require('mongoose');

const schema = mongoose.Schema({
    make: {
        type: String,
        trim: true,
        required: [true, 'Make is required.'],
        lowercase: true
    }, 
    model: {
        type: String,
        trim: true,
        required: [true, 'Model is required.'],
        lowercase: true
    },
    year: {
        type: String,
        trim: true,
        required: [true, 'Year is required.'],
        lowercase: true
    }, // Just the year component of date and time schema
    colour: {
        type: String,
        required: [true, 'colour is required.'],
        trim: true,
        lowercase: true
    },
    licencePlate: {
        type: String,
        required: [true, 'Licence Plate is required.'],
        trim: true,
    },
    deleted:{
        type: Boolean,
        default: false,
    }

}, {

    timestamps: true

});

module.exports = mongoose.model('Vehicle', schema)