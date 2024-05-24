'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Seris', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            sr_name: {
                type: Sequelize.STRING
            },
            sr_genre: {
                type: Sequelize.STRING
            },
            sr_description: {
                type: Sequelize.STRING(2000),
            },
            sr_publish: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            sr_totalEpisode: {
                type: Sequelize.INTEGER
            },
            sr_thumbnail: {
                type: Sequelize.STRING,
            },
            sr_background: {
                type: Sequelize.STRING
            },
            sr_avatar: {
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
        await queryInterface.dropTable('Seris');
    }
};