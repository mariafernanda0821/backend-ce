const { gql } = require('apollo-server-express');


const AuthTypeDefs = gql`
 
    # extend type Query {
    #    _: String
    # }
    
    type Token {
        token: String,
        message: String
    }

    type Respuesta{
        ok: Boolean,
        message: String
    }
    
    type Mutation{
        
        MagicLinkLogin: Token,

        registerUserApp(firstName: String, lastName:String, email:String, code:String, phone:String ): Respuesta 
    }
`;

// firstName,
//     lastName,
//     email,
//     code,
//     phone,

    module.exports = AuthTypeDefs;