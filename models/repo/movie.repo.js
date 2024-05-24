const { Movie } = require('../')
const findMovieById = async (id) => {
    return await Movie.findOne({ where: { id: id } })
}
module.exports = { findMovieById }