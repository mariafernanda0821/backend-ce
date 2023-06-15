const express = require('express');

const { ApolloServer } = require('apollo-server-express');

const { expressMiddleware } = require('@apollo/server/express4');

const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');

const {
    ApolloServerPluginLandingPageLocalDefault,
    ApolloServerPluginLandingPageProductionDefault 
} = require('@apollo/server/plugin/landingPage/default');

const fileUpload = require('express-fileupload');

const bodyParser = require('body-parser');

const swaggerUi = require('swagger-ui-express');

const swaggerDocument = require('./swagger.js');

const path = require('path');

const cors = require('cors');

const connectDB = require('../db/db.js');

const morgan = require('morgan');

const { InMemoryLRUCache } = require('@apollo/utils.keyvaluecache');

const { json } = require('body-parser');

const { typeDefs, resolvers } = require('./graphQL/index.js');

const { SERVER } = require('./config');

const { CODIGO } = require('./helpers/catchError');

const app = express();

const httpServer = require('http').createServer(app);


const start = async () => {
    try {
        let plugins = [];
        
        if (SERVER.NODE_ENV === 'production') {
            plugins = [ApolloServerPluginLandingPageProductionDefault({ embed: true, graphRef: SERVER.APOLLO_GRAPH_REF,key: SERVER.APOLLO_KEY })]
        } else {
            plugins = [ApolloServerPluginLandingPageLocalDefault({ embed: true, httpServer })]
        }
        //console.log(plugins)
        const apolloServer = new ApolloServer({
            typeDefs,
            resolvers,
            plugins: plugins, //[ApolloServerPluginDrainHttpServer({ httpServer: httpsServer })],
            context: ({ req, res }) => ({ req, res, authorization: req.headers.authorization }),
            cache: new InMemoryLRUCache(),
            //cors({ origin: [`http://localhost:${SERVER.PORT}`, `https://65.21.48.110:${SERVER.PORTHTPPS}`, `https://65.21.48.110:${SERVER.PORT}`, 'https://studio.apollographql.com'] }),
        });

        app.use(cors());
        await apolloServer.start();

        apolloServer.applyMiddleware({
            app,
        });


        app.use(
            '/graphql',
            cors({ origin: [`http://localhost:${SERVER.PORT}`, `http://http://95.216.189.37/:${SERVER.PORT}`] }),
            bodyParser.json(),
            expressMiddleware(apolloServer)

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

        //add other middleware
        app.use(cors());
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));

        if (SERVER.TEST != 'test') {
            app.use(morgan('dev'));
        }

        // Conecction to BD
        connectDB();

        // Express.json
        app.use(express.json({ extended: true }));

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
    //httpsServer: require('https').createServer(options, app),
    httpServer: require('http').createServer(app),


}//httpServer;



