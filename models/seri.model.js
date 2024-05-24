'use strict';
const {
    Model, DATE
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Seri extends Model {
        static associate(models) {
            Seri.hasMany(models.Movie, { foreignKey: 'mv_SeriId' });
        }
    }
    Seri.init({
        sr_name: DataTypes.STRING,
        sr_genre: DataTypes.STRING,
        sr_description: DataTypes.STRING,
        sr_publish: DataTypes.BOOLEAN,
        sr_totalEpisode: DataTypes.FLOAT,
        sr_thumbnail: DataTypes.STRING,
        sr_background: DataTypes.STRING,
        sr_avatar: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Seri',
    });
    return Seri;
};