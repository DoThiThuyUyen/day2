const { CREATE, UPDATE, SuccessResponse } = require("../core/successResponse");
const { Seri, Comment, Movie } = require('../models');
const { findMovieById } = require("../models/repo/movie.repo");
const MovieService = require("../service/movie.service");
const dataMovie = require('../data/movie.json');
const { ADMIN } = require("../core/role");
const { UNAUTHORIZATION_ERROR } = require("../core/errorResponse");
class MovieController {
    static async searchMovie(req, res) {
        const { querySearch } = req.query
        console.log('check query search  ::: ', querySearch)
        return new SuccessResponse({
            message: 'get search movie successfully!',
            metadata: await MovieService.searchMovie(querySearch)
        }).send(res)
    }
    static async getAllMovie(req, res) {
        return new SuccessResponse({
            message: 'get movie successfully!',
            metadata: await MovieService.getAllMovie()
        }).send(res)
    }
    static async getMovieBySeri(req, res) {
        const { seriId } = req.params
        return new SuccessResponse({
            message: "get movie successfully!",
            metadata: await MovieService.getMovieBySeri(seriId)
        }).send(res)
    }
    static async createMovie(req, res) {
        console.log('check authentication :::: ', req.user)
        if (req !== ADMIN) throw new UNAUTHORIZATION_ERROR('account must admin!')
        return new CREATE({
            message: 'create a new movie successfully!',
            metadata: await MovieService.createMovie(req.body)
        }).send(res)
    }
    static async updateMovie(req, res) {
        await Seri.create({
            sr_name: "seri_01",
            sr_genre: "genre_01",
            sr_description: "description_01",
        });
        const { id } = req.params;
        return new UPDATE({
            message: 'update movie successfully!',
            metadata: await MovieService.updateMovie({ id, ...req.body })
        }).send(res)
    }
    static async deleteMovie(req, res) {
        const { id } = req.params
        return new SuccessResponse({
            message: 'delete movie successfully!',
            metadata: await MovieService.deleteMovie(id)
        }).send(res)
    }
    static async detailMovie(req, res) {
        console.log('run at here')
        const { id } = req.params
        return new SuccessResponse({
            message: 'get movie successfully',
            metadata: await MovieService.detailMovie(id)
        }).send(res)
    }
    static async insertMovie(req, res) {
        try {
            dataMovie.forEach(async (movie) => {
                console.log('check mv_video ::::: ', movie.mv_video)
                await Movie.create({ ...movie });
            })
            res.send('Ok');
        } catch (error) {
            console.error('Error inserting movies:', error);
            res.status(500).send('Internal Server Error');
        }
    }
}
module.exports = MovieController