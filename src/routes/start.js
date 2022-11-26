// packages
const express = require('express');
const router = express.Router();

const controllers = require('../controllers/start.js');

//console.log("controllers",controllers);

router.get('/data-base', controllers.loadDataBase);


module.exports = router;