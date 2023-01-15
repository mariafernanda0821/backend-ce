const {
    loginOrRegistre,

} = require('../../controllers/app/authUser');


const UserResolver = {
    
    Query: {
        Hello: () => 'hello wordl Maria Fernanda'
    },
    
    Mutation: {
        createUser: (parent, args, context, info) => loginOrRegistre(parent, args, context, info),
    }
};



module.exports = UserResolver;
