const express = require('express');
const db = require('../config/database');
const jwt = require('jsonwebtoken'); // <-- ¡Esta línea es esencial!

const router = express.Router();

router.post("/login", async (req, res) => {
    const { nombre, password } = req.body;
    if (!nombre || !password) return res.status(400).json({ message: "Campos incompletos" });

    const [rows] = await db.query("SELECT * FROM user WHERE nombre = ? AND password = ?", [nombre, password]);

    if (rows.length === 1) {
        const token = jwt.sign({ id: rows[0].id, nombre: rows[0].nombre }, "debugkey");
        return res.json({ message: token });
    }
    res.status(401).json({ message: "Credenciales inválidas" });
});

router.get("/empleados", async (req, res) => {
    const [rows] = await db.query("SELECT * FROM empleado");
    res.json(rows);
});

module.exports = router;
