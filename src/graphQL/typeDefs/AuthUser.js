const { gql } = require('apollo-server-express');


const AuthTypeDefs = gql`
 
    type Token {
        token: String,
        message: String,
        register: Boolean,
    }

    type Answer{
        ok: Boolean,
        message: String
    }
    
    type Mutation{
        
        magicLinkLogin: Token,

        registerUserApp(firstName: String!, lastName:String!, email:String!, code:String!, phone:String! ): Answer 
    }
`;

// firstName,
//     lastName,
//     email,
//     code,
//     phone,

    module.exports = AuthTypeDefs;