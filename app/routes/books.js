/* eslint-disable max-len */
const express = require('express');
const uploadFile = require('../middleware/books');
const BooksController = require('../controllers/books');

const route = express.Router();

route.post('/', uploadFile.single('image'), BooksController.addedBook);

route.get('/', BooksController.getAllBooks);

module.exports = route;
