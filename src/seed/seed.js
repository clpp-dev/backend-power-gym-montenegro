require('dotenv').config();
const mongoose = require('mongoose');
const AdminUser = require('../models/AdminUser');
const Membresia = require('../models/Membresia');
const Cliente = require('../models/Cliente');

const adminUserData = {
  username: 'admin',
  nombre: 'Admin',
  email: 'admin@powergym.com',
  password: 'admin123',
  rol: 'admin',
  activo: true
};

const membresiasData = [
  {
    nombre: 'Plan Full Access',
    tipo: 'Mensual',
    duracion: 30,
    precio: 350000,
    descripcion: 'Acceso completo a todas las instalaciones.',
    beneficios: [
      'Acceso ilimitado al gimnasio',
      'Uso de todas las instalaciones',
      'Clases grupales',
      'Casillero'
    ],
    activo: true
  },
  {
    nombre: 'Plan Mañanas',
    tipo: 'Mensual',
    duracion: 30,
    precio: 195000,
    descripcion: 'Acceso solo en horario de mañana (6am - 3pm).',
    beneficios: [
      'Acceso al gimnasio en horario de mañana',
      'Uso de equipamiento básico',
      'Casillero'
    ],
    activo: true
  },
  {
    nombre: 'Plan Trimestral',
    tipo: 'Trimestral',
    duracion: 90,
    precio: 935000,
    descripcion: 'Acceso completo con descuento por 3 meses.',
    beneficios: [
      'Acceso ilimitado al gimnasio',
      'Uso de todas las instalaciones',
      'Clases grupales',
      'Casillero premium',
      'Descuento del 10%'
    ],
    activo: true
  },
  {
    nombre: 'Plan Anual VIP',
    tipo: 'Anual',
    duracion: 365,
    precio: 3600000,
    descripcion: 'Todos los beneficios, incluye entrenador personal.',
    beneficios: [
      'Acceso ilimitado 24/7',
      'Uso de todas las instalaciones',
      'Clases grupales ilimitadas',
      'Casillero premium',
      'Toalla incluida',
      'Entrenador personal (sesiones mensuales)',
      'Evaluación física mensual',
      'Plan nutricional personalizado'
    ],
    activo: true
  }
];

const seedDatabase = async () => {
  try {
    // Conectar a la base de datos
    await mongoose.connect(process.env.MONGODB_URI);
    
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
      const membresiasCreadas = await Membresia.insertMany(membresiasData);
      console.log('✓ Membresías de ejemplo creadas exitosamente');

      // Crear clientes de ejemplo con membresías asignadas
      const clientesData = [
        {
          nombre: 'Juan',
          apellido: 'Martínez',
          cedula: '123456789',
          email: 'juan.martinez@email.com',
          telefono: '321-123-3343',
          fechaNacimiento: '1990-05-15',
          fechaInscripcion: '2024-01-15',
          documento: {
            tipo: 'Cédula',
            numero: '123456789'
          },
          estado: 'Activo',
          membresia: membresiasCreadas[0]._id,
          fechaInicioMembresia: '2024-01-15',
          fechaFinMembresia: '2024-12-15',
          activo: true
        },
        {
          nombre: 'Carlos',
          apellido: 'Rodriguez',
          cedula: '987654321',
          email: 'carlos.r@email.com',
          telefono: '311-567-5424',
          fechaNacimiento: '1985-08-20',
          fechaInscripcion: '2023-06-20',
          documento: {
            tipo: 'Cédula',
            numero: '987654321'
          },
          estado: 'Inactivo',
          membresia: null,
          activo: false
        },
        {
          nombre: 'Laura',
          apellido: 'Hernández',
          cedula: '456655333',
          email: 'laura.h@email.com',
          telefono: '315-345-3415',
          fechaNacimiento: '1992-03-10',
          fechaInscripcion: '2024-03-10',
          documento: {
            tipo: 'Cédula',
            numero: '456655333'
          },
          estado: 'Próximo a Vencer',
          membresia: membresiasCreadas[1]._id,
          fechaInicioMembresia: '2024-03-10',
          fechaFinMembresia: '2024-12-10',
          activo: true
        }
      ];

      const clientesCount = await Cliente.countDocuments();
      if (clientesCount === 0) {
        await Cliente.insertMany(clientesData);
        console.log('✓ Clientes de ejemplo creados exitosamente');
      }
    } else {
      console.log('✓ Ya existen membresías en la base de datos');
    }

    console.log('\n========================================');
    console.log('SEED completado exitosamente');
    console.log('========================================');
    console.log('\nCredenciales del administrador:');
    console.log('Username:', adminUserData.username);
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
