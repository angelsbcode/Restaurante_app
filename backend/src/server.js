const express = require("express");
const cors = require("cors");
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Ruta de Login para simular la autenticación
app.post('/api/login', (express.json(), (req, res) => {
  const { email, password } = req.body;

  // Validación básica mockeada
  if (!email || !password) {
    return res.status(400).json({ message: 'Por favor, ingresa todos los campos.' });
  }

  // Ejemplo de credenciales quemadas (En producción deberás buscar en tu Base de Datos)
  if (email === 'admin@hotel.com' && password === 'password123') {
    return res.status(200).json({
      message: 'Autenticación exitosa',
      token: 'fake-jwt-token-for-management-system' 
    });
  } else {
    return res.status(401).json({ message: 'Credenciales incorrectas.' });
  }
}));

app.listen(3001, () => {
    console.log("Servidor iniciado");
});