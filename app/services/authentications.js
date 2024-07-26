/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
const { body } = require('express-validator');
const Schemas = require('../models');

const createUser = async (body) => {
  // let roleFilter = body.level;
  // if (body.level === (null || '')) {
  //   let roleFilter = 'user';
  // }
  const result = await Schemas.users.create({
    name: body.name,
    email: body.email,
    address: body.address,
    phone: body.phone,
    password: body.password,
    roleLevel: body.role,
  });
  return result;
};

const getAllUsers = async () => {
  const result = await Schemas.users.findAll({
    // attributes: ['username'],
  });
  return result;
};

const findAllUser = async (refreshToken) => {
  const result = await Schemas.users.findAll({
    where: {
      // eslint-disable-next-line object-shorthand
      refreshToken: refreshToken,
    },
  });
  return result;
};

const findUserByEmail = async (body) => {
  const result = await Schemas.users.findOne({
    where: {
      email: body.email,
      password: body.password,
    },
  });
  return result;
};

const updateRefreshToken = async (id, refreshToken) => {
  const result = await Schemas.users.update(
    {
      // eslint-disable-next-line object-shorthand
      refreshToken: refreshToken,
    },
    {
      where: {
        // eslint-disable-next-line object-shorthand
        id: id,
      },
    },
  );
  return result;
};

module.exports = {
  createUser,
  getAllUsers,
  findUserByEmail,
  updateRefreshToken,
  findAllUser,
};
