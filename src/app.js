require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');

// Importar rutas
const clienteRoutes = require('./routes/clienteRoutes');
const membresiaRoutes = require('./routes/membresiaRoutes');

// Conectar a la base de datos
connectDB();

const app = express();

// Middleware
app.use(cors()); // Permite peticiones desde cualquier dominio
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.get('/', (req, res) => {
  res.json({
    message: 'API Power Gym Montenegro',
    version: '1.0.0',
    endpoints: {
      clientes: '/api/clientes',
      membresias: '/api/membresias'
    }
  });
});

app.use('/api/clientes', clienteRoutes);
app.use('/api/membresias', membresiaRoutes);

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada'
  });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor',
    error: err.message
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

module.exports = app;
