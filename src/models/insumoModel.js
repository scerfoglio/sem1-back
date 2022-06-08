
const mongoose = require('mongoose')

//Definición del esquema
const InsumosSchema = mongoose.Schema({
    id:{
        type: mongoose.Schema.ObjectId,
        ref: 'Insumos'
    },
    nombre: {
        type: String,
        required: [true, "No podés dejar un insumo sin nombre"]
    },
    descripción: String,
    unidad: {
        type: String,
        requerid: [true, "Tenés que ingesar una unidad para medir la cantidad (Gramos, Kilos, unidades, etc)"]
    },
    contacto:[{
        _id: mongoose.Schema.ObjectId,
        nombre: String,
        apellido: String,
        email: String,
        celular: String
    }],
    proyectos: [{
        _id: mongoose.Schema.ObjectId, 
        nombre: String,
        cantidad: Number,
        _idContacto: mongoose.Schema.ObjectId,
        emailContacto: String
    }] 
})


module.exports = mongoose.model('Insumo', InsumosSchema)
