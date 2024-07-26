/* eslint-disable max-len */
const express = require('express');
// const uploadFile = require('../middleware/books');
const RentalController = require('../controllers/rental');

const route = express.Router();

route.post('/rental/:bookId', RentalController.addedRental);

route.get('/rental/logs', RentalController.getRentalLogs);

route.get('/rental', RentalController.getSpecifiedRentalLogs);

route.put('/return/:id', RentalController.returnRental);

module.exports = route;
