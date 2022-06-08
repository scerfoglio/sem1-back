const router = require('express').Router();
const insumosController = require('../controller/insumoController')



// Usuarios
router.route('/insumo')
    .post(insumosController.add)
    .get(insumosController.list)

module.exports = router;