const {gql} = require('apollo-server-express');

const UserTypeDefs = gql`
    extend type Query {
        user(id:ID!): User
    }
    type User {
        id: ID!
        firstName: String
    }
`;



module.exports = UserTypeDefs
