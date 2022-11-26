const express = require('express');
const app = express();
//ejemplo


app.use('/api/start', require('./start'));

// app.use('/api/armband', [
//     require('../middlewares/auth'),
//     require('../middlewares/role').isTourGuide
// ], require('./armband'));


module.exports = app;