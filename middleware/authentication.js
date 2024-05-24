const Jwt = require('jsonwebtoken');
const { UNAUTHORIZATION_ERROR } = require('../core/errorResponse');
const asynHandle = require('../hepper/asynHandle');

const authentication = asynHandle(async (req, res, next) => {
    const authorization = await req.headers.authorization;
    console.log('check authorization ::: ', authorization)
    if (authorization) {
        const token = authorization.split(" ")[1];
        Jwt.verify(token, 'abc', (err, user) => {
            if (err instanceof Jwt.TokenExpiredError) {
                throw new UNAUTHORIZATION_ERROR('token is expired!');
            }
            if (!user) throw new UNAUTHORIZATION_ERROR('token is validate!')

            else {
                req.user = user
                next()
            }
        })
    } else {
        throw new UNAUTHORIZATION_ERROR('require authorization!')
    }
})
module.exports = { authentication };