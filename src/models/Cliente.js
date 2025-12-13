const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true
  },
  apellido: {
    type: String,
    required: [true, 'El apellido es obligatorio'],
    trim: true
  },
  cedula: {
    type: String,
    required: [true, 'La cédula es obligatoria'],
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: [true, 'El email es obligatorio'],
    unique: true,
    lowercase: true,
    trim: true
  },
  telefono: {
    type: String,
    required: [true, 'El teléfono es obligatorio'],
    trim: true
  },
  fechaNacimiento: {
    type: Date,
    required: [true, 'La fecha de nacimiento es obligatoria']
  },
  direccion: {
    type: String,
    trim: true
  },
  documento: {
    tipo: {
      type: String,
      enum: ['DNI', 'Pasaporte', 'Cédula'],
      default: 'DNI'
    },
    numero: {
      type: String,
      required: [true, 'El número de documento es obligatorio'],
      unique: true
    }
  },
  membresia: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Membresia'
  },
  fechaInicioMembresia: {
    type: Date
  },
  fechaFinMembresia: {
    type: Date
  },
  fechaInscripcion: {
    type: Date,
    default: Date.now
  },
  estado: {
    type: String,
    enum: ['Activo', 'Inactivo', 'Próximo a Vencer'],
    default: 'Activo'
  },
  activo: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Cliente', clienteSchema);
