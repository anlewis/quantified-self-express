var Sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'development';
var config = require('./config/config.js')[env];

const db = () => {
  if(config.url) {
    new Sequelize(config.url, {dialect: 'postgres'})
  } else {
    new Sequelize(config.database, config.username, config.password, {
      host: config.host,
      dialect: 'postgres',
      logging: console.log
    })
  }}

module.exports = db