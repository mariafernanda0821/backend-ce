const {
    start,
    httpServer,
} = require("./app");
//const GraphQL = require('./graphql');

//require('./socket.io'); // archivo

const { SERVER } = require('./config');


const PORT = SERVER.PORT || 4000;

const server = async () => {
    
    await start();

    httpServer.listen(PORT, () => {

        console.log(`API server started at port ${PORT}`);

    });
}

server()