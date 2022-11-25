const path = require('path');
const dotenv = require('dotenv');

const rutaEnv = path.resolve(__dirname, '../.env');
//console.log(rutaEnv);
dotenv.config({path:rutaEnv});

const SERVER = {
  HOST: process.env.HOST,
  PORT: process.env.PORT,
  SESSION_TOKEN: process.env.SESSION_TOKEN,
  SECRET_KEY: process.env.SECRET_KEY,
  TEST: "test",
  EMAIL_SERVICE: process.env.EMAIL_SERVICE ,
  EMAIL_PORT: process.env.EMAIL_PORT ,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,

  // DB: "mongodb://localhost:27017/flink",
  DB: process.env.DB,
  DB_COLLECTION: process.env.DB_COLLECTION,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
}

module.exports = {
  SERVER
};