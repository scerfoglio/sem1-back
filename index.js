const projectRoutes = require('./src/routes/router')
require(('./src/config/config.js'))

const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');


// Start de la app
let app = express();

//Encabezados para HTTP
app.use(express.json());
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", process.env.ORIGIN);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Access-Control-Allow-Origin');
  if ('OPTIONS' == req.method) {
    res.sendStatus(200);
  }
  else {
    next();
  }
});
app.options('*', cors());

//Utilización de CORS
app.use(cors({
  origin: process.env.ORIGIN
}));

// Aca el Body Parser para parsear los requests
app.use(express.urlencoded({ extended: false }));

function errorHandler(err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message
    }
  })
}

// Hola mundo en el base
app.get('/', (req, res) => res.send('Backend de encuestas v1.0.0'));

// Middlewares
app.use(errorHandler);
app.use('/api', projectRoutes);



const uri = process.env.URL_DB;
//const options = { useNewUrlParser: true, useUnifiedTopology: true }
//const mongo = mongoose.connect(uri, options);
const mongo = mongoose.connect(uri);

mongo.then(() => {
  console.log('Conectado a Mongo');
}, error => {
  console.log(error, 'Error en la conexion');
})
 
// Deployar la app en el puerto configurado
app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}!`)
});
