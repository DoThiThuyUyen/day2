const { Comment } = require('../')
const findCommentById = async (id) => {
    return await Comment.findOne({ where: { id: id } })
}
module.exports = { findCommentById }