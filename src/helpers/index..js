const mongoose = require('mongoose')
const {server} = require('./config');

mongoose.connect(server.DB, {
    //"auth": {"authSource": server.DB_COLLECTION},"user": server.DB_USER,"pass": server.DB_PASSWORD,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
})
    .then(db => console.log("*************DB connected*************"))
    .catch(err => console.error(err));