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
        """ const towTruckcompany = "towTruckcompany";
        const insuranceCompany = "insuranceCompany"; """
        towTruckCompany,
        insuranceCompany
    }

    
    type Mutation{
        
        #magicLinkLogin: Token,

        registerCampanyApp(
            name:String!, code: String!, numberPhone: String!,typeCampany: CampanyType!, 
            postCode: String!, address01: String!, city: String!, state: String!, 
            ref: String!, address02: String): Answer 
        }
`;

// firstName,
//     lastName,
//     email,
//     code,
//     phone,

module.exports = AuthCampanyTypeDefs;