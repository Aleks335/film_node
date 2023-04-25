const express = require('express');
const multer = require("multer");
const {signRestoreUserPassword} = require("../controllers/signRestoreUserPasswordController");
const router = express.Router(); // обьект для создание роут

router.post('/', multer().none(),  signRestoreUserPassword)

module.exports = router