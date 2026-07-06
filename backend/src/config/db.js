// src/config/db.js
const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'Pelusa12!',
  database: process.env.DB_NAME || 'HOTELPROYECTOBD',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Lo exportamos con promesas para usar async/await de forma moderna
module.exports = pool.promise();