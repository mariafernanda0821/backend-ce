const { gql } = require('apollo-server-express');


const AuthTypeDefs = gql`
 
    type Token {
        ok: Boolean,
        status: Int
        token: String,
        message: String,
        register: Boolean,
    }

    type  Respuesta{
        ok: Boolean,
        status: Int,
        message: String,
    }
    
    type Mutation{
        
        registrar(nombre: String!, apellido:String!, email:String!,  password: String ): Respuesta,
        
        login(email:String!, password: String!): Token,
        
    }
`;


module.exports = AuthTypeDefs;