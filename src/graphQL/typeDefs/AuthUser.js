const { gql } = require('apollo-server-express');


const AuthTypeDefs = gql`
 
    extend type Query {
        MagicLinkLogin: Token,
    }
    
    type Token {
        token: String,
        message: String,
    }
   
`;

module.exports = AuthTypeDefs;