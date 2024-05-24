const { Seri } = require('../models')
class SeriService {
    static async getAllSeri() {
        const seris = await Seri.findAll()
        return seris
    }
    static async getSeriById(id) {
        const seri = await Seri.findOne({ where: { id: id } })
        return seri
    }
}
module.exports = SeriService