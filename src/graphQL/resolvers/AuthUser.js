const {
    Registrar,
    Login,
    RegistrarAdmin
} = require('../../controllers/auth');

const AuthUserResolver = {
    
    Mutation: {
        
        registrar: (parent, args, context, info) => Registrar(parent, args, context, info),
        
        login: (parent, args, context, info) => Login(parent, args, context, info),
        
        registrarAdmin: (parent, args, context, info) => RegistrarAdmin(parent, args, context, info),
        
    }
};



module.exports = AuthUserResolver;
