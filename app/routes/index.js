const express = require('express');

const app = express();

const path = require('path');

const authentication = require('./authentications');
const books = require('./books');
const rental = require('./rental');

app.use('/auth', authentication);
app.use('/books', books);
app.use('/books', rental);

app.use('/tmp', express.static(path.join(__dirname, '../../tmp')));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/tmp/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, '../../tmp', filename);

  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).send('Image not found');
    }
  });
});

module.exports = app;
