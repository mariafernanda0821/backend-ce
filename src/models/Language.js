const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true, 
        unique: true,
        lowercase: true
    },
    nativeName: {
        type: String,
        required: true,
        trim: true
    },
    
},{
    
    timestamps: true
    
});

module.exports = mongoose.model('Lenguage', schema)