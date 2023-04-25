const {insetrAddComment, selectAllComment} = require("../db/filmDB");

async function add_commentHandler(req, res) {
    const {textComment, idFilm} = req.body
    console.log('tokenData', req.tokenData)
    await insetrAddComment(textComment, idFilm, req.tokenData.user_id);
    res.sendStatus(200)
}

async function commHandler(req, res) {
    const selectComments = await  selectAllComment(req.params.id);
    res.json({
        select_comments: selectComments,
    })
}

module.exports = {
    add_commentHandler,
    commHandler
}
