const { HelloResolver } = require('./hello');
//const UserResolver = require('./User');
const AuthUserResolver = require('./AuthUser');

const ProductosInventariosResolver = require('./ProductosInventarios');

module.exports = {
    HelloResolver,
    ProductosInventariosResolver,
    AuthUserResolver,
    // UserResolver, 
}