const express = require('express');
const multer = require("multer");
const {signRestoreUserCodeController} = require("../controllers/signRestoreUserCodeController");
const router = express.Router(); // обьект для создание роут

router.post('/', multer().none(), signRestoreUserCodeController)

module.exports = router