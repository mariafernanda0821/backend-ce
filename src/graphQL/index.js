const {gql} = require('apollo-server-express');
const {
    UserTypeDefs, HelloTypeDefs,
} =  require('./typeDefs');
const {HelloResolver,UserResolver } =  require('./resolvers');

const rootTypeDefs = gql`
    type Query {
        _: String
    }
    type Mutation {
        _: String
    }
`;

const typeDefs = [rootTypeDefs, UserTypeDefs, HelloTypeDefs]

const resolvers = [HelloResolver, UserResolver]





module.exports = {
    typeDefs,
    resolvers
}

