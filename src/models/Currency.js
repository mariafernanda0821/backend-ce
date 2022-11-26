const mongoose = require('mongoose');

const schema = mongoose.Schema({
    code: {
        type: String,
        required: true,
        trim: true, 
        unique: true
    },
    name: {
        type: String,
        required: true,
        trim: true, 
        unique: true,
        lowercase: true
    },
    symbol: {
        type: String,
        required: true,
        trim: true
    },
    
},{
    
    timestamps: true
    
});

module.exports = mongoose.model('Currency', schema)