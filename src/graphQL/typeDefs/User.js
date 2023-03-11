const { gql } = require('apollo-server-express');


const UserTypeDefs = gql`
    extend type Query {
        user: User
    
    }

    type User {
        _id: ID!
        firstName: String,
        lastName: String,
        email: String,
        phone: Phone,
        roleId: [Role],
        createdAt: String,
        magicLink: MagicLink,
        vehicle: [Vehicle],   
    },

    type Phone {
        code: String,
        number: String
    }

    type MagicLink {
        issuer: String,
        publicAddress: String
    }

    type Vehicle {
        _id: ID!,
        make: String,
        model: String,
        year: String,
        colour: String,
        licencePlate: String
    }
    
    type Role {
        _id:  ID!
        name: String,
        description: String,
        pronoun: String
    }

    type Answer{
        ok: Boolean,
        status: Int,
        message: String
    }

    type Mutation {

        updateUserApp(
            firstName: String!,
            lastName: String!, 
            email: String!,
            code: String!,
            numberPhone: String!,
            ) : Answer

        addVehicleUserApp(
            make: String!,
            model: String!,
            year: String!,
            colour: String!,
            licencePlate: String!
        ): Answer,

        updateVehicleUserApp(
            vehicleId: String!,
            make: String!,
            model: String!,
            year: String!,
            colour: String!,
            licencePlate: String!,
        ):Answer

        changePasswordForUserApp(
            password: String!,
            repeatPassword: String!,
        ):Answer
    }
`;



module.exports = UserTypeDefs;