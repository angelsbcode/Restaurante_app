const db = require('../config/db');

const Platillo = {
  // Obtener todos
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM Platillo');
    return rows;
  },
  // Crear uno nuevo
  create: async (data) => {
    const { nombreOrden, tipo, precio, imagen } = data;
    const [result] = await db.query(
      'INSERT INTO Platillo (nombreOrden, tipo, precio, imagen) VALUES (?, ?, ?, ?)',
      [nombreOrden, tipo, precio, imagen]
    );
    return result.insertId;
  },
  // Actualizar
  update: async (id, data) => {
    const { nombreOrden, tipo, precio } = data;
    await db.query(
      'UPDATE Platillo SET nombreOrden = ?, tipo = ?, precio = ? WHERE idPlatillo = ?',
      [nombreOrden, tipo, precio, id]
    );
  },
  // Eliminar
  delete: async (id) => {
    await db.query('DELETE FROM Platillo WHERE idPlatillo = ?', [id]);
  }
};

module.exports = Platillo;