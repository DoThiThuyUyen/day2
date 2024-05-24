const { Op } = require('sequelize');
const { Comment, sequelize } = require('../models')
const { findCommentById } = require('../models/repo/comment.repo');
const { BAD_REQUEST_ERROR } = require('../core/errorResponse');
class CommentService {
    static async createComment({
        parentId,
        content,
        movieId, userId
    }) {
        let valueRight = 0;
        const comment = {
            cm_parentId: parentId,
            cm_content: content,
            cm_userId: userId,
            cm_movieId: movieId
        }
        if (parentId) {
            const parentComment = await Comment.findOne({ where: { id: parentId, cm_movieId: movieId } });
            // Get the current right value
            valueRight = parentComment.cm_rightValue;
            // Update cm_rightValue for comments with cm_rightValue greater than or equal to valueRight and matching movieId
            await Comment.update({ cm_rightValue: sequelize.literal(`cm_rightValue + 2`) }, {
                where: {
                    cm_rightValue: { [Op.gte]: +valueRight },
                    cm_movieId: movieId
                }
            });

            // Update cm_leftValue for comments with cm_rightValue greater than or equal to valueRight and matching movieId
            await Comment.update({ cm_leftValue: sequelize.literal(`cm_leftValue + 2`) }, {
                where: {
                    cm_leftValue: { [Op.gte]: +valueRight },
                    cm_movieId: movieId
                }
            });
        } else {
            const findParentComment = await Comment.findOne({ where: { id: parentId, cm_movieId: movieId } })
            if (findParentComment) {
                valueRight = +findParentComment.cm_rightValue
            } else {
                valueRight = 1
            }
        }
        comment['cm_leftValue'] = +valueRight;
        comment['cm_rightValue'] = +valueRight + 1
        const createComment = await Comment.create({ ...comment })
        if (!createComment) throw new BAD_REQUEST_ERROR('create comment falure!')
        return comment
    }
    static async getAllComment(movieId) {
        const comments = await Comment.findAll({
            where: { cm_movieId: movieId },
            attributes: ['id', 'cm_content', 'createdAt', 'cm_movieId'],
            order: [['createdAt', 'DESC']]
        });
        return comments
    }
    static async deleteComment({ id, movieId, userId }) {
        const comment = await Comment.findOne({ where: { id: id } })
        console.log(comment)
        if (!comment) throw new BAD_REQUEST_ERROR('comment not found!')
        const rightValue = comment.cm_rightValue
        const leftValue = comment.cm_leftValue
        const withValue = (+rightValue - +leftValue + 1)
        console.log('check with value ::: ', withValue)
        // delete comment
        await Comment.destroy({
            where: {
                cm_rightValue: {
                    [Op.lte]: +rightValue
                }
            }
        });
        // update comment
        await Comment.update({
            cm_rightValue: sequelize.literal(`cm_rightValue - ${withValue}`),
            cm_leftValue: sequelize.literal(`cm_leftValue - ${withValue}`)
        }, { where: { [Op.gt]: +rightValue } })
        return true;
    }
    static async testDeleteComment(id) {
        const checkComment = await Comment.findOne({ where: { id: id } })
        if (!checkComment) throw new BAD_REQUEST_ERROR('comment not found!')
        await Comment.destroy({ where: { id: id } })
        return true
    }
    static async updateComment({ id, content }) {
        console.log('run at here ', id, content)
        const checkComment = await Comment.findOne({ where: { id: id } })
        if (!checkComment) throw new BAD_REQUEST_ERROR('comment not found!')
        await Comment.update({ cm_content: content }, { where: { id: id } })
        return true
    }
    static async searchComment(textSearch) {
        console.log('run at here search', textSearch)
        const comments = await Comment.findAll({
            where: {
                cm_content: {
                    [Op.iLike]: `%${textSearch}%` // Sử dụng Op.iLike để tìm kiếm không phân biệt chữ hoa và chữ thường
                }
            }
        })
        return comments
    }
}

module.exports = CommentService