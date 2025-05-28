const express = require('express');
const cors = require('cors');
const app = express();
const userRoutes = require('./routes/user.js');
const adminRoutes = require('./routes/admin.js');
app.use(express.static('public'));


app.use(cors());
app.use(express.json());

app.use("/user", userRoutes);    // /user/login y /user/register
app.use("/admin", adminRoutes);  // rutas protegidas

app.listen(3000, () => {
    console.log("Servidor corriendo en puerto 3000");
});
