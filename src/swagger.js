const swaggerJSDoc = require('swagger-jsdoc');
const path = require('path');
const { SERVER } = require("./config");

const swaggerDefinition = {
    openapi: '1.0.0',
    info: {
        version: '1.0.0',
        title: 'Instatow',
        description: '...',
    },
    schemes: ["http"],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'apiKey',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                description: 'JWT Authorization header using the Bearer scheme',
                name: 'Authorization',
                in: "header"
            }
        }
    },
    servers: [{
            url: SERVER.SERVER_URL,
            description: 'local'
        },
        {
            url: SERVER.SERVER_URL,
            description: "Production"
        }
    ],
};

// options for the swagger docs
const options = {
    // import swaggerDefinitions
    swaggerDefinition,
    jsonEditor: true,
    // path to the API docs
    apis: [path.join(__dirname, '..//docs/**/*.yaml')]
};
// initialize swagger-jsdoc
module.exports = swaggerJSDoc(options);