// src/controllers/habitacionController.js
const Habitacion = require('../models/habitacionModel');

// OBTENER TODAS LAS HABITACIONES
exports.getHabitaciones = async (req, res) => {
  try {
    const datos = await Habitacion.getAll();
    res.json(datos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CREAR UNA HABITACIÓN
exports.createHabitacion = async (req, res) => {
  try {
    const { tipoCuarto, tipoCama, precio, idAdmin } = req.body;
    
    let rutaImagen = 'http://localhost:3000/uploads/default-room.jpg'; // Imagen base
    if (req.file) {
      rutaImagen = `http://localhost:3000/uploads/${req.file.filename}`;
    }

    const nuevaHabitacionData = {
      tipoCuarto,
      tipoCama,
      precio,
      imagen: rutaImagen,
      idAdmin
    };

    const id = await Habitacion.create(nuevaHabitacionData);
    res.status(201).json({ idCuarto: id, ...nuevaHabitacionData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ACTUALIZAR UNA HABITACIÓN
exports.updateHabitacion = async (req, res) => {
  try {
    const { tipoCuarto, tipoCama, precio, idAdmin } = req.body;

    let rutaImagen = null;
    if (req.file) {
      rutaImagen = `http://localhost:3000/uploads/${req.file.filename}`;
    }

    const habitacionData = {
      tipoCuarto,
      tipoCama,
      precio,
      idAdmin
    };

    if (rutaImagen) {
      habitacionData.imagen = rutaImagen;
    }

    await Habitacion.update(req.params.id, habitacionData);
    
    // Obtenemos los datos actualizados para responderle a React
    res.json({ idCuarto: req.params.id, ...habitacionData, ...(rutaImagen && { imagen: rutaImagen }) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ELIMINAR UNA HABITACIÓN
exports.deleteHabitacion = async (req, res) => {
  try {
    await Habitacion.delete(req.params.id);
    res.json({ message: 'Habitación eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};