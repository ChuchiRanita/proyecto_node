const express = require('express');
const router = express.Router();
const db = require('../database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET = 'secreto_seguro';

// Registro
router.post('/register', async (req, res) => {
  const { user_name, password } = req.body;
  console.log("Registro recibido:", req.body);

  if (!user_name || !password) {
    return res.status(400).json({ message: 'Datos incompletos' });
  }

  try {
    const [exists] = await db.query('SELECT * FROM user WHERE user_name = ?', [user_name]);
    if (exists.length > 0) {
      return res.status(409).json({ message: 'Usuario ya existe' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query('INSERT INTO user (user_name, password) VALUES (?, ?)', [user_name, hashedPassword]);

    res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (error) {
    console.error("ERROR en registro:", error);
    res.status(500).json({ message: 'Error al registrar usuario', error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { user_name, password } = req.body;
  console.log("Login recibido:", req.body);

  if (!user_name || !password) {
    return res.status(400).json({ message: 'Datos incompletos' });
  }

  try {
    // Primero buscamos en la tabla de administradores
    const [admins] = await db.query('SELECT * FROM administrador WHERE admin_name = ?', [user_name]);
    if (admins.length > 0) {
      const admin = admins[0];
      const valid = await bcrypt.compare(password, admin.password);
      if (!valid) {
        return res.status(401).json({ message: 'Contraseña incorrecta' });
      }

      // Si es administrador, generamos token con role: 'admin'
      const token = jwt.sign(
        { id: admin.id_admin, user_name: admin.admin_name, role: 'admin' },
        SECRET,
        { expiresIn: '2h' }
      );
      return res.json({ token });
    }

    // Si no es admin, buscamos en la tabla user (usuario normal)
    const [users] = await db.query('SELECT * FROM user WHERE user_name = ?', [user_name]);
    if (users.length === 0) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    const user = users[0];
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // Si es usuario normal, generamos token con role: 'user'
    const token = jwt.sign(
      { id: user.id, user_name: user.user_name, role: 'user' },
      SECRET,
      { expiresIn: '2h' }
    );
    res.json({ token });

  } catch (error) {
    console.error("ERROR en login:", error);
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
});


module.exports = router;
