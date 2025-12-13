require('dotenv').config();
const mongoose = require('mongoose');
const AdminUser = require('../models/AdminUser');
const Membresia = require('../models/Membresia');
const Cliente = require('../models/Cliente');

const resetDatabase = async () => {
  try {
    // Conectar a la base de datos
    await mongoose.connect(process.env.MONGODB_URI);
    
    console.log('Conectado a MongoDB');
    console.log('\n⚠️  ADVERTENCIA: Esto eliminará todos los datos de la base de datos');
    
    // Eliminar todas las colecciones
    await AdminUser.deleteMany({});
    console.log('✓ Colección AdminUsers limpiada');
    
    await Cliente.deleteMany({});
    console.log('✓ Colección Clientes limpiada');
    
    await Membresia.deleteMany({});
    console.log('✓ Colección Membresías limpiada');
    
    console.log('\n========================================');
    console.log('Base de datos reseteada exitosamente');
    console.log('Ejecuta "npm run seed" para poblar con datos de ejemplo');
    console.log('========================================\n');
    
    process.exit(0);
  } catch (error) {
    console.error('Error al resetear la base de datos:', error.message);
    process.exit(1);
  }
};

resetDatabase();
