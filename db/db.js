const mongoose = require('mongoose')
const { SERVER } = require('../src/config');

//console.log("server.DB server.DB", SERVER.DB)
const connectDB = async () => {
    try {

        mongoose.connect(SERVER.DB, {
            "auth": {
            "authSource": SERVER.DB_COLLECTION
            },
            "user": SERVER.DB_USER,
            "pass": SERVER.DB_PASSWORD,

            //useNewUrlParser: true,
            //useUnifiedTopology: true,
            //useFindAndModify: false,
            //useCreateIndex: true,
        });

        console.log("BD connection active");
        //return;

    } catch (error) {
        console.log("BD connection no active", error);
        // console.log(error);
        process.exit(1); // stop app if there is a problem with the bd connection

    }
}

module.exports = connectDB;


// mongoose.connect(SERVER.DB, {
//     //"auth": {"authSource": server.DB_COLLECTION},"user": server.DB_USER,"pass": server.DB_PASSWORD,
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false,
//     useCreateIndex: true,
// })
//     .then(db => console.log("*************DB connected*************"))
//     .catch(err => console.error(err));