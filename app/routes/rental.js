/* eslint-disable max-len */
const express = require('express');
// const uploadFile = require('../middleware/books');
const RentalController = require('../controllers/rental');

const route = express.Router();

route.post('/rental/:bookId', RentalController.addedRental);

route.get('/rental', RentalController.getRentalLogs);

module.exports = route;
