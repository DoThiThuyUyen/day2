const { Op } = require('sequelize');
const { BAD_REQUEST_ERROR } = require('../core/errorResponse')
const { Movie } = require('../models');
const { findMovieById } = require('../models/repo/movie.repo');
class MovieService {
    static async searchMovie(querySearch) {
        if (!querySearch) {
            throw new Error('Query search không hợp lệ');
        }

        const movies = await Movie.findAll({
            where: {
                [Op.or]: [
                    { mv_seriId: querySearch },
                    { mv_name: { [Op.like]: `%${querySearch}%` } }
                ]
            }
        });
        console.log('check movie search', movies)
        return movies;
    }
    static async getAllMovie() {
        const movies = await Movie.findAll()
        return movies;
    }
    static async getMovieBySeri(serid) {
        const movies = await Movie.findAll({ where: { mv_seriId: serid } })
        return movies ? movies : []
    }
    static async createMovie({
        mv_name, mv_genre,
        mv_publish, mv_episode,
        mv_dubbing, mv_rating,
        mv_description, mv_seriId,
        mv_time, mv_video,
        mv_trailler, mv_thumbnail }) {
        const createMv = await Movie.create({
            mv_name, mv_genre,
            mv_publish, mv_episode,
            mv_dubbing, mv_rating,
            mv_description, mv_seriId,
            mv_time, mv_video,
            mv_trailler, mv_thumbnail
        })
        if (!createMv) throw new BAD_REQUEST_ERROR('create movie falure!')
        return createMv;
    }
    static async updateMovie({
        id,
        mv_name, mv_genre,
        mv_publish, mv_episode,
        mv_dubbing, mv_rating,
        mv_description, mv_seriId,
        mv_time, mv_video,
        mv_trailler, mv_thumbnail }) {
        // find movie
        console.log('run at here 01')
        const movie = await findMovieById(id)
        console.log('run at here 02')
        if (!movie) throw new BAD_REQUEST_ERROR('movie not found!')
        const updateMovie = await Movie.update({
            mv_name, mv_genre,
            mv_publish, mv_episode,
            mv_dubbing, mv_rating,
            mv_description, mv_seriId,
            mv_time, mv_video,
            mv_trailler, mv_thumbnail
        }, { where: { id: movie.id } })
        console.log('check update Movie')
        return updateMovie;
    }
    static async deleteMovie(id) {
        const movie = await findMovieById(id)
        if (!movie) throw new BAD_REQUEST_ERROR('movie not found!')
        const deleteMv = await Movie.destroy({ where: { id: movie.id } });
        if (!deleteMv) throw new BAD_REQUEST_ERROR('something went wrong')
        return deleteMv
    }
    static async detailMovie(id) {
        const movie = await findMovieById(id)
        if (!movie) throw new BAD_REQUEST_ERROR('movie not found!')
        return movie
    }
}
module.exports = MovieService