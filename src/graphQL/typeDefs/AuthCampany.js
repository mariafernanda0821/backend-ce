const { gql } = require('apollo-server-express');


const AuthCampanyTypeDefs = gql`
 
    type Token {
        token: String,
        message: String,
        register: Boolean,
    }

    type Answer{
        ok: Boolean,
        message: String
    }
    enum CampanyType {
        towTruckCompany,
        insuranceCompany
    }

    type userOwner{
        firstName:String, 
        lastName:String, 
        email:String, 
        numberPhoneUser:String,
    }
    type Mutation{
    
        registerCampanyApp(
            firstName:String!, 
            lastName:String!, 
            email:String!, 
            password: String,
            numberPhoneUser:String!,
            codeUser: String!,
            nameCampany:String!, code: String!, numberPhone: String!,typeCompany: CampanyType!, 
            postCode: String!, address01: String!, city: String!, state: String!, 
            address02: String): Answer 
    
        magicLinkLoginAdmin: Token,

        loginAdmin(email:String!, password: String!): Token
    }
`;

// firstName,
//     lastName,
//     email,
//     code,
//     phone,

module.exports = AuthCampanyTypeDefs;