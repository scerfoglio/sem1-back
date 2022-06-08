const router = require('express').Router();
const proyectoController = require('../controller/proyectoController')



// Usuarios
router.route('/proyecto')
    .post(proyectoController.add)
    .get(proyectoController.list)
    
router.route('/proyecto/:id/insumo')
    .post(proyectoController.addInsumo)
    
router.route('/proyecto/:id')
    .get(proyectoController.getOne)
    //.put(encuestaController.update)
    //.delete(encuestaController.delete)


module.exports = router;