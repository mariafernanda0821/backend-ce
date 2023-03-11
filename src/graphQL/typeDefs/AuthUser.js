const { gql } = require('apollo-server-express');


const AuthTypeDefs = gql`
 
    type Token {
        ok: Boolean,
        status: Int
        token: String,
        message: String,
        register: Boolean,
    }

    type Answer{
        ok: Boolean,
        status: Int,
        message: String,
    }

    
    type Mutation{
        
        magicLinkLogin: Token,
        
        registerUserApp(firstName: String!, lastName:String!, email:String!, code:String!, phone:String!, password: String ): Answer ,
        
        login(email:String!, password: String!): Token,
        
        forgotPassword(email: String!):Answer,
        
        changePasswordByCode(email: String!, password: String!, code: String! ):Answer,
        
    }
`;

// firstName,
//     lastName,
//     email,
//     code,
//     phone,

    module.exports = AuthTypeDefs;