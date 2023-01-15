const {gql} = require('apollo-server-express');
const {
    UserTypeDefs, HelloTypeDefs,AuthTypeDefs
} =  require('./typeDefs');

const {HelloResolver,UserResolver, AuthUserResolver } =  require('./resolvers');

const rootTypeDefs = gql`
    type Query {
        _: String
    }
    type Mutation {
        _: String
    }
`;

const typeDefs = [rootTypeDefs, HelloTypeDefs, UserTypeDefs, AuthTypeDefs]

const resolvers = [HelloResolver, UserResolver, AuthUserResolver]





module.exports = {
    typeDefs,
    resolvers
}

