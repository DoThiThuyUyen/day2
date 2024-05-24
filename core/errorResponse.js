const { statusCodes, reasonStatusCodes } = require("../utils");
const reasonStatus = require("../utils/reasonStatus");

class ErrorResponse extends Error {
    constructor(message, status) {
        super(message)
        this.status = status
    }
}
class BAD_REQUEST_ERROR extends ErrorResponse {
    constructor(message = reasonStatusCodes.BAD_REQUEST, status = statusCodes.BAD_REQUEST) {
        super(message, status);
    }

}
class FORBIDDEN_ERROR extends ErrorResponse {
    constructor(
        message = reasonStatusCodes.FORBIDDEN,
        status = statusCodes.FORBIDDEN
    ) {
        super(message, status)
    }
}
class UNAUTHORIZATION_ERROR extends ErrorResponse {
    constructor(message = reasonStatusCodes.UNAUTHORIZED,
        status = statusCodes.UNAUTHORIZED) {
        super(message, status)
    }
}
module.exports = {
    BAD_REQUEST_ERROR,
    FORBIDDEN_ERROR,
    UNAUTHORIZATION_ERROR
}