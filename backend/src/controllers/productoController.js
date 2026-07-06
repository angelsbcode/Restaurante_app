const Producto = require('../models/productoModel'); // Cambiado el nombre de la constante para mayor claridad

// OBTENER SÓLO PLATILLOS (COMIDA)
exports.getPlatillos = async (req, res) => {
  try {
    const todos = await Producto.getAll();
    // Filtramos para enviar solo los productos cuyo TIPO sea 'Comida'
    const soloPlatillos = todos.filter(item => item.tipo === 'Comida');
    res.json(soloPlatillos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// OBTENER SÓLO BEBIDAS
exports.getBebidas = async (req, res) => {
  try {
    const todos = await Producto.getAll();
    // Filtramos para enviar solo los productos cuyo TIPO sea 'Bebida'
    const bebidas = todos.filter(item => item.tipo === 'Bebida');
    res.json(bebidas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CREAR UN NUEVO PRODUCTO (COMIDA O BEBIDA)
exports.createPlatillo = async (req, res) => {
  try {
    // CORREGIDO: Extraemos 'nombre' y 'categoria' según las nuevas columnas de la BD
    const { nombre, tipo, categoria, precio, idAdmin } = req.body;
    
    let rutaImagen = 'http://localhost:3000/uploads/default-product.jpg'; // Imagen default corregida
    
    if (req.file) {
      rutaImagen = `http://localhost:3000/uploads/${req.file.filename}`;
    }

    const nuevoProductoData = {
      nombre,
      tipo,
      categoria,
      precio,
      imagen: rutaImagen,
      idAdmin
    };

    const id = await Producto.create(nuevoProductoData);
    // Retornamos el idProducto real asignado por MySQL
    res.status(201).json({ idProducto: id, ...nuevoProductoData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ACTUALIZAR UN PRODUCTO EXISTENTE
exports.updatePlatillo = async (req, res) => {
  try {
    // CORREGIDO: Extraemos 'nombre' y 'categoria' según las nuevas columnas de la BD
    const { nombre, tipo, categoria, precio, idAdmin } = req.body;

    let rutaImagen = null;
    if (req.file) {
      rutaImagen = `http://localhost:3000/uploads/${req.file.filename}`;
    }

    const productoData = {
      nombre,
      tipo,
      categoria,
      precio,
      idAdmin
    };

    if (rutaImagen) {
      productoData.imagen = rutaImagen;
    }

    await Producto.update(req.params.id, productoData);
    
    // Devolvemos el objeto completo editado para que React pueda actualizar su estado visual de inmediato
    res.json({ idProducto: req.params.id, ...productoData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ELIMINAR UN PRODUCTO
exports.deletePlatillo = async (req, res) => {
  try {
    await Producto.delete(req.params.id);
    res.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};