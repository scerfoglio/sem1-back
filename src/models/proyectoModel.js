const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

//Definición del esquema
const proyectoSchema = mongoose.Schema({
    id:{
        type: mongoose.Schema.ObjectId,
        ref: 'Proyectos'
    },
    nombre: {
        type: String,
        required: [true, "No podés dejar un proyecto sin nombre"]
        ,unique: true
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
        _id: {
            type: mongoose.Schema.ObjectId,
            refPath: "Usuarios"
        },
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
        },
        responsable: String,
        pendiente: {
           _id: mongoose.Schema.ObjectId,
            cantidad: Number,
            solicitado: Boolean, 
            aceptado: Boolean,
            solicitante: String
        }
    }],
    contacto:[{
        idContacto: {
            type: mongoose.Schema.ObjectId,
        }
    }]

})

//La documentación pide esto para poder manejar los mensajes de una forma más amigable
proyectoSchema.plugin(uniqueValidator, {
    message: '{PATH} del proyecto debe de ser único'
})

module.exports = mongoose.model('Proyecto', proyectoSchema)