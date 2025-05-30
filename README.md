Las dependencias las meti a un gitignore para descargarlas solo hace falta escribir "npm install" dentro de la carpeta donde este el proyecto.

El comando para iniciar el servidor es "npm start" y para ver el nodemon donde cada modificacion al codigo reinicia el servidor el comando es "npm run dev"

la ruta para entrar al login inicial es: http://localhost:3000/login.html

Dentro de la carpeta Database se encuentra la base de datos que necesita ser importada a phpMyAdmin con el mismo nombre.
Credenciales del administrador en base de datos:
  -  Nombre de usuario: admin
  -  Contraseña: admin123
Aunque se agrego la pagina para registrar nuevos usuarios (con permisos solo para ver la lista de empleados), aqui dejo las credenciales del usuario ya creado en la base de datos:
  -  Nombre de usuario: User1_test
  -  Contraseña: testeo

      --> Importante <--
     Es posible que no conecte con la base de datos si es asi debe ser porque cambie el puerto a donde se conecta de 3306 a 3307, puedes modificarlo en database.js
     const mysql = require('mysql2/promise');

      module.exports = mysql.createPool({
        host: 'localhost',
        port: 3307, <------- Justo aqui
        user: 'root',
        password: '',
        database: 'node_project',
    });



Creditos de style:
PAGINA: https://uiverse.io
  -  Copyright - 2025 mrhyddenn  
  -  Copyright - 2025 satyamchaudharydev (satyam)
  -  Copyright - 2025 AmIt-DasIT 
  -  Copyright - 2025 AmIt-DasIT (AmitDas) 
