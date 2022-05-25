const Proyecto = require('../models/proyectoModel')
const {Mongoose} = require('mongoose')

exports.add = function(req,res) {
    let body = req.body
    console.log(req)
    let proyecto = new Proyecto({
        nombre: body.nombre,
        area: body.area,
        campo_accion: body.campo_accion,
        descripcion: body.descripcion,
        fecha_inicio: body.fecha_inicio,
        fecha_fin: body.fecha_fin,
        presupuesto_asignado: body.presupuesto_asignado,
        presupuesto_utilizado: body.presupuesto_utilizado,
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