# Backend Power Gym Montenegro

API REST para la gestión de clientes y membresías del gimnasio Power Gym Montenegro. Desarrollado con Node.js, Express y MongoDB.

## 🚀 Características

- API RESTful con arquitectura MVC
- Gestión completa de clientes (CRUD)
- Gestión completa de membresías (CRUD)
- Conexión a MongoDB con Mongoose
- CORS habilitado para todas las peticiones
- Usuario administrador por defecto
- Validaciones de datos
- Manejo de errores

## 📋 Prerequisitos

- Node.js (v14 o superior)
- MongoDB Atlas account o MongoDB local
- npm o yarn

## 🔧 Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/clpp-dev/backend-power-gym-montenegro.git
cd backend-power-gym-montenegro
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:

El archivo `.env` ya está configurado con:
```env
PORT=5000
MONGODB_URI=mongodb+srv://clperez341:*crisandresPS4*@clusterpowergymmonteneg.zebsns3.mongodb.net/?appName=ClusterPowerGymMontenegro
```

4. Ejecutar el seed para crear el usuario administrador y datos de ejemplo:
```bash
npm run seed
```

## 🏃‍♂️ Ejecución

### Modo desarrollo (con auto-restart):
```bash
npm run dev
```

### Modo producción:
```bash
npm start
```

El servidor se ejecutará en `http://localhost:5000`

## 📁 Estructura del Proyecto

```
backend-power-gym-montenegro/
├── src/
│   ├── config/
│   │   └── database.js          # Configuración de MongoDB
│   ├── controllers/
│   │   ├── clienteController.js # Lógica de clientes
│   │   └── membresiaController.js # Lógica de membresías
│   ├── models/
│   │   ├── AdminUser.js         # Modelo de usuario administrador
│   │   ├── Cliente.js           # Modelo de cliente
│   │   └── Membresia.js         # Modelo de membresía
│   ├── routes/
│   │   ├── clienteRoutes.js     # Rutas de clientes
│   │   └── membresiaRoutes.js   # Rutas de membresías
│   ├── seed/
│   │   └── seed.js              # Script para datos iniciales
│   └── app.js                   # Configuración principal de Express
├── .env                         # Variables de entorno
├── .gitignore
├── package.json
├── API_DOCUMENTATION.md         # Documentación completa de endpoints
└── README.md
```

## 🔑 Usuario Administrador

Después de ejecutar `npm run seed`, tendrás acceso a:

- **Email:** admin@powergym.com
- **Password:** admin123
- **Rol:** superadmin

## 📚 Endpoints Principales

### Clientes
- `GET /api/clientes` - Obtener todos los clientes
- `GET /api/clientes/:id` - Obtener un cliente específico
- `POST /api/clientes` - Crear nuevo cliente
- `PUT /api/clientes/:id` - Actualizar cliente
- `DELETE /api/clientes/:id` - Eliminar cliente

### Membresías
- `GET /api/membresias` - Obtener todas las membresías
- `GET /api/membresias/:id` - Obtener una membresía específica
- `POST /api/membresias` - Crear nueva membresía
- `PUT /api/membresias/:id` - Actualizar membresía
- `DELETE /api/membresias/:id` - Eliminar membresía

Para más detalles sobre los endpoints, consultar [API_DOCUMENTATION.md](API_DOCUMENTATION.md)

## 🗄️ Modelos de Datos

### Cliente
```javascript
{
  nombre: String (requerido),
  apellido: String (requerido),
  email: String (requerido, único),
  telefono: String (requerido),
  fechaNacimiento: Date (requerido),
  direccion: String,
  documento: {
    tipo: String (DNI, Pasaporte, Cédula),
    numero: String (requerido, único)
  },
  membresia: ObjectId (referencia a Membresia),
  fechaInscripcion: Date,
  activo: Boolean
}
```

### Membresía
```javascript
{
  nombre: String (requerido, único),
  descripcion: String (requerido),
  precio: Number (requerido),
  duracion: Number (requerido, en días),
  beneficios: [String],
  activo: Boolean
}
```

### AdminUser
```javascript
{
  nombre: String (requerido),
  email: String (requerido, único),
  password: String (requerido),
  rol: String (admin, superadmin),
  activo: Boolean
}
```

## 🛠️ Tecnologías Utilizadas

- **Node.js** - Entorno de ejecución
- **Express** - Framework web
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **CORS** - Manejo de peticiones cross-origin
- **dotenv** - Gestión de variables de entorno
- **nodemon** - Auto-restart en desarrollo

## 📝 Scripts Disponibles

- `npm start` - Inicia el servidor en modo producción
- `npm run dev` - Inicia el servidor en modo desarrollo con nodemon
- `npm run seed` - Ejecuta el script de seed para poblar la base de datos

## 🤝 Contribución

1. Fork del proyecto
2. Crear rama para la feature (`git checkout -b feature/AmazingFeature`)
3. Commit de los cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📄 Licencia

ISC

## ✉️ Contacto

Para más información o soporte, contactar al equipo de desarrollo.

---

Desarrollado con ❤️ para Power Gym Montenegro
