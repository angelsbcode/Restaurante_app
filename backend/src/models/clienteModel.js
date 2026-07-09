// src/models/clienteModel.js
const db = require('../config/db');

const Cliente = {
  // Crear un nuevo registro de cliente
  create: async (data) => {
    const { nombre, correo, contrasena, telefono, direccion } = data;
    const [result] = await db.query(
      'INSERT INTO Cliente (nombre, correo, contrasena, telefono, direccion) VALUES (?, ?, ?, ?, ?)',
      [nombre, correo, contrasena, telefono, direccion]
    );
    return result.insertId;
  }
};

module.exports = Cliente;