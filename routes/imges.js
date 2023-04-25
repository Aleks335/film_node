const express = require('express');
const {imgesHandler} = require("../controllers/imgesController");
const router = express.Router(); // обьект для создание роут

router.get('/:name', imgesHandler)

module.exports = router
