/* eslint-disable import/order */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
// const { body } = require('express-validator');
const Schemas = require('../models');
const multer = require('multer');
const path = require('path');

const createBook = async (body, _image) => {
    console.log(_image);
  const result = await Schemas.books.create({
    title: body.title,
    author: body.author,
    description: body.description,
    image: _image,
    stock: body.stock,
    userId: body.userId,
  });
  return result;
};

const findAllBooks = async () => {
  const result = await Schemas.books.findAll({
    // attributes: ['username'],
  });
  return result;
};

const findUserByEmail = async (body) => {
  const result = await Schemas.Books.findOne({
    where: {
      email: body.email,
      password: body.password,
    },
  });
  return result;
};

const diskStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, '../../tmp'));
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`,
    );
  },
});

// eslint-disable-next-line consistent-return
const filesFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname);
  if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
    return cb(new Error('Invalid file extension!!', {
      status: 400,
      message: 'File extension is invalid!!',
    }));
  }
  cb(null, true);
};

module.exports = {
  createBook,
  findAllBooks,
  findUserByEmail,
  diskStorage,
  filesFilter,
};
