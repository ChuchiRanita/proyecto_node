const express = require('express');
const router = express.Router();
const pool = require('../database.js');  // importa la conexión

router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM empleado');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener empleados' });
  }
});

module.exports = router;
