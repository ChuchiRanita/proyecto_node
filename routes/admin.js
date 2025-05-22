const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../config/database');
const router = express.Router();

router.post("/login", async (req, res) => {
    const { nombre, password } = req.body;
    if (!nombre || !password) return res.status(400).json({ message: "Campos incompletos" });

    const [rows] = await db.query("SELECT * FROM administrador WHERE nombre = ? AND password = ?", [nombre, password]);

    if (rows.length === 1) {
        const token = jwt.sign({ id: rows[0].id, nombre: rows[0].nombre }, "debugkey");
        return res.json({ message: token });
    }
    res.status(401).json({ message: "Credenciales inválidas" });
});
module.exports = router;


// Aquí (CRUD)
