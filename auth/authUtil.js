const Jwt = require('jsonwebtoken')

const createTokenPair = async (payload, publicKey) => {
    try {
        const accessToken = Jwt.sign(payload, publicKey, {
            expiresIn: '30 days'
        })
        const refreshToken = Jwt.sign(payload, publicKey, { expiresIn: '35 days' })
        return { accessToken, refreshToken }
    } catch (error) {
        console.log(error)
    }
}
module.exports = { createTokenPair }