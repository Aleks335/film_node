const express = require('express');
const {validateTokenMiddleware} = require("../middlewares/validateTokenMiddleware");
const {add_commentHandler, commHandler} = require("../controllers/commentsController");
const router = express.Router(); // обьект для создание роут


router.post('/', validateTokenMiddleware, add_commentHandler)
router.get('/:id', commHandler)

module.exports = router



