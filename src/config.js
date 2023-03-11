const path = require('path');
const dotenv = require('dotenv');

const rutaEnv = path.resolve(__dirname, '../.env');

//console.log(rutaEnv);

dotenv.config({

  path: rutaEnv

});

const SERVER = {
  HOST: process.env.HOST,

  PORT: process.env.PORT,
  
  PORTHTPPS: process.env.PORTHTPPS,
  
  APOLLO_GRAPH_REF: process.env.APOLLO_GRAPH_REF,
  
  APOLLO_KEY: process.env.APOLLO_KEY,

  NODE_ENV: process.env.NODE_ENV,

  MAGIC_SECRET_KEY: process.env.MAGIC_SECRET_KEY,

  MAGIC_SDK_PUBLISHABLE_API_KEY: process.env.MAGIC_SDK_PUBLISHABLE_API_KEY,

  SESSION_TOKEN: process.env.SESSION_TOKEN,

  SECRET_KEY: process.env.SECRET_KEY,

  EXPIRES_ID: process.env.EXPIRES_ID, 

  TEST: "test",

  EMAIL_SERVICE: process.env.EMAIL_SERVICE ,

  EMAIL_PORT: process.env.EMAIL_PORT ,

  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,

  SECRETOR_PRIVATE_KEY: process.env.SECRETOR_PRIVATE_KEY,

  DB: process.env.DB,

  DB_COLLECTION: process.env.DB_COLLECTION,

  DB_USER: process.env.DB_USER,

  DB_PASSWORD: process.env.DB_PASSWORD,

  SERVER_URL_LOCAL: process.env.SERVER_URL_LOCAL,

  SERVER_URL: process.env.SERVER_URL
}


module.exports = {
  SERVER
};