//const { combineResolvers } = require('graphql-resolvers');

const { isAuthenticated } = require('../../middlewares/isAuthenticated');


const {
    SignutUserApp, 
    MagicLinkLogin,
    LoginUser,
    ForgotPassword,
    ChangePasswordByCode,
} = require('../../controllers/app/authUser');

const AuthUserResolver = {
    
    // Query: {
    //    // MagicLinkLogin: (parent, args, context, info) => MagicLinkLogin(parent, args, context, info),
    
    // },
    
    Mutation: {
        magicLinkLogin: (parent, args, context, info) => MagicLinkLogin(parent, args, context, info), 
        
        registerUserApp: (parent, args, context, info) => SignutUserApp(parent, args, context, info),
        
        login: (parent, args, context, info) => LoginUser(parent, args, context, info),
        
        forgotPassword: (parent, args, context, info) => ForgotPassword(parent, args, context, info),
        
        changePasswordByCode: (parent, args, context, info) => ChangePasswordByCode(parent, args, context, info),
        //: (parent, args, context, info) => (parent, args, context, info),
        
    }
};



module.exports = AuthUserResolver;
