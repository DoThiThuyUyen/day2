const { Seri } = require('../models')
const dataSeri = require('../data/seri.json');
const { SuccessResponse } = require('../core/successResponse');
const SeriService = require('../service/seri.service');
class SeriController {
    static async insertSeri(req, res) {
        try {
            await Seri.bulkCreate(dataSeri);
            res.send('Ok');
        } catch (error) {
            console.error('Error inserting movies:', error);
            res.status(500).send('Internal Server Error');
        }
    }
    static async getAllSeri(req, res) {
        return new SuccessResponse({
            message: 'get all seri successfully!',
            metadata: await SeriService.getAllSeri()
        }).send(res)
    }
    static async getSeriById(req, res) {
        const { idSeri } = req.params;
        return new SuccessResponse({
            message: "get seri successfully",
            metadata: await SeriService.getSeriById(idSeri)
        }).send(res)
    }
}
module.exports = SeriController