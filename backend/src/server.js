// src/server.js
const express = require("express");
const cors = require("cors");
require('dotenv').config();

// Importamos la conexión a la base de datos que acabamos de meter en config
const db = require('./config/db'); 

const app = express();
const PORT = process.env.PORT || 5000; // Tomará el del .env, si no, el 5000

const platilloRoutes = require('./routes/platilloRoutes');

app.use(cors());
app.use(express.json());
app.use('/api/platillos', platilloRoutes);

// RUTA DE PRUEBA: Para comprobar que la base de datos responde
app.get('/api/test-db', async (req, res) => {
  try {
    // Intenta una consulta básica a MySQL
    const [rows] = await db.query('SELECT 1 + 1 AS resultado');
    res.json({ message: "Conexión a MySQL exitosa, viva!", rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al conectar a MySQL", error: error.message });
  }
});

// RUTA DE LOGIN (Corregido el error de sintaxis en los parámetros)
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Por favor, ingresa todos los campos.' });
  }

  // Ejemplo de credenciales quemadas (Pronto lo cambiaremos por un db.query)
  if (email === 'admin@hotel.com' && password === 'password123') {
    return res.status(200).json({
      message: 'Autenticación exitosa',
      token: 'fake-jwt-token-for-management-system' 
    });
  } else {
    return res.status(401).json({ message: 'Credenciales incorrectas.' });
  }
});

// Usamos la variable PORT en lugar del número estático
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});