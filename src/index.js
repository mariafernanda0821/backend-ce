const {
    start,
    httpServer,
    httpsServer
} = require("./app");
//const GraphQL = require('./graphql');

//require('./socket.io'); // archivo

const { SERVER } = require('./config');


const PORT = SERVER.PORT || 4000;
const PORTHTPPS = SERVER.PORTHTPPS || 4001;

const server = async () => {
    
    await start();

    httpServer.listen(PORT, () => {

        console.log(`API server started at port ${PORT}`);

    });
    httpsServer.listen(PORTHTPPS, () => {

        console.log(`API server htpps started at port ${PORTHTPPS}`);

    })
}

server();