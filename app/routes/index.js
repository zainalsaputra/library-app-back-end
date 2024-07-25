const express = require('express');

const app = express();

const authentication = require('./authentications');
const books = require('./books');
const rental = require('./rental');

app.use('/auth', authentication);
app.use('/books', books);
app.use('/books', rental);

module.exports = app;
