/*
* Nombre de Reactivo
* Cantidad de Reactivo. 
* Unidades (Lo vamos a usar para concatenar en la cantidad ($cantidad $unidades, quedando 500 mg))
*  Cantidad de Reactivo utlizado
* Contacto (el contacto puede ser el responsable del proyecto o uno 
           asignado por el responsable)
*  Estado (Una lista de los siguientes valores: En uso (no se puede prestar aún), Disponible (Ya no se necesita y se puede pedir el prestado), No disponible (No se deja disponible para compartirlo), Solicitado (El insumo ya fue solicitado por alguien), Sin Stock.

*  Proyectos que usan la misma identificacón de reactico / insumo
*/

const mongoose = require('mongoose')

//Definición del esquema
const proyectoSchema = mongoose.Schema({
    id:{
        type: mongoose.Schema.ObjectId,
        ref: 'Insumos'
    },
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
        _idContacto: mongoose.Schema.ObjectId,
        emailContacto: String
    }] 
})