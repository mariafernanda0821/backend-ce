const mongoose = require('mongoose');


const schema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    code: {
        type: String, 
        require: true,
    },
}, {

    timestamps: true

});


module.exports = mongoose.model('Authorization', schema)