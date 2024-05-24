const handleUploadFile = (req, res, next) => {

    if (Object.keys(req.files).length > 0) {
        const files = req.files
        for (let i in files) {
            // add path file in body
            req.body[i] = files[i][0].path;
        }
    }
    next();
};
module.exports = handleUploadFile