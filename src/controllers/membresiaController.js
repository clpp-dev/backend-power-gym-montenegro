const Membresia = require('../models/Membresia');

// @desc    Obtener todas las membresías
// @route   GET /api/membresias
// @access  Public
const getMembresias = async (req, res) => {
  try {
    const membresias = await Membresia.find();
    res.status(200).json({
      success: true,
      count: membresias.length,
      data: membresias
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener las membresías',
      error: error.message
    });
  }
};

// @desc    Obtener una membresía por ID
// @route   GET /api/membresias/:id
// @access  Public
const getMembresiaById = async (req, res) => {
  try {
    const membresia = await Membresia.findById(req.params.id);
    
    if (!membresia) {
      return res.status(404).json({
        success: false,
        message: 'Membresía no encontrada'
      });
    }
    
    res.status(200).json({
      success: true,
      data: membresia
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener la membresía',
      error: error.message
    });
  }
};

// @desc    Crear una nueva membresía
// @route   POST /api/membresias
// @access  Public
const createMembresia = async (req, res) => {
  try {
    const membresia = await Membresia.create(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Membresía creada exitosamente',
      data: membresia
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al crear la membresía',
      error: error.message
    });
  }
};

// @desc    Actualizar una membresía
// @route   PUT /api/membresias/:id
// @access  Public
const updateMembresia = async (req, res) => {
  try {
    const membresia = await Membresia.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    
    if (!membresia) {
      return res.status(404).json({
        success: false,
        message: 'Membresía no encontrada'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Membresía actualizada exitosamente',
      data: membresia
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al actualizar la membresía',
      error: error.message
    });
  }
};

// @desc    Eliminar una membresía
// @route   DELETE /api/membresias/:id
// @access  Public
const deleteMembresia = async (req, res) => {
  try {
    const membresia = await Membresia.findByIdAndDelete(req.params.id);
    
    if (!membresia) {
      return res.status(404).json({
        success: false,
        message: 'Membresía no encontrada'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Membresía eliminada exitosamente',
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar la membresía',
      error: error.message
    });
  }
};

module.exports = {
  getMembresias,
  getMembresiaById,
  createMembresia,
  updateMembresia,
  deleteMembresia
};
