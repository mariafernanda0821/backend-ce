const {searchUserApp} = require('../../controllers/app/User');


const UserResolver = {
    
    Query: {
        User: (parent, args, context, info) => searchUserApp(parent, args, context, info),
       // Hello: () => 'hello wordl Maria Fernanda'
    },
    
    // Mutation: {
        
    // }
};



module.exports = UserResolver;
