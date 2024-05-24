const { statusCodes, reasonStatusCodes } = require('../utils')
class SuccessResponse {
    constructor({ message, statusCode = statusCodes.OK,
        reasonStatusCode = reasonStatusCodes.OK, metadata = {} }) {
        this.message = !message ? reasonStatusCode : message
        this.statusCode = statusCode
        this.metadata = metadata
    }
    send(res) {
        return res.status(this.statusCode).json(this)
    }
}

class CREATE extends SuccessResponse {
    constructor({ message, statusCode = statusCodes.CREATED, reasonStatusCode = reasonStatusCodes.CREATED, metadata }) {
        super({ message, statusCode, reasonStatusCode, metadata })
    }
}
class UPDATE extends SuccessResponse {
    constructor({ message, statusCode = statusCodes.OK, metadata = {} }) {
        super({ message, statusCode, metadata });
    }

}
module.exports = {
    CREATE, UPDATE, SuccessResponse
}