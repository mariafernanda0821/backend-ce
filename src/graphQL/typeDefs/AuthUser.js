const { gql } = require('apollo-server-express');


const AuthTypeDefs = gql`
 

    extend type Query {
        usuario: Usuario
    }

    type Usuario{
        nombre: String,
        apellido: String,
        password: String,
        email: String,
        active: Boolean,
        role: String,
    }

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

        registrarAdmin(nombre: String!, apellido:String!, email:String!,  password: String! ):Respuesta
        
    }
`;


module.exports = AuthTypeDefs;