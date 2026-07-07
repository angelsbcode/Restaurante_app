// src/routes/habitacionRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const habitacionController = require('../controllers/habitacionController');

// Reutilizamos la configuración de almacenamiento de Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/uploads')); 
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + file.originalname;
    cb(null, uniqueSuffix);
  }
});

const upload = multer({ storage: storage });

// DEFINICIÓN DE ENDPOINTS
router.get('/', habitacionController.getHabitaciones);
router.post('/', upload.single('imagen'), habitacionController.createHabitacion);
router.put('/:id', upload.single('imagen'), habitacionController.updateHabitacion);
router.delete('/:id', habitacionController.deleteHabitacion);

module.exports = router;