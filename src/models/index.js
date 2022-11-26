const Country = require('./Country');
const Currency = require('./Currency');
const Lenguage = require('./Language');
const Role = require('./Role');
const PaymentMethods = require('./PaymentMethod');

module.exports = {
    Role,
    PaymentMethods,
    //Lenguage,
    //Currency,
    //Country
}

// const mongoose = require('mongoose');

// const schema = mongoose.Schema({

//     //esquema
// },{
    
//     timestamps: true
    
// });

// module.exports = mongoose.model('NombreColleccion', schema)