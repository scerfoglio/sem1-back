// ======================
// Puerto
// ======================
process.env.PORT = process.env.PORT || 3000

// ======================
// Entorno
// ======================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

// ======================
// origin
// ======================
process.env.ORIGIN = process.env.ORIGIN || 'http://localhost:3000'


// ======================
// Base de datos
// ======================
let urlDB;
if ( process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb+srv://projectadmin-dev:projectadmin-dev@cluster0.rhifb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

} 
else {
    urlDB = 'mongodb+srv://backendEncuestasUser:ItaliaRoma.01!@cluster0.ftjms.mongodb.net/backend_encuestas?retryWrites=true&w=majority'
}
process.env.URL_DB = urlDB

// ======================
// Vencimiento del token
// ======================
// 60 segundos
// 60 minutos
// 24 horas
// 30 días
process.env.CADUCIDAD_TOKEN = '15h'

// ======================
// sEED de autenticación
// ======================
process.env.SEED = process.env.SEED || 'SECRET'