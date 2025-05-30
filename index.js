const express = require('express');
const cors = require('cors');
const app = express();

const userRoutes = require('./routes/user.js');
const adminRoutes = require('./routes/admin.js');
const empleadosRoutes = require('./routes/empleados.js');


app.use(cors());
app.use(express.json());

// Rutas
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
app.use('/empleados', empleadosRoutes);


// Archivos estáticos (frontend)
app.use(express.static('public'));

app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});
// Este es el punto de entrada de la aplicación Express.
// Configura las rutas de usuario y administrador, y sirve archivos estáticos desde la carpeta 'public'.