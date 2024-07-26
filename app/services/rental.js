/* eslint-disable import/order */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
const { now } = require('sequelize/lib/utils');
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

const returnBookUpdate = async (_id) => {
  const result = await Schemas.rentalLogs.update({
    returnDate: new Date(),
    status: false,
  }, {
    where: {
      id: _id,
    },
  });
  return result;
};

module.exports = {
  createRental,
  findAllRentalLogs,
  returnBookUpdate,
};
