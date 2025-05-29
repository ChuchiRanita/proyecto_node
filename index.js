const express = require('express');
const cors = require('cors');
const app = express();
const userRoutes = require('./routes/user.js');
const adminRoutes = require('./routes/admin.js');

app.use(cors());
app.use(express.json());
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
app.use(express.static('public'));

app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});
