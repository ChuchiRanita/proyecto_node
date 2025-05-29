const mysql = require('mysql2/promise');

module.exports = mysql.createPool({
    host: 'localhost',
    port: 3307,
    user: 'root',
    password: '',
    database: 'node_project',
});