/* eslint-disable consistent-return */
// eslint-disable-next-line import/no-extraneous-dependencies
// const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
// const path = require('path');
const {
  createBook, findAllBooks,
} = require('../services/books');

class BooksController {
  static async addedBook(req, res) {
    try {
      // const errors = validationResult(req);
      // if (!errors.isEmpty()) {
      //   return res.status(400).json({ errors: errors.array() });
      // }
      // const normalizedPath = path.normalize(req.file.path);
      // console.log(normalizedPath);
      // const image = path.normalize(req.file.path);
      const image = req.file.filename;
      // const userId = await
      const response = await createBook(req.body, image);
      res.status(201)
        .send({
          status: 'success',
          message: 'Book is created successfully!!',
          data: response,
          // password: bcrypt.compare(req.body.password),
        });
    } catch (error) {
      // res.status(500)
      //   .send({
      //     status: 'error',
      //     message: error.message,
      //   });
      console.log(error);
    }
  }

  static async getAllBooks(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const response = await findAllBooks();
      res.status(200)
        .send({
          status: 'success',
          data: response,
        });
    } catch (error) {
      res.status(500)
        .send({
          status: 'error',
          message: error.message,
        });
    }
  }
}

module.exports = BooksController;
