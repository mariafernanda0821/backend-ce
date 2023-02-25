//const { combineResolvers } = require('graphql-resolvers');

const { isAuthenticated } = require('../../middlewares/isAuthenticated');


const {
    signutAdminCampany,
    signutCompany,
    signutAdmin,
    MagicLinkLoginAdmin,
    LoginUserAdmin,
} = require('../../controllers/web/auth');


const AuthCampanyResolver = {
    
    Mutation: {
        registerCampanyApp: (parent, args, context, info) => signutCompany(parent, args, context, info),
        magicLinkLoginAdmin: (parent, args, context, info) => MagicLinkLoginAdmin(parent, args, context, info), 
        loginAdmin: (parent, args, context, info) => LoginUserAdmin(parent, args, context, info),

    }
};



module.exports = AuthCampanyResolver;
