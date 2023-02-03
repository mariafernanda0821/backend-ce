const {gql} = require('apollo-server-express');


const UserTypeDefs = gql`
    extend type Query {
        User: User
    
    }

    type User {
        _id: ID!
        firstName: String,
        lastName: String,
        email: String,
        # phone: {
        #     code: String,
        #     number: String
        # }
       
    }
    
    # type Role {
    #     _id:  ID!
    #     name: String,
    #     description: String,
    #     pronoun: String
    # }
    # type Mutation {
    #     createUser(token: String) : Token,
    # }
`;


// const UserTypeDefs = gql`
//     extend type Query {
//         user(id:ID!): User,
//         token: String
//     }

//     type Phone {
//         code: String,
//         number: String
//     }

//     type Role {
//         _id: ID!,
//         name: String, 
//         description: String,
//     }
//     type paymentMethodId {
//             _id: ID!
//             name: String
//             description: String
//     }
//     type PaymentMethods {
//         paymentMethodId: paymentMethodId
//         customerId: String
//     }

//     type SocialNetworkId {
//         googleId: String
//         facebookId: String
//         appleId: String
//     }

//     type User {
//         _id: ID!
//         firstName: String,
//         lastName: String,
//         phone: [Phone],
//         email: String,
//         active: String,
//         photo: String,
//         roleId: [Role],
//         paymentMethods: [PaymentMethods],
//         socialNetworkId: SocialNetworkId,
//         createdAt: String
//         updateAt: String
//     }

//     type Mutacion {

//         createdUser(token: String) : String
//     }
// `;



//module.exports = UserTypeDefs

module.exports = UserTypeDefs;