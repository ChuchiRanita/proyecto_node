const mysql = require('mysql2/promise');

async function test() {
  try {
    console.log('🧪 Conectando a 127.0.0.1 como admin_node...');
    const db = await mysql.createConnection({
      host: 'localhost',
      port: 3307,
      user: 'root',
      password: '',
      database: 'node_project',
      socketPath: null

    });

    console.log('✅ Conexión exitosa a MySQL.');
    const [rows] = await db.query('SHOW TABLES');
    console.log('Tablas:', rows);
    await db.end();
  } catch (error) {
    console.error('❌ Error de conexión:', error.message);
  }
}

test();
