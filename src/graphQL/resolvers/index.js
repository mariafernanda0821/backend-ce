const { HelloResolver } = require('./hello');
const UserResolver = require('./User');
const AuthUserResolver = require('./AuthUser');
const AuthCampanyResolver = require('./AuthCampany');



module.exports = {
    HelloResolver,
    UserResolver, 
    AuthUserResolver,
    AuthCampanyResolver
}