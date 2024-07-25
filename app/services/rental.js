/* eslint-disable import/order */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
const Schemas = require('../models');

const createRental = async (_bookId) => {
  const result = await Schemas.rentalLogs.create({
    returnDate: null,
    status: true,
    bookId: _bookId,
  });
  return result;
};

const findAllRentalLogs = async () => {
  const result = await Schemas.rentalLogs.findAll();
  return result;
};

module.exports = {
  createRental,
  findAllRentalLogs,
};
