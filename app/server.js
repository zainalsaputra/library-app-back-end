/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

// router.get('/:user', (req, res) => {
//   const { user } = req.params;
//   res.send({
//     status: 'success',
//     data: `Welcome to landing page ${user}`,
//   });
// });

const corsOptions = {
  origin: ['http://localhost:5000', 'http://localhost:8080'],
  methods: '*',
  credentials: true,
};

app.use(cors(corsOptions));

app.use(cookieParser());
app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

const router = express.Router();

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
