const express = require('express')
const asynHandle = require('../hepper/asynHandle')

const { authentication } = require('../middleware/authentication')
const MovieController = require('../controller/movie.controller')
const upload = require('../config/cloudinary.config')
const handleUploadFile = require('../middleware/handleFileUpload')
const route = express.Router()

route.get('/insert', asynHandle(MovieController.insertMovie))
route.get('/search', asynHandle(MovieController.searchMovie))
route.get('/seri/:seriId', asynHandle(MovieController.getMovieBySeri))
route.get('/:id', asynHandle(MovieController.detailMovie))

route.delete('/:id', asynHandle(MovieController.deleteMovie))
route.get('/', asynHandle(MovieController.getAllMovie))
route.use(authentication)
route.use(upload.fields([{ name: "mv_thumbnail" }, { name: "mv_video" }, { name: "mv_trailler" }]))
route.use(handleUploadFile)
route.put('/:id', asynHandle(MovieController.updateMovie))
route.post('/', asynHandle(MovieController.createMovie))

module.exports = route