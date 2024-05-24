const express = require('express')
const asynHandle = require('../hepper/asynHandle')
const { authentication } = require('../middleware/authentication')
const upload = require('../config/cloudinary.config')
const handleUploadFile = require('../middleware/handleFileUpload')
const CommentController = require('../controller/comment.controller')
const route = express.Router()

route.get('/:movieId', asynHandle(CommentController.getAllComment))
// route.get('/', asynHandle(CommentController.searchComment))
route.put('/:id', asynHandle(CommentController.updateComment))
route.delete('/:id', asynHandle(CommentController.testDeleteComment))
route.post('/', asynHandle(CommentController.createComment))
route.delete('/', asynHandle(CommentController.deleteComment))


module.exports = route