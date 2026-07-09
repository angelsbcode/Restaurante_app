// src/routes/clienteRoutes.js
const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

router.post('/', clienteController.registrarCliente);
router.put('/:id', clienteController.actualizarPerfil);

module.exports = router;