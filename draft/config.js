/* eslint-disable indent */
require('dotenv').config(); // Memuat variabel lingkungan dari .env
const fs = require('fs');

// Mengambil nilai variabel lingkungan
const databaseConfig = {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql', // atau sesuaikan dengan dialect yang Anda gunakan
};

// Menyimpan ke dalam berkas .json
const configPath = 'config.json'; // Sesuaikan dengan lokasi dan nama berkas .json Anda
fs.writeFileSync(configPath, JSON.stringify({ development: databaseConfig }, null, 2));
