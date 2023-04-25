const express = require('express');
const {checkTokenMiddleware} = require("../middlewares/checkTokenMiddleware");
const multer = require("multer");
const {allFilmsHandler, informFilmHandler, addFilmsHandler} = require("../controllers/filmsController");
const path = require("path");
const router = express.Router(); // обьект для создание роут


const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.join(__dirname, '../imges'));

    },
    // Sets file(s) to be saved in uploads folder in same directory
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
    // Sets saved filename(s) to be original filename(s)
})

router.get('/', allFilmsHandler)
router.get('/:id', checkTokenMiddleware, informFilmHandler)
router.post('/', multer({storage: storage}).array('files'), addFilmsHandler)

module.exports = router