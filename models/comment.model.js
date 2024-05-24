'use strict';
const {
    Model, DATE
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Comment extends Model {
        static associate(models) {
        }
    }
    Comment.init({
        cm_parentId: DataTypes.INTEGER,
        cm_rightValue: DataTypes.INTEGER,
        cm_leftValue: DataTypes.INTEGER,
        cm_movieId: DataTypes.INTEGER,
        cm_userId: DataTypes.INTEGER,
        cm_content: DataTypes.STRING,
        cm_image: DataTypes.STRING,
        cm_video: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Comment',
    });
    return Comment;
};