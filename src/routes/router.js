const express = require('express')
const app = express()
const proyectoRouter = require('./proyecto')

app.use(require('./usuario'))
app.use('/', proyectoRouter)
module.exports = app