const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const { default: helmet } = require('helmet')
const morgan = require('morgan')
const compression = require('compression')
const cors = require('cors')
const app = express()

// init middleware
app.use(cors())
app.use(morgan("dev"))
app.use(helmet())
app.use(compression())
app.use(express.static("client"));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// init route
app.use('/', require('./routes'))

app.use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
})
app.use((err, req, res) => {
    const statusCode = err.status || 500
    const message = err.message || "Internal Server Error"
    res.status(statusCode).json({
        code: statusCode,
        status: 'error',
        message
    })
})

module.exports = app