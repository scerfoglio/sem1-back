const router = require('express').Router();
const proyectoController = require('../controller/proyectoController')



// Usuarios
router.route('/proyecto')
    .post(proyectoController.add)
    .get(proyectoController.list)

module.exports = router;