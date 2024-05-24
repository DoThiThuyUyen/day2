const { CREATE, SuccessResponse } = require("../core/successResponse")
const CommentService = require("../service/comment.service")

class CommentController {
    static async getAllComment(req, res) {
        const { movieId } = req.params
        console.log('check movieId ::: ', movieId)
        return new SuccessResponse({
            message: 'get all comment successfully!',
            metadata: await CommentService.getAllComment(movieId)
        }).send(res)
    }
    static async createComment(req, res) {
        console.log('check req.body ::: ', req.body)
        return new CREATE({
            message: 'create comment successfully',
            metadata: await CommentService.createComment(req.body)
        }).send(res)
    }
    static async deleteComment(req, res) {
        console.log('check data ::: ', req.body)
        return new SuccessResponse({
            message: "Delete comment successfully!",
            metadata: await CommentService.deleteComment(req.body)
        }).send(res)
    }
    static async testDeleteComment(req, res) {
        const { id } = req.params
        return new SuccessResponse({
            message: 'delete comment successfully!',
            metadata: await CommentService.testDeleteComment(id)
        }).send(res)
    }
    static async updateComment(req, res) {
        const { id } = req.params
        return new SuccessResponse({
            message: 'update comment successfully!',
            metadata: await CommentService.updateComment({ id, content: req.body.content })
        }).send(res)
    }
    static async searchComment(req, res) {
        const { textSearch } = req.query;
        return new SuccessResponse({
            message: 'result',
            metadata: await CommentService.searchComment(textSearch)
        }).send(res)
    }
}

module.exports = CommentController