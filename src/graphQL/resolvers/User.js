
const UserResolver = {
    
    Query: {
        Hello: () => 'hello wordl Maria Fernanda'
    },
    
    Mutation: {
        createUser: (parent, args, context, info) => {},
    }
};



module.exports = UserResolver;
