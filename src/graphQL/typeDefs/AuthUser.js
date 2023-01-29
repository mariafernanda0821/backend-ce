const { gql } = require('apollo-server-express');


const AuthTypeDefs = gql`
 
    # extend type Query {
    #     _: String   
    # }
    
    type Token {
        token: String,
        message: String,
    }
   
    type Mutation {
        loginOrRegistreUserApp(token: String) : Token,
    }
`;

module.exports = AuthTypeDefs;