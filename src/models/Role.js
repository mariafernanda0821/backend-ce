const mongoose = require('mongoose');

const schema = mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true, 
        unique: true,
        lowercase: true
    },
    description: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    
},{
    
    timestamps: true
    
});

module.exports = mongoose.model('Role', schema)