const path = require('path');
require('dotenv').config();

class FileController {
    async get(req, res) {
        const filename = req.params.filename;
        const filePath = path.join(process.env.UPLOAD_PATH, filename);
        res.download(filePath);
    }
}

module.exports = new FileController();