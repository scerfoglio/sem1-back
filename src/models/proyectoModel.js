const mongoose = require('mongoose')

//Definición del esquema
const proyectoSchema = mongoose.Schema({
    _id:{
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
    emailContacto: String,
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
        email: String,
        
    }], 
    insumos:[{
        _id: mongoose.Schema.ObjectId,
        nombre: {
            type: String,
            required: [true, "No podés dejar un insumo sin nombre"]
        },
        descripción: String,
        cantidad: {
            type: Number,
            requerid: [true, "Es necesario ingresar una cantidad de reactivo"]
        },
        unidad: {
            type: String,
            requerid: [true, "Tenés que ingesar una unidad para medir la cantidad (Gramos, Kilos, unidades, etc)"]
        }
    }],
    contacto:[{
        _id: mongoose.Schema.ObjectId
    }]

})

module.exports = mongoose.model('Proyecto', proyectoSchema)