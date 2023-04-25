const {insetrAddFavorites, massFavorites, delete_favorites} = require("../db/filmDB");

async function add_favorites(req, res) {
    const {idFilm} = req.body
    await insetrAddFavorites(req.tokenData.user_id, idFilm);
    res.sendStatus(200)
}
async function inform_favorites(req, res) {
    if (req.tokenData !== undefined) {
        console.log('req.tokenData', req.tokenData)
        const favorites = await massFavorites(req.tokenData);
        console.log('favorites', favorites)
        const massFavoritesFilms = favorites.map((itemFavor) =>
            Object.assign({}, itemFavor, {imgUrl: `http://localhost:3555/imges/${itemFavor.filesNames.split("XXXX")[0]}`}))
        res.json({
            favoritesFilm: massFavoritesFilms,
        });
    } else res.sendStatus(402)
}
async function deleteFavorites(req, res) {
    const {idFilm} = req.body
    await delete_favorites(req.tokenData.user_id, Number(idFilm));
    res.sendStatus(200)
}




module.exports = {
    deleteFavorites,
    add_favorites,
    inform_favorites
}
