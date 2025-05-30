const express = require('express');
const router = express.Router();
const db = require('../database');
const auth = require('../middleware/auth'); // Middleware de autenticación

// Middleware para restringir acceso solo a administradores
function soloAdmin(req, res, next) {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Acceso denegado: solo administradores' });
  }
  next();
}

// Obtener todos los empleados (solo admin)
router.get('/empleados', auth, soloAdmin, async (req, res) => {
  try {
    const [empleados] = await db.query('SELECT * FROM empleado');
    res.json(empleados);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener empleados', error: err });
  }
});

// Agregar nuevo empleado (solo admin)
router.post('/empleados', auth, soloAdmin, async (req, res) => {
  const { e_name, e_lastname, e_phone, e_email, e_address } = req.body;

  if (!e_name || !e_lastname || !e_phone || !e_email || !e_address) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  try {
    await db.query(
      'INSERT INTO empleado (e_name, e_lastname, e_phone, e_email, e_address) VALUES (?, ?, ?, ?, ?)',
      [e_name, e_lastname, e_phone, e_email, e_address]
    );
    res.json({ message: 'Empleado agregado correctamente' });
  } catch (err) {
    res.status(500).json({ message: 'Error al agregar empleado', error: err });
  }
});

// Modificar empleado por ID (solo admin)
router.put('/empleados/:id', auth, soloAdmin, async (req, res) => {
  const { id } = req.params;
  const { e_name, e_lastname, e_phone, e_email, e_address } = req.body;

  if (!e_name || !e_lastname || !e_phone || !e_email || !e_address) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  try {
    await db.query(
      'UPDATE empleado SET e_name = ?, e_lastname = ?, e_phone = ?, e_email = ?, e_address = ? WHERE id_employee = ?',
      [e_name, e_lastname, e_phone, e_email, e_address, id]
    );
    res.json({ message: 'Empleado actualizado correctamente' });
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar empleado', error: err });
  }
});

// Eliminar empleado por ID (solo admin)
router.delete('/empleados/:id', auth, soloAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM empleado WHERE id_employee = ?', [id]);
    res.json({ message: 'Empleado eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar empleado', error: err });
  }
});

// Buscar empleados por nombre (solo admin)
router.get('/empleados/buscar/:nombre', auth, soloAdmin, async (req, res) => {
  const { nombre } = req.params;
  try {
    const [result] = await db.query('SELECT * FROM empleado WHERE e_name LIKE ?', [`%${nombre}%`]);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: 'Error al buscar empleados', error: err });
  }
});

module.exports = router;
