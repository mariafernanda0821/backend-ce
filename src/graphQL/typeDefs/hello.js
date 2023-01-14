const {gql} = require('apollo-server-express');
//const {} =  require('./typeDefs')

const HelloTypeDefs = gql`
    extend type Query {
        Hello: String   
    }
    
`;



module.exports = {
    HelloTypeDefs
}