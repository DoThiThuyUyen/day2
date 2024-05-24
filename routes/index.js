const express = require('express')
const asynHandle = require('../hepper/asynHandle')
const { authentication } = require('../middleware/authentication')
const route = express.Router()


route.use('/api/v1/user', require('./user.route'))
route.use('/api/v1/movie', require('./movie.route'))
route.use('/api/v1/comment', require('./comment.route'))
route.use('/api/v1/seri', require('./seri.route'))
route.use('/api/v1/payment', require('./payment.router'))



module.exports = route