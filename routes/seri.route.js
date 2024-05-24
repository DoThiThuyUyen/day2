const express = require('express')
const asynHandle = require('../hepper/asynHandle')
const SeriController = require('../controller/seri.controller')
const { authentication } = require('../middleware/authentication')
const route = express.Router()


route.get('/insert', asynHandle(SeriController.insertSeri))
route.get('/:idSeri', asynHandle(SeriController.getSeriById))
route.get('/', asynHandle(SeriController.getAllSeri))



module.exports = route