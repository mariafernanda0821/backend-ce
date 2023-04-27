const {gql} = require('apollo-server-express');

const {
    UserTypeDefs, HelloTypeDefs,AuthTypeDefs, ProductosInventariosTypeDefs,
} =  require('./typeDefs');

const {
    HelloResolver, UserResolver, AuthUserResolver,  ProductosInventariosResolver,
} =  require('./resolvers');

const rootTypeDefs = gql`
    type Query {
        _: String
    }
    type Mutation {
        _: String
    }
`;

const typeDefs = [HelloTypeDefs, rootTypeDefs,  AuthTypeDefs, ProductosInventariosTypeDefs]

const resolvers = [HelloResolver, AuthUserResolver,ProductosInventariosResolver ]


module.exports = {
    typeDefs,
    resolvers
}

