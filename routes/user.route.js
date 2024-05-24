const express = require('express')
const asynHandle = require('../hepper/asynHandle')
const UserController = require('../controller/user.controller')
const { authentication } = require('../middleware/authentication')
const route = express.Router()


route.post('/register', asynHandle(UserController.register))
route.post('/login', asynHandle(UserController.login))
route.use(authentication)


module.exports = route