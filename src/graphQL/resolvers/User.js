
const UserResolver = {
    
    Query: {
        User: () => {
            return({
                "firstName":"maria",
                "lastName":"maria", 
                "email":"maria",
                "code":"maria",
                "phone":"maria"
            })
        },
       // Hello: () => 'hello wordl Maria Fernanda'
    },
    
    // Mutation: {
        
    // }
};



module.exports = UserResolver;
