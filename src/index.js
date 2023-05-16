const {
    start,
    httpServer,
} = require("./app");

const { SERVER } = require('./config');

const PORT = SERVER.PORT || 4000;

const PORTHTPPS = SERVER.PORTHTPPS || 4001;

const server = async () => {
    
    await start();

    httpServer.listen(PORT, () => {

        console.log(`API server started at port ${PORT}`);

    });
    
}

server();