const { gql } = require('apollo-server-express');


const AuthTypeDefs = gql`
 
    # extend type Query {
    #    _: String
    # }
    
    type Token {
        token: String,
        message: String,
    }
    type Respuesta{
        ok: Boolean,
        message: String
    }
    type Phone{
        code: String,
        number: String,
    }
    type Mutation{
        MagicLinkLogin: Token,
        registerUserApp(firstname: String, lastName:String, email:String, code:String, phone:String ): Respuesta 
    }
`;

module.exports = AuthTypeDefs;