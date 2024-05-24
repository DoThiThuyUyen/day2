const { User } = require('../models')
const bcrypt = require('bcrypt')
const { BAD_REQUEST_ERROR, UNAUTHORIZATION_ERROR } = require("../core/errorResponse");
const { findUserByEmail } = require("../models/repo/user.repo");
const { createTokenPair } = require('../auth/authUtil');

class UserService {
    static async register({ firstName, lastName, email, password }) {
        // check user had registed
        const user = await findUserByEmail(email)
        if (user) throw new BAD_REQUEST_ERROR('account has existed!')
        // hash password 
        const passwordHash = bcrypt.hashSync(password, 10)

        const createUser = await User.create({ firstName, lastName, email, password: passwordHash })
        if (!createUser) throw new BAD_REQUEST_ERROR('registe not successfull')
        return 'successfully'
    }
    static async login({ email, password }) {
        const user = await findUserByEmail(email)
        if (!user) throw new BAD_REQUEST_ERROR("account haven't registed!")
        const checkPassword = bcrypt.compareSync(password, user.password)
        if (!checkPassword) throw new UNAUTHORIZATION_ERROR('passowrd or email not correct')
        // generate pair Token
        const pairToken = await createTokenPair({ id: user.id, email: user.email, role: user.role }, 'abc')
        const { password: userPassword, ...rest } = user.dataValues;
        return {
            user: { ...rest },
            tokens: pairToken
        }
    }
}
module.exports = UserService