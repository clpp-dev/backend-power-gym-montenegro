const AdminUser = require('../models/AdminUser');

// @desc    Login de usuario administrador
// @route   POST /api/admin/login
// @access  Public
const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validar que se envíen username y password
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Por favor proporcione username y password'
      });
    }

    // Buscar el usuario por username o email
    const admin = await AdminUser.findOne({
      $or: [{ username }, { email: username }]
    });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas'
      });
    }

    // Verificar la contraseña (sin encriptar por ahora)
    if (admin.password !== password) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas'
      });
    }

    // Verificar que el admin esté activo
    if (!admin.activo) {
      return res.status(401).json({
        success: false,
        message: 'Usuario inactivo. Contacte al administrador.'
      });
    }

    // Login exitoso - retornar datos del admin (sin la contraseña)
    const adminData = {
      _id: admin._id,
      username: admin.username,
      nombre: admin.nombre,
      email: admin.email,
      rol: admin.rol,
      activo: admin.activo
    };

    res.status(200).json({
      success: true,
      message: 'Login exitoso',
      data: adminData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al realizar login',
      error: error.message
    });
  }
};

// @desc    Obtener todos los usuarios administradores
// @route   GET /api/admin
// @access  Public
const getAdmins = async (req, res) => {
  try {
    const admins = await AdminUser.find().select('-password');
    res.status(200).json({
      success: true,
      count: admins.length,
      data: admins
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener los administradores',
      error: error.message
    });
  }
};

// @desc    Obtener un administrador por ID
// @route   GET /api/admin/:id
// @access  Public
const getAdminById = async (req, res) => {
  try {
    const admin = await AdminUser.findById(req.params.id).select('-password');
    
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Administrador no encontrado'
      });
    }
    
    res.status(200).json({
      success: true,
      data: admin
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener el administrador',
      error: error.message
    });
  }
};

// @desc    Obtener administrador por username
// @route   GET /api/admin/username/:username
// @access  Public
const getAdminByUsername = async (req, res) => {
  try {
    const admin = await AdminUser.findOne({ 
      username: req.params.username 
    }).select('-password');
    
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Administrador no encontrado'
      });
    }
    
    res.status(200).json({
      success: true,
      data: admin
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener el administrador',
      error: error.message
    });
  }
};

// @desc    Crear un nuevo administrador
// @route   POST /api/admin
// @access  Public
const createAdmin = async (req, res) => {
  try {
    const admin = await AdminUser.create(req.body);
    
    // Retornar sin la contraseña
    const adminData = {
      _id: admin._id,
      username: admin.username,
      nombre: admin.nombre,
      email: admin.email,
      rol: admin.rol,
      activo: admin.activo
    };
    
    res.status(201).json({
      success: true,
      message: 'Administrador creado exitosamente',
      data: adminData
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al crear el administrador',
      error: error.message
    });
  }
};

// @desc    Actualizar un administrador
// @route   PUT /api/admin/:id
// @access  Public
const updateAdmin = async (req, res) => {
  try {
    const admin = await AdminUser.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    ).select('-password');
    
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Administrador no encontrado'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Administrador actualizado exitosamente',
      data: admin
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al actualizar el administrador',
      error: error.message
    });
  }
};

// @desc    Eliminar un administrador
// @route   DELETE /api/admin/:id
// @access  Public
const deleteAdmin = async (req, res) => {
  try {
    const admin = await AdminUser.findByIdAndDelete(req.params.id);
    
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Administrador no encontrado'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Administrador eliminado exitosamente',
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar el administrador',
      error: error.message
    });
  }
};

module.exports = {
  loginAdmin
};
