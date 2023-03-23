const {
    Registrar,
    Login
} = require('../../controllers/auth');

const AuthUserResolver = {
    
    Mutation: {
        
        registrar: (parent, args, context, info) => Registrar(parent, args, context, info),
        
        login: (parent, args, context, info) => Login(parent, args, context, info),
        
        
    }
};



module.exports = AuthUserResolver;
