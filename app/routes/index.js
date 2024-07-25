const express = require('express');

const app = express();

const authentication = require('./authentications');

app.use('/auth', authentication);

module.exports = app;
