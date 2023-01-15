const mongoose = require('mongoose');

const schema = mongoose.Schema({
    
    UserId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    
    companyId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Business',
        required: true
    }
}, {

    timestamps: true

});

module.exports = mongoose.model('User', schema);