//require("dotenv").config();
//require("./routes/index");
//require("./swagger");

const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.js');
const path = require('path');
const cors = require('cors');
const connectDB = require('../db/db.js');
const morgan = require('morgan');
const { SERVER } = require('./config');

// Create server
const app = express();

// setting static folder
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

// Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Import routes
app.use(require('./routes/index'));

// Front in react
app.get('*', (req, res) => {
    const indexPath = path.resolve(__dirname, '../www/index.html');
    try {
        
        return res.sendFile(indexPath);

    } catch (error) {
        console.log(error);
        //res.sendFile(indexedPath);
        return res.sendFile(indexPath);
        
    }
});

module.exports = require('http').createServer(app);