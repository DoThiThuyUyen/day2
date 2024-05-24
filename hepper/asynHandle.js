const asynHandle = fc => {
    return (req, res, next) => {
        fc(req, res, next).catch(next)
    }
}
module.exports = asynHandle