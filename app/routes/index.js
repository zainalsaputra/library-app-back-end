const express = require('express');

const app = express();

const authentication = require('./authentications');
const books = require('./books');

app.use('/auth', authentication);
app.use('/books', books);

module.exports = app;
