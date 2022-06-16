const router = require('express').Router();
const usuarioController = require('../controller/usuarioController')



// Usuarios
router.route('/usuario')
    .post(usuarioController.add)
  //  .get(usuarioController.list)

module.exports = router;