/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable object-shorthand */
const multer = require('multer');
const path = require('path');

// Konfigurasi penyimpanan disk dengan multer
const diskStorage = multer.diskStorage({
  destination(req, file, cb) {
    // Tentukan direktori penyimpanan file
    cb(null, path.join(__dirname, '../../tmp')); // Sesuaikan path sesuai kebutuhan
  },
  filename(req, file, cb) {
    // Buat nama file unik
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname).toLowerCase()}`);
  },
});

// Filter untuk memeriksa ekstensi file
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  // Izinkan hanya file dengan ekstensi tertentu
  if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
    return cb(new Error('File extension is invalid!!'), false);
  }
  cb(null, true);
};

// Buat instance multer dengan konfigurasi penyimpanan dan filter
const uploadFile = multer({
  storage: diskStorage,
  fileFilter: fileFilter,
});

module.exports = uploadFile;
