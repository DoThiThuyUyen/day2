const { CREATE, SuccessResponse } = require("../core/successResponse");
const UserService = require("../service/user.service");

class UserController {
    static async register(req, res) {
        return new CREATE({
            message: 'register successfully',
            metadata: await UserService.register(req.body)
        }).send(res)
    }
    static async login(req, res) {
        return new SuccessResponse({
            message: "Login successfully!",
            metadata: await UserService.login(req.body)
        }).send(res)

    }
}
module.exports = UserController