const Platillo = require('../models/platilloModel');

exports.getPlatillos = async (req, res) => {
  try {
    const data = await Platillo.getAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createPlatillo = async (req, res) => {
  try {
    const id = await Platillo.create(req.body);
    res.status(201).json({ idPlatillo: id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePlatillo = async (req, res) => {
  try {
    await Platillo.update(req.params.id, req.body);
    res.json({ message: 'Platillo actualizado con éxito' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deletePlatillo = async (req, res) => {
  try {
    await Platillo.delete(req.params.id);
    res.json({ message: 'Platillo eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};