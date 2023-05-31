const {
    Registrar,
    Login,
    RegistrarAdmin,
    Usuario,
    UsuariosApp,
} = require('../../controllers/auth');

const AuthUserResolver = {
    Query :{
        usuario: (parent, args, context, info) => Usuario(parent, args, context, info),
        usuariosClientes: (parent, args, context, info) => UsuariosApp(parent, args, context, info),
    },

    Mutation: {
        
        registrar: (parent, args, context, info) => Registrar(parent, args, context, info),
        
        login: (parent, args, context, info) => Login(parent, args, context, info),
        
        registrarAdmin: (parent, args, context, info) => RegistrarAdmin(parent, args, context, info),
        
    }
};



module.exports = AuthUserResolver;
