const express = require("express");
require("dotenv").config();
const cors = require("cors");
const {dbConnection} = require('./database/config')

//Creando sv express
const app = express();

//Base de datos
dbConnection();

//CORS
app.use(cors());

//Directorio público
app.use( express.static('public') );

//Lectura y parseo del body
app.use(express.json());

/**Rutas**/
//Games
app.use('/api/games', require('./routes/games'));

//Auth
app.use('/api/auth', require('./routes/auth'));



//Escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en el puerto: ${process.env.PORT}`)
});
