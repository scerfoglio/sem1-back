const Proyecto = require('../models/proyectoModel')


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