const express = require('express');
const router = express.Router();
const db = require('../database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET = 'secreto_seguro'; // o usa dotenv

// Registro
router.post('/register', async (req, res) => {
  const { user_name, password } = req.body;

  try {
    const [exists] = await db.query('SELECT * FROM usuarios WHERE user_name = ?', [user_name]);
    if (exists.length > 0) return res.status(409).json({ message: 'Usuario ya existe' });

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query('INSERT INTO usuarios (user_name, password) VALUES (?, ?)', [user_name, hashedPassword]);

    res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar usuario' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { user_name, password } = req.body;

  try {
    const [users] = await db.query('SELECT * FROM usuarios WHERE user_name = ?', [user_name]);
    if (users.length === 0) return res.status(401).json({ message: 'Usuario no encontrado' });

    const user = users[0];
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: user.id, user_name: user.user_name }, SECRET, { expiresIn: '2h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

module.exports = router;
