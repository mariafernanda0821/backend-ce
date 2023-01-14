const express = require('express');
const { ApolloServer } = require('apollo-server-express');
//const { typeDefs, resolvers } = require('./graphQL/index.js');
const {typeDefs} = require('./typeDefs');
const {resolvers} = require('./resolvers');

const app = express();

const GraphQL = async () => {
    try {
        
        const apolloServer = new ApolloServer({
            typeDefs,
            resolvers,
        });
    
        console.log("apolloServer apolloServer");
    
        await apolloServer.start();
    
        console.log("apolloServer apolloServer");
    
        apolloServer.applyMiddleware({
            app: app,
        });

        console.log("apolloServer apolloServer");

    } catch (error) {
        console.log("*".repeat(30));
        console.log(error);
        console.log("*".repeat(30));

    }
};


module.exports = GraphQL;
