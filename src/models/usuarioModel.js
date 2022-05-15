const mongoose = require('mongoose')

//Definición del esquema
const usuarioSchema = mongoose.Schema({
    id:{
        type: mongoose.Schema.ObjectId,
        ref: 'Usuario'
    },
    nombre:{
        type: String,
        required: [true, "Tenés que ingresar un nombre de usuario"]
    },
    apellido:{
        type: String,
        required: [true, "Tenés que ingresar un apellido de usuario"]
    },
    email: {
        type: String,
        required: [true, "Tenés que ingresar un email válido"]
    },
    fecha_creacion: {
        type: Date,
        default: Date.now
    },
    ultima_actualizacion: {
        type: Date,
        default: Date.now
    },
    password: {
        type: String,
        required: [true, "Tenés que ingresar una contraseña"]
    },
    baja_logica: {
        type: Boolean,
        default: false
    },
    proyectos: {
        cantidad_proyectos: {
            type: Number
        },
        proyecto: [{
            id: Number,
            nombre: String,

        }]
    }

});

//Redefino toJson para que no se devuelva la password en un get
usuarioSchema.methods.toJSON = function () {
    let usuario = this;
    let usuarioObject = usuario.toObject();
    delete usuarioObject.password;
    return usuarioObject;
}

module.exports = mongoose.model('Usuario', usuarioSchema)