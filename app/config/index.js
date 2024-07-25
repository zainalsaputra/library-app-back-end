/* eslint-disable import/no-extraneous-dependencies */
const { Sequelize } = require('sequelize');

require('dotenv').config();

const sipenjaruDB = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DIALECT,
  },
);

module.exports = sipenjaruDB;

sipenjaruDB.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch((error) => {
  console.error('Unable to connect to the database: ', error);
});
