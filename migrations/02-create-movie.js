'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Movies', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            mv_name: {
                type: Sequelize.STRING
            },
            mv_genre: {
                type: Sequelize.STRING
            },
            mv_publish: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            mv_episode: {
                type: Sequelize.INTEGER
            },
            mv_dubbing: {
                type: Sequelize.STRING
            },
            mv_rating: {
                type: Sequelize.FLOAT,
                defaultValue: 0
            },
            mv_description: {
                type: Sequelize.STRING(2000)
            },
            mv_seriId: {
                type: Sequelize.STRING
            },
            mv_time: {
                type: Sequelize.FLOAT
            },
            mv_video: {
                type: Sequelize.STRING
            },
            mv_trailler: {
                type: Sequelize.STRING
            },
            mv_thumbnail: {
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
        await queryInterface.dropTable('Movies');
    }
};