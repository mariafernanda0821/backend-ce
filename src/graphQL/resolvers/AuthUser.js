//const { combineResolvers } = require('graphql-resolvers');

const { isAuthenticated } = require('../../middlewares/isAuthenticated');


const {
    loginOrRegistreUserApp,

} = require('../../controllers/app/authUser');


const AuthUserResolver = {
    
    // Query: {
    //     _: 'String'
    // },
    
    Mutation: {
        loginOrRegistreUserApp: (parent, args, context, info) => loginOrRegistreUserApp(parent, args, context, info),
    
    }
};



module.exports = AuthUserResolver;
