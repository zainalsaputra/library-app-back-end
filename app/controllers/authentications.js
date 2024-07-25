/* eslint-disable consistent-return */
// eslint-disable-next-line import/no-extraneous-dependencies
// const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const {
  createUser, getAllUsers, findUserByEmail, updateRefreshToken,
  findAllUser,
} = require('../services/authentications');

class AuthenticationsController {
  static async register(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const response = await createUser(req.body);
      res.status(201)
        .send({
          status: 'success',
          message: 'User is created successfully!!',
          data: response,
          // password: bcrypt.compare(req.body.password),
        });
    } catch (error) {
      res.status(500)
        .send({
          status: 'error',
          message: error.message,
        });
    }
  }

  static async getAllUsers(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const response = await getAllUsers();
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

  static async login(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const response = await findUserByEmail(req.body);
      if (response == null) {
        res.status(400).send({
          status: 'error',
          message: 'Silahkan periksa kembali email dan password anda!',
        });
        return;
      }
      const { id } = response;
      const { name } = response;
      const { email } = response;
      const accessToken = jwt.sign({ id, name, email }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '20s',
      });
      const refreshToken = jwt.sign({ id, name, email }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '1d',
      });
      await updateRefreshToken(id, refreshToken);
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        age: 24 * 60 * 60 * 1000,
      });
      res.status(200)
        .send({
          status: 'success',
          data: response,
          access_token: accessToken,
        });
    } catch (error) {
      res.status(500)
        .send({
          status: 'error',
          message: error.message,
        });
    }
  }

  static async refreshToken(req, res) {
    try {
      const { refreshToken } = req.cookies;
      if (!refreshToken) {
        return res.sendStatus(401);
      }
      const user = await findAllUser(refreshToken);
      if (!user) {
        return res.sendStatus(403);
      }
      // eslint-disable-next-line no-unused-vars
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, decoded) => {
        if (error) {
          return res.sendStatus(403);
        }
        const { id } = user;
        const { name } = user;
        const { email } = user;
        const accessToken = jwt.sign({ id, name, email }, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: '20s',
        });
        res.json({ accessToken });
      });
    } catch (error) {
      res.status(500)
        .send({
          status: 'error',
          message: error.message,
        });
    }
  }

  static async logout(req, res) {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res.sendStatus(204);
    }
    const response = await findAllUser(refreshToken);
    if (!response) {
      return res.sendStatus(204);
    }
    const { id } = response[0];
    await updateRefreshToken(id, null);
    res.clearCookie('refreshToken');
    // return res.send(res.sendStatus(200));
    res.status(200)
      .send({
        status: 'success',
        message: 'Berhasil melakukan logout!',
      });
  }
}

module.exports = AuthenticationsController;
