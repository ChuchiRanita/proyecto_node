const express = require('express');
const router = express.Router();
const db = require('../database');
const auth = require('../middleware/auth');

// Ruta protegida para obtener todos los empleados
router.get('/empleados', auth, async (req, res) => {
  try {
    const [empleados] = await db.query('SELECT * FROM empleados');
    res.json(empleados);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener empleados' });
  }
});

module.exports = router;
