const Usuario = require('../models/usuarioModel')
const {Mongoose} = require('mongoose')

exports.add = function (req,res) {
    let body = req.body
    let usuario = new Usuario({
        nombre: body.nombre,
        apellido: body.apellido,
        email: body.email,
        password: body.password
    }); 

    usuario.save( (err, usuarioDB) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                err: err
            })
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        })
    })
}