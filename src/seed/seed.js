require('dotenv').config();
const mongoose = require('mongoose');
const AdminUser = require('../models/AdminUser');
const Membresia = require('../models/Membresia');

const adminUserData = {
  nombre: 'Administrador',
  email: 'admin@powergym.com',
  password: 'admin123',
  rol: 'superadmin',
  activo: true
};

const membresiasData = [
  {
    nombre: 'Básica',
    descripcion: 'Membresía básica con acceso al gimnasio',
    precio: 25.00,
    duracion: 30,
    beneficios: [
      'Acceso al gimnasio',
      'Uso de equipamiento básico',
      'Casillero'
    ],
    activo: true
  },
  {
    nombre: 'Premium',
    descripcion: 'Membresía premium con todos los beneficios',
    precio: 45.00,
    duracion: 30,
    beneficios: [
      'Acceso ilimitado al gimnasio',
      'Uso de todas las instalaciones',
      'Clases grupales',
      'Casillero premium',
      'Toalla incluida',
      '1 sesión de entrenador personal'
    ],
    activo: true
  },
  {
    nombre: 'Anual',
    descripcion: 'Membresía anual con descuento especial',
    precio: 450.00,
    duracion: 365,
    beneficios: [
      'Acceso ilimitado al gimnasio',
      'Uso de todas las instalaciones',
      'Clases grupales ilimitadas',
      'Casillero premium',
      'Toalla incluida',
      '5 sesiones de entrenador personal',
      'Evaluación física mensual'
    ],
    activo: true
  }
];

const seedDatabase = async () => {
  try {
    // Conectar a la base de datos
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('Conectado a MongoDB');

    // Verificar si ya existe el usuario administrador
    const adminExists = await AdminUser.findOne({ email: adminUserData.email });
    
    if (!adminExists) {
      await AdminUser.create(adminUserData);
      console.log('✓ Usuario administrador creado exitosamente');
    } else {
      console.log('✓ Usuario administrador ya existe');
    }

    // Verificar si ya existen membresías
    const membresiasCount = await Membresia.countDocuments();
    
    if (membresiasCount === 0) {
      await Membresia.insertMany(membresiasData);
      console.log('✓ Membresías de ejemplo creadas exitosamente');
    } else {
      console.log('✓ Ya existen membresías en la base de datos');
    }

    console.log('\n========================================');
    console.log('SEED completado exitosamente');
    console.log('========================================');
    console.log('\nCredenciales del administrador:');
    console.log('Email:', adminUserData.email);
    console.log('Password:', adminUserData.password);
    console.log('========================================\n');

    process.exit(0);
  } catch (error) {
    console.error('Error al ejecutar el seed:', error.message);
    process.exit(1);
  }
};

seedDatabase();
