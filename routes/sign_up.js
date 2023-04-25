const express = require('express');
const multer = require("multer");
const {sign_upHandler} = require("../controllers/signUpController");
const router = express.Router(); // обьект для создание роут

router.post('/', multer().none(), sign_upHandler)

module.exports = router
