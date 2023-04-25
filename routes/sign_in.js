const express = require('express');
const multer = require("multer");
const {sign_inHandler} = require("../controllers/signInController");
const router = express.Router(); // обьект для создание роут

router.post('/', multer().none(), sign_inHandler)

module.exports = router

