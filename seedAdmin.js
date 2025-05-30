const bcrypt = require('bcryptjs');
const db = require('./database'); // Asegúrate que esta ruta sea correcta

(async () => {
  try {
    const hashed = await bcrypt.hash('admin123', 10);
    await db.query(
      'INSERT INTO administrador (admin_name, password) VALUES (?, ?)',
      ['admin', hashed]
    );
    console.log('✅ Administrador insertado correctamente');
    process.exit(); // Finaliza el script
  } catch (error) {
    console.error('❌ Error al insertar admin:', error.message);
    process.exit(1);
  }
})();
