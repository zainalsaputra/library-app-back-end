/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

const router = express.Router();

router.get('/:user', (req, res) => {
  const { user } = req.params;
  res.send({
    status: 'success',
    data: `Welcome to landing page ${user}`,
  });
});

app.use(cookieParser());
app.use(express.json());

app.use(router);

const route = require('./routes/index');

app.use(route);

app.use((req, res) => {
  res.send({
    status: 'failed',
    data: 'This page is not found!!',
  });
});

const { PORT } = process.env || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT : ${PORT}`);
});
