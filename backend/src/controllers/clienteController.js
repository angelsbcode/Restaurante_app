// src/controllers/clienteController.js
const Cliente = require('../models/clienteModel');

exports.registrarCliente = async (req, res) => {
  const { nombre, correo, contrasena, telefono, direccion } = req.body;

  if (!nombre || !correo || !contrasena) {
    return res.status(400).json({ message: 'Nombre, correo y contraseña son obligatorios.' });
  }

  try {
    const idCliente = await Cliente.create({ nombre, correo, contrasena, telefono, direccion });
    res.status(201).json({ 
      idUsuario: idCliente, 
      nombre, 
      correo, 
      role: 'cliente',
      message: '¡Huésped registrado con éxito!' 
    });
  } catch (error) {
    // Si el correo ya existe en la BD (por el campo UNIQUE)
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ message: 'Este correo electrónico ya está registrado.' });
    }
    res.status(500).json({ error: error.message });
  }
};

const db = require('../config/db'); // Requerimos la BD para hacer el update directo o usa tu modelo

exports.actualizarPerfil = async (req, res) => {
  const { id } = req.params;
  const { nombre, direccion } = req.body;

  try {
    await db.query(
      'UPDATE Cliente SET nombre = ?, direccion = ? WHERE idCliente = ?',
      [nombre, direccion, id]
    );
    res.json({ message: 'Perfil actualizado correctamente', nombre, direccion });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};