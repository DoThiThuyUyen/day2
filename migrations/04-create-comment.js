'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Comments', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            cm_parentId: {
                type: Sequelize.STRING
            },
            cm_leftValue: {
                type: Sequelize.STRING(2000),
            },
            cm_rightValue: {
                type: Sequelize.STRING
            },
            cm_movieId: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            cm_userId: {
                type: Sequelize.INTEGER
            },
            cm_seriId: {
                type: Sequelize.STRING,
            },
            cm_content: {
                type: Sequelize.STRING
            },
            cm_image: {
                type: Sequelize.STRING
            },
            cm_video: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Comments');
    }
};