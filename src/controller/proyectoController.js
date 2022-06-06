const Proyecto = require('../models/proyectoModel')
const Insumo = require('../models/insumoModel')


exports.add = function(req,res) {

    let body = req.body
    let proyecto = new Proyecto({
        nombre: body.nombre,
        area: body.area,
        campo_accion: body.campo_accion,
        descripcion: body.descripcion,
        fases: body.fases,
        usuarios: body.usuarios,
        insumos: body.insumos,
        emailContacto: body.emailContacto,
        contacto: body.contacto
    })
    
    proyecto.save((err,proyectoDB) => {
        let insumosConError = []
        let insumosRepetidos = []
        if(err) {
            return res.status(400).json({
                ok: false,
                err: err
            })
        }

        let proyectoDBAux = proyectoDB
        body.insumos.forEach((insumo) => {
            let proyectoAux =  {}
            proyectoAux.nombre = proyectoDBAux.nombre
            proyectoAux.emailContacto = proyectoDBAux.emailContacto
            proyectoAux._idContacto = proyectoDBAux._idContacto
            proyectoAux._id = proyectoDBAux._id
            Insumo.findOneAndUpdate({nombre: insumo.nombre, unidad: insumo.unidad}, { $push: {proyectos: proyectoAux }}, {
                new: true,
                runValidators: true,
                context: 'query',
                upsert: true
            } , (err, insumoDB) => {        
                if (err) {
                    console.log("este es un error",err)
                    insumosConError.push(insumo.nombre)
                }
            })
        })
         
        res.json({
            ok:true,
            proyecto: proyectoDB
        })
    })
}


exports.list = async function(req,res) {
    const normalFilterFields = ['area', 'campo_accion'];
    const regexFilterFields = ['descripcion'];
    const filters = {};
    for (const filterField of normalFilterFields) {
        if (req.query[filterField]) {
            filters[filterField] = req.query[filterField];
        }
    }
    for (const filterField of regexFilterFields) {
        if (req.query[filterField]) {
            filters[filterField] = { $regex: new RegExp(req.query[filterField], 'i') };
        }
    }
    const proyectos = await Proyecto.find(filters);
    res.json(proyectos)
}