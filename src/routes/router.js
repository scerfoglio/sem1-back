const express = require('express')
const app = express()

app.use(require('./usuario'))
app.use(require('./proyecto'))
app.use(require('./insumo'))

module.exports = app