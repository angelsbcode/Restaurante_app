const db = require('../config/db');

const Producto = {
  // Obtener todos los productos (Comidas y Bebidas)
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM Producto');
    return rows;
  },

  // Crear un nuevo producto
  create: async (data) => {
    // CORREGIDO: Desestructuramos 'nombre' y 'categoria'
    const { nombre, tipo, categoria, precio, imagen, idAdmin } = data;
    
    const [result] = await db.query(
      'INSERT INTO Producto (nombre, tipo, categoria, precio, imagen, idAdmin) VALUES (?, ?, ?, ?, ?, ?)',
      [nombre, tipo, categoria, precio, imagen, idAdmin] // CORREGIDO: Mapeo exacto de los parámetros
    );
    return result.insertId;
  },

  // Actualizar un producto existente
  update: async (id, data) => {
    // CORREGIDO: Desestructuramos todos los campos necesarios, incluyendo 'categoria' e 'imagen'
    const { nombre, tipo, categoria, precio, imagen, idAdmin } = data;
    
    // Si el usuario subió una imagen nueva, la actualizamos; si no, dejamos la que ya tenía
    if (imagen) {
      await db.query(
        'UPDATE Producto SET nombre = ?, tipo = ?, categoria = ?, precio = ?, imagen = ?, idAdmin = ? WHERE idProducto = ?',
        [nombre, tipo, categoria, precio, imagen, idAdmin, id]
      );
    } else {
      await db.query(
        'UPDATE Producto SET nombre = ?, tipo = ?, categoria = ?, precio = ?, idAdmin = ? WHERE idProducto = ?',
        [nombre, tipo, categoria, precio, idAdmin, id]
      );
    }
  },

  // Eliminar un producto permanentemente
  delete: async (id) => {
    await db.query('DELETE FROM Producto WHERE idProducto = ?', [id]);
  }
};

module.exports = Producto;