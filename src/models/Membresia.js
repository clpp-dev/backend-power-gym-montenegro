const mongoose = require('mongoose');

const membresiaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre de la membresía es obligatorio'],
    trim: true,
    unique: true
  },
  descripcion: {
    type: String,
    required: [true, 'La descripción es obligatoria'],
    trim: true
  },
  precio: {
    type: Number,
    required: [true, 'El precio es obligatorio'],
    min: 0
  },
  duracion: {
    type: Number,
    required: [true, 'La duración en días es obligatoria'],
    min: 1
  },
  beneficios: [{
    type: String
  }],
  activo: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Membresia', membresiaSchema);
