// config.js
const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  nemmonicPhrase: process.env.NEMMONIC,
  infuraUrl: process.env.INFURA_URL

};