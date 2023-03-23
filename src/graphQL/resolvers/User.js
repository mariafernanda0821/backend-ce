const {

} = require('../../controllers/app/User');


const UserResolver = {
    
    Query: {
        user: (parent, args, context, info) => searchUserApp(parent, args, context, info),
       // Hello: () => 'hello wordl Maria Fernanda'
    },

};



module.exports = UserResolver;
