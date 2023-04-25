const express = require('express');
const {refresHandler} = require("../controllers/refreshController");
const router = express.Router(); // обьект для создание роут

router.get('/', refresHandler)

module.exports = router
