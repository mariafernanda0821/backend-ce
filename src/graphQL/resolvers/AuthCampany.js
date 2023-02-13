//const { combineResolvers } = require('graphql-resolvers');

const { isAuthenticated } = require('../../middlewares/isAuthenticated');


const {
    signutCompany,
} = require('../../controllers/auth');


const AuthCampanyResolver = {
    
    Mutation: {
        registerCampanyApp: (parent, args, context, info) => signutCompany(parent, args, context, info),
    }
};



module.exports = AuthCampanyResolver;
