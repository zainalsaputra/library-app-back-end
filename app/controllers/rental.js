/* eslint-disable consistent-return */
// eslint-disable-next-line import/no-extraneous-dependencies
// const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

const {
  createRental,
  findAllRentalLogs,
} = require('../services/rental');

class rentalController {
  static async addedRental(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const _bookId = req.params.bookId;
      const response = await createRental(_bookId);
      res.status(201)
        .send({
          status: 'success',
          message: 'Rental book successfully!!',
          data: response,
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

  static async getRentalLogs(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const response = await findAllRentalLogs();
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

module.exports = rentalController;
