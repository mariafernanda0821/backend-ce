//const { combineResolvers } = require('graphql-resolvers');

const { isAuthenticated } = require('../../middlewares/isAuthenticated');


const {
    MagicLinkLogin,
    SignutUserApp
} = require('../../controllers/app/authUser');


const AuthUserResolver = {
    
    Query: {
       // MagicLinkLogin: (parent, args, context, info) => MagicLinkLogin(parent, args, context, info),
    
    },
    
    Mutation: {
        MagicLinkLogin: (parent, args, context, info) => MagicLinkLogin(parent, args, context, info), 
        registerUserApp: (parent, args, context, info) => SignutUserApp(parent, args, context, info),
    }
};



module.exports = AuthUserResolver;
