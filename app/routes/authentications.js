/* eslint-disable max-len */
const express = require('express');
const AuthenticationsController = require('../controllers/authentications');
const AuthenticationsMiddleware = require('../middleware/authentications');

const route = express.Router();

route.post('/register', AuthenticationsController.register);

route.get('/register', AuthenticationsMiddleware.verifyToken, AuthenticationsController.getAllUsers);

route.get('/token', AuthenticationsController.refreshToken);

route.post('/login', AuthenticationsController.login);

module.exports = route;
