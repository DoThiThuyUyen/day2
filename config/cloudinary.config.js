const multer = require('multer')
const dotenv = require('dotenv')
dotenv.config()
const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')
cloudinary.config({
    cloud_name: "dwu92ycra" || process.env.CLOUD_NAME,
    api_key: "966841335387149" || process.env.API_KEY,
    api_secret: "U6SxatcQP5_U_K_46mbQeb9LyKM" || process.env.API_SECRET,
    resource_type: 'auto'
});

const storageOption = {
    cloudinary: cloudinary,
    params: {
        folder: 'learn_nodejs_sequelize',
        resource_type: 'auto',
        allowed_formats: ['jpg', 'jpeg', 'png', 'mp4', 'jfif', 'webp'],
    }
}
const storage = new CloudinaryStorage(storageOption)
const upload = multer({ storage: storage })
module.exports = upload;