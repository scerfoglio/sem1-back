const Proyecto = require('../models/proyectoModel')
const Insumo = require('../models/insumoModel')


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
        usuarios: body.usuarios,
        insumos: body.insumos,
        emailContacto: body.emailContacto,
        contacto: body.contacto
    })

    proyecto.save((err,proyectoDB) => {
        let insumosConError = []
        if(err) {
            return res.status(400).json({
                ok: false,
                err: err
            })
        }

        let proyectoDBAux = proyectoDB
        body.insumos.forEach((insumo) => {
            Insumo.findOneAndUpdate({nombre: insumo.nombre, unidad: insumo.unidad, "proyectos.nombre": proyectoDBAux.nombre}, { $inc: {"proyectos.$.cantidad": insumo.cantidad }}, {
                new: true,
                runValidators: true,
                context: 'query',
                upsert: false
            } , (err, insumoDB) => {        
                if (err) {
                    console.log(err)
                    insumosConError.push(insumo.nombre)
                }

                if (insumoDB == null ) {

                    let proyectoAux2 =  {}
                    proyectoAux2.nombre = proyectoDBAux.nombre
                    proyectoAux2.emailContacto = proyectoDBAux.emailContacto
                    proyectoAux2._idContacto = proyectoDBAux._idContacto
                    proyectoAux2._id = proyectoDBAux._id
                    proyectoAux2.cantidad = insumo.cantidad

                    let proyectoArray = []
                    proyectoArray.push(proyectoAux2)

                    Insumo.findOneAndUpdate({nombre: insumo.nombre, unidad: insumo.unidad}, { $push: {proyectos: proyectoArray }}, {
                        new: true,
                        runValidators: true,
                        context: 'query',
                        upsert: false
                    } , (err, insumoDBProyecto) => {        
                        if (err) {
                            console.log(err)
                            insumosConError.push(insumo.nombre)
                        }
                        console.log("insumoDBProyecto", insumoDBProyecto)
                        if (insumoDBProyecto === null) {
                            console.log("Generando nuevo insumo")
                            let nuevoInsumo = new Insumo()
                            nuevoInsumo.nombre = insumo.nombre
                            nuevoInsumo.unidad = insumo.unidad
                            nuevoInsumo.proyectos = proyectoAux2
        
                            nuevoInsumo.save((err,nuevoInsumoDB) => {
                                if(err) {
                                    console.log("Error al generar el insumo", err)
                                    insumosConError.push(insumo)
                                }
                            })
                            
                        }
                        
                    })
                }
            })
        })
         
        res.json({
            ok:true,
            proyecto: proyectoDB
        })
    })
}

exports.addInsumo = function(req,res) {
    let id = req.params.id
    let body = req.body
    let insumosConError = []

    Proyecto.findOneAndUpdate({_id: id, "insumos.nombre": body.nombre, "insumos.unidad": body.unidad},{ $inc: {"insumos.$.cantidad": body.cantidad }}, {
        new: true,
        runValidators: true,
        context: 'query',
        upsert: false
    } , (err, proyectoDB) => {    
        if(err) {
            return res.status(400).json({
                ok: false,
                err: err
            })
        }
        if (proyectoDB != null) {
            Insumo.findOneAndUpdate({nombre: body.nombre, unidad: body.unidad, "proyectos.nombre": proyectoDB.nombre}, { $inc: {"proyectos.$.cantidad": body.cantidad }}, {
                new: true,
                runValidators: true,
                context: 'query',
                upsert: false
            } , (err, insumoDB) => {        
                if (err) {
                    console.log(err)
                    insumosConError.push(insumo.nombre)
                }

                if (insumoDB === null) {

                    let proyectoAux2 = {}
                    proyectoAux2.nombre = proyectoDB.nombre
                    proyectoAux2.emailContacto = proyectoDB.emailContacto
                    proyectoAux2._idContacto = body.idContacto
                    proyectoAux2._id = id
                    proyectoAux2.cantidad = body.cantidad
        
                    Insumo.findOneAndUpdate({nombre: body.nombre, unidad: body.unidad}, { $push: {proyectos: proyectoAux2 }}, {
                        new: true,
                        runValidators: true,
                        context: 'query',
                        upsert: false
                    } , (err, insumoDBProyecto) => {
                        if (err) {
                            console.log(err)
                            insumosConError.push(insumo.nombre)
                        }
                        if (insumoDBProyecto === null) {
                            console.log("Generando nuevo insumo")
                            let nuevoInsumo = new Insumo()
                            nuevoInsumo.nombre = body.nombre
                            nuevoInsumo.unidad = body.unidad
                            nuevoInsumo.proyectos = proyectoAux2
        
                            nuevoInsumo.save((err,nuevoInsumoDB) => {
                                if(err) {
                                    console.log("Error al generar el insumo", err)
                                    insumosConError.push(insumo)
                                }
                            })
                            
                        } 
                    })
                }
            })
        } 
        else {

            let insumosAux = {}
            insumosAux.nombre = body.nombre
            insumosAux.cantidad = body.cantidad
            insumosAux.unidad = body.unidad

            Proyecto.findByIdAndUpdate(id,{ $push: {insumos: insumosAux }}, {
                new: true,
                runValidators: true,
                context: 'query',
                upsert: false
            } , (err, proyectoDB2) => {
                if(err) {
                    return res.status(400).json({
                        ok: false,
                        err: err
                    })
                }
                let proyectoAux2 = {}
                proyectoAux2.nombre = proyectoDB2.nombre
                proyectoAux2.emailContacto = proyectoDB2.emailContacto
                proyectoAux2._idContacto = body.idContacto
                proyectoAux2._id = id
                proyectoAux2.cantidad = body.cantidad
    
                Insumo.findOneAndUpdate({nombre: body.nombre, unidad: body.unidad}, { $push: {proyectos: proyectoAux2 }}, {
                    new: true,
                    runValidators: true,
                    context: 'query',
                    upsert: false
                } , (err, insumoDBProyecto) => {
                    if (err) {
                        console.log(err)
                        insumosConError.push(insumo.nombre)
                    }
                    if (insumoDBProyecto === null) {
                        console.log("Generando nuevo insumo")
                        let nuevoInsumo = new Insumo()
                        nuevoInsumo.nombre = insumo.nombre
                        nuevoInsumo.unidad = insumo.unidad
                        nuevoInsumo.proyectos = proyectoAux2
    
                        nuevoInsumo.save((err,nuevoInsumoDB) => {
                            if(err) {
                                console.log("Error al generar el insumo", err)
                                insumosConError.push(insumo)
                            }
                        })
                        
                    } 
                    return res.json({
                        ok: true,
                        proyecto: proyectoDB
                    })   
                   
                })
                return res.json({
                    ok: true,
                    proyecto: proyectoPushDB
                })

            })
           
        }
        return res.json({
            ok: true,
            proyecto: proyectoDB
        })
    })
}



exports.getOne = function(req,res) {
    const id = req.params.id
    console.log(id)
    Proyecto.findById(id,(err,proyectoDB) => {
        if (err) {
            return (
                res.status(400).json({
                    ok: false,
                    err: err
                })

            )
        }

        if (!proyectoDB) {
            return (
                res.status(404).json({
                    ok: false,
                    err: "No se encontró el proyecto buscado"
                })
            )
        }

        res.json({
            ok: true,
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


