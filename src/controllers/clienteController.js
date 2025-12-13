const Cliente = require('../models/Cliente');

// @desc    Obtener todos los clientes
// @route   GET /api/clientes
// @access  Public
const getClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find().populate('membresia');
    res.status(200).json({
      success: true,
      count: clientes.length,
      data: clientes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener los clientes',
      error: error.message
    });
  }
};

// @desc    Obtener un cliente por ID
// @route   GET /api/clientes/:id
// @access  Public
const getClienteById = async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id).populate('membresia');
    
    if (!cliente) {
      return res.status(404).json({
        success: false,
        message: 'Cliente no encontrado'
      });
    }
    
    res.status(200).json({
      success: true,
      data: cliente
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener el cliente',
      error: error.message
    });
  }
};

// @desc    Crear un nuevo cliente
// @route   POST /api/clientes
// @access  Public
const createCliente = async (req, res) => {
  try {
    const cliente = await Cliente.create(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Cliente creado exitosamente',
      data: cliente
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al crear el cliente',
      error: error.message
    });
  }
};

// @desc    Actualizar un cliente
// @route   PUT /api/clientes/:id
// @access  Public
const updateCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    ).populate('membresia');
    
    if (!cliente) {
      return res.status(404).json({
        success: false,
        message: 'Cliente no encontrado'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Cliente actualizado exitosamente',
      data: cliente
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al actualizar el cliente',
      error: error.message
    });
  }
};

// @desc    Eliminar un cliente
// @route   DELETE /api/clientes/:id
// @access  Public
const deleteCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findByIdAndDelete(req.params.id);
    
    if (!cliente) {
      return res.status(404).json({
        success: false,
        message: 'Cliente no encontrado'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Cliente eliminado exitosamente',
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar el cliente',
      error: error.message
    });
  }
};

module.exports = {
  getClientes,
  getClienteById,
  createCliente,
  updateCliente,
  deleteCliente
};
