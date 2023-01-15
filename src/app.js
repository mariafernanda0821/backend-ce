const express = require('express');

const { ApolloServer } = require('apollo-server-express');

const { expressMiddleware } = require('@apollo/server/express4');

const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');

//const { startStandaloneServer } = require('@apollo/server/standalone');

const fileUpload = require('express-fileupload');

const bodyParser = require('body-parser');

const swaggerUi = require('swagger-ui-express');

const swaggerDocument = require('./swagger.js');

const path = require('path');

const cors = require('cors');

const connectDB = require('../db/db.js');

const morgan = require('morgan');

const { json } = require('body-parser');

const { typeDefs, resolvers } = require('./graphQL/index.js');

const { SERVER } = require('./config');

const app = express();

const httpServer = require('http').createServer(app);


const start = async () => {
    try {

        const apolloServer = new ApolloServer({
            typeDefs,
            resolvers,
            plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
            context: async ({ req, res }) => {
                return({ 
                    req,
                    res,
                    
                })
            },
        });

        await apolloServer.start();

        apolloServer.applyMiddleware({
            app,
        });

        //app.use('/graphql', require('./routes/index'));

        app.use(
            '/graphql',
            //cors({ origin: [`http://localhost:${SERVER.PORT}`, `http://65.21.48.110:${SERVER.PORT}`, 'https://studio.apollographql.com'] }),
            cors(),
            bodyParser.json(),
            expressMiddleware(apolloServer)
            // expressMiddleware(apolloServer,{
            //     context:async ({ req, res, next }) => {
            //         console.log("{ req, res, next }", { req, res, next })
            //         return({ 
            //             req, 
            //             res,
            //             next,
            //         })
            //     },
            //   } ),
        );

        app.use(express.static('storage'));

        app.use(express.static(path.resolve(__dirname, '../storage')));

        app.use(express.static(path.resolve(__dirname, '../www')));

        // setting file limit
        app.use(express.json({ limit: '10mb' }));

        app.use(express.urlencoded({ extended: true, limit: '10mb' }));

        // enable files upload
        app.use(fileUpload({
            createParentPath: true
        }));

        // add other middleware
        // app.use(cors());
        // app.use(bodyParser.json());
        // app.use(bodyParser.urlencoded({ extended: true }));

        if (SERVER.TEST != 'test') {
            app.use(morgan('dev'));
        }

        // Conecction to BD
        connectDB();

        // Express.json
        // app.use(express.json({ extended: true }));

        // Documentation
        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

        //app.use(require('./routes/index'));

        // Front in react
        app.get('*', (req, res) => {
            const indexPath = path.resolve(__dirname, '../www/index.html');
            try {

                return res.sendFile(indexPath);

            } catch (error) {

                console.log("*".repeat(30));
                console.log(error);
                console.log("*".repeat(30));

                return res.sendFile(indexPath);

            }
        });


    } catch (error) {

        console.log("*".repeat(30));
        console.log(error);
        console.log("*".repeat(30));

    }
};

//start();

module.exports = {
    start,
    httpServer: require('http').createServer(app),
    

}//httpServer;



