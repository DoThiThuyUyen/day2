const express = require('express')
const asynHandle = require('../hepper/asynHandle')
const PaymentController = require('../controller/payment.controller')
const { authentication } = require('../middleware/authentication')
const route = express.Router()


route.get('', asynHandle(PaymentController.configPayment))
route.use(authentication)
route.post('/createOrder', PaymentController.createOrder)
route.post('/capture', PaymentController.captureOrder)



module.exports = route