const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { dbConnection } = require('./database/config');
const fileUpload = require("express-fileupload");
const router = express.Router();

//Creando sv express
const app = express();

//Base de datos
dbConnection();

//CORS
app.use(cors());

//Directorio público
app.use(express.static('public'));

//interpretar archivos
app.use(fileUpload({
  tempFileDir: '/temp'
}));

//Lectura y parseo del body
app.use(express.json());

/**Rutas**/
//Games
app.use('/api/games', require('./routes/games'));

//Auth
app.use('/api/auth', require('./routes/auth'));

//User
app.use('/api/user', require('./routes/user'));

//Images
app.use('/api/images', require('./routes/images'));

//Roles
app.use('/api/roles', require('./routes/roles'));

//Genre
app.use('/api/genres', require('./routes/genres'));

//Video
app.use('/api/videos', require('./routes/video'));

//ads
router.get('/ads.txt', (req, res) => {
  const filePath = join(__dirname, 'public/ads.txt')
  app.serveStatic(req, res, filePath)
})
router.get('*', (req, res) => handle(req, res))
app.use(express.static(__dirname + '/public'));



// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://api.steampowered.com');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});


//Escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en el puerto: ${process.env.PORT}`)
});
