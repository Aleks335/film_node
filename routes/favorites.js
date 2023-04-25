const express = require('express');
const {checkTokenMiddleware} = require("../middlewares/checkTokenMiddleware");
const {validateTokenMiddleware} = require("../middlewares/validateTokenMiddleware");
const {add_favorites, inform_favorites, deleteFavorites} = require("../controllers/favoritesController");
const router = express.Router(); // обьект для создание роут


router.post('/', validateTokenMiddleware, add_favorites)
// не зобыть поправить
router.get('/', checkTokenMiddleware, inform_favorites)
router.delete('/', validateTokenMiddleware, deleteFavorites)

module.exports = router