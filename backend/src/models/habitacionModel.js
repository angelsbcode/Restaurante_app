// src/models/habitacionModel.js
const db = require('../config/db');

const Habitacion = {
  // Obtener todas las habitaciones
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM Habitacion');
    return rows;
  },

  // Crear una nueva habitación
  create: async (data) => {
    const { tipoCuarto, tipoCama, precio, imagen, idAdmin } = data;
    const [result] = await db.query(
      'INSERT INTO Habitacion (tipoCuarto, tipoCama, precio, imagen, idAdmin) VALUES (?, ?, ?, ?, ?)',
      [tipoCuarto, tipoCama, precio, imagen, idAdmin]
    );
    return result.insertId;
  },

  // Actualizar una habitación existente
  update: async (id, data) => {
    const { tipoCuarto, tipoCama, precio, imagen, idAdmin } = data;
    
    if (imagen) {
      await db.query(
        'UPDATE Habitacion SET tipoCuarto = ?, tipoCama = ?, precio = ?, imagen = ?, idAdmin = ? WHERE idCuarto = ?',
        [tipoCuarto, tipoCama, precio, imagen, idAdmin, id]
      );
    } else {
      await db.query(
        'UPDATE Habitacion SET tipoCuarto = ?, tipoCama = ?, precio = ?, idAdmin = ? WHERE idCuarto = ?',
        [tipoCuarto, tipoCama, precio, idAdmin, id]
      );
    }
  },

  // Eliminar una habitación
  delete: async (id) => {
    await db.query('DELETE FROM Habitacion WHERE idCuarto = ?', [id]);
  }
};

module.exports = Habitacion;