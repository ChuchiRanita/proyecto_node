const express = require('express');
const cors = require('cors');
const app = express();
const userRoutes = require('./routes/user.js');
const adminRoutes = require('./routes/admin.js');

console.log("userRoutes:", userRoutes);
console.log("adminRoutes:", adminRoutes);

app.use(cors());
app.use(express.json());

app.use("/user", userRoutes);
app.use("/admin", adminRoutes);

app.listen(3000, () => {
    console.log("Servidor corriendo en puerto 3000");
});
