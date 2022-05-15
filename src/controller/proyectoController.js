const Proyecto = require('../models/proyectoModel')
const {Mongoose} = require('mongoose')

exports.add = function(req,res) {
    let body = req.body
    let proyecto = new Proyecto({
        nombre: body.nombre,
        area: body.area,
        campo_accion: body.campo_accion,
        descripcion: body.descripcion,
        fases: body.fases,
        usuarios: body.usuarios
    })

    proyecto.save((err,proyectoDB) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                err: err
            })
        }

        res.json({
            of:true,
            proyecto: proyectoDB
        })
    })
}