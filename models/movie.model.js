'use strict';
const {
    Model, DATE
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Movie extends Model {
        static associate(models) {
            Movie.belongsTo(models.Seri, { foreignKey: 'mv_seriId' })
            Movie.belongsToMany(models.User, { through: 'Comment', foreignKey: 'cm_movieId' })
        }
    }
    Movie.init({
        mv_name: DataTypes.STRING,
        mv_genre: DataTypes.STRING,
        mv_episode: DataTypes.INTEGER,
        mv_dubbing: DataTypes.STRING,
        mv_publish: DataTypes.BOOLEAN,
        mv_rating: DataTypes.STRING,
        mv_description: DataTypes.STRING,
        mv_SeriId: DataTypes.INTEGER,
        mv_time: DataTypes.FLOAT,
        mv_video: DataTypes.STRING,
        mv_trailler: DataTypes.STRING,
        mv_thumbnail: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Movie',
    });
    return Movie;
};