const multer = require('multer');
const path = require("path");
require('dotenv').config();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, process.env.UPLOAD_PATH));
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}.jpg`);
    }
});

const upload = multer({storage: storage});

module.exports = upload;