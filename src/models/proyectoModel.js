const mongoose = require('mongoose')

//Definición del esquema
const proyectoSchema = mongoose.Schema({
    id:{
        type: mongoose.Schema.ObjectId,
        ref: 'Proyecto'
    },
    nombre: {
        type: String,
        required: [true, "No podés dejar un proyecto sin nombre"]
    },
    area: {
        type: String,
        required: [true, "Tenés que dejar asignado un área de proyecto"]
    },
    campo_accion: String,
    descripcion: {
        type: String,
        required: [true, "Es conveniente dar un descripción a un proyecto"]
    },
    fecha_inicio: {
        type: Date,
        required: [true, "Es necesario ingresar una fecha de inicio al proyecto"]

    },
    fecha_fin: Date,
    presupuesto_asignado: Number,
    presupuesto_utilizado: Number,
    fases: [{
        id: mongoose.Schema.ObjectId,
        nombre: String,
        descripcion: String,
        fecha_inicio: Date,
        fecha_fin: Date,
        presupuesto_asignado: Number,
        presupuesto_utilizado: Number
    }], 
    usuarios: [{
        id: mongoose.Schema.ObjectId,
        nombre: String,
        apellido: String,
        email: String
    }]

})

module.exports = mongoose.model('Proyecto', proyectoSchema)