const {gql} = require('apollo-server-express');

const {
    UserTypeDefs, HelloTypeDefs,AuthTypeDefs, AuthCampanyTypeDefs
} =  require('./typeDefs');

const {
    HelloResolver, UserResolver, AuthUserResolver , AuthCampanyResolver
} =  require('./resolvers');

const rootTypeDefs = gql`
    type Query {
        _: String
    }
    type Mutation {
        _: String
    }
`;

const typeDefs = [rootTypeDefs, AuthCampanyTypeDefs, HelloTypeDefs, UserTypeDefs, AuthTypeDefs]

const resolvers = [HelloResolver,AuthCampanyResolver,  UserResolver, AuthUserResolver]





module.exports = {
    typeDefs,
    resolvers
}

