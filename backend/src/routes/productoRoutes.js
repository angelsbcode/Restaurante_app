const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const productoController = require('../controllers/productoController'); // Asegúrate de que tu controlador se llame productoController.js

// Configuración de almacenamiento de Multer
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

// 1. Endpoints de Consulta Específicos (Siempre arriba)
router.get('/categoria/bebidas', productoController.getBebidas); // CORREGIDO: Mapeo directo a getBebidas

// 2. Endpoints Base del CRUD
router.get('/', productoController.getPlatillos); // CORREGIDO: Llama a getPlatillos (que filtra la Comida)

router.post('/', upload.single('imagen'), productoController.createPlatillo); // CORREGIDO: Llama a createPlatillo

router.put('/:id', upload.single('imagen'), productoController.updatePlatillo); // CORREGIDO: Llama a updatePlatillo

router.delete('/:id', productoController.deletePlatillo); // CORREGIDO: Llama a deletePlatillo

module.exports = router;