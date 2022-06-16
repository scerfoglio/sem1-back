const router = require('express').Router();
const insumosController = require('../controller/insumoController')



// Usuarios
router.route('/insumo')
    .post(insumosController.add)
    .get(insumosController.list)

router.route('/insumo/:id/solicitud')
    .post(insumosController.solicitar)
module.exports = router;