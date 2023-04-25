const {selectAll, informFilm, massFavorites, insetrAdd} = require("../db/filmDB");

async function allFilmsHandler(req, res) {
    console.log('tttttt')
    const column = req.query.column;
    const sorting = req.query.sorting;
    const year = req.query.year;
    const selectMass = await selectAll(column, sorting, year);
    const massAll = selectMass.map((item) =>
        // соединение несколько обьекто
        // тут массив
        Object.assign({}, item, {imgUrl: `http://localhost:3555/imges/${item.filesNames.split("XXXX")[0]}`}))

    res.json({
        masBD: massAll,
    })
}
async function informFilmHandler(req, res) {
    const inform_Film = await informFilm(req.params.id);
    const massInformFilm = inform_Film.map((itemF) =>
        Object.assign({}, itemF, {imgUrl: itemF.filesNames.split("XXXX").map((it) => `http://localhost:3555/imges/${it}`)})
    )

    if (req.tokenData !== undefined) {
        const ttt = await massFavorites(req.tokenData)
        const even = ttt.some((item) => item.film_id === Number(req.params.id))
        console.log('ttt', ttt)
        console.log('even', even)
        console.log('req.params.id', req.params.id)
        massInformFilm[0].isFavorite = even
    }
    console.log('massInformFilm', massInformFilm)
    res.json({
        selectFilm: massInformFilm,
    })
}
async function addFilmsHandler(req, res) {
    // через multer
    console.log('поймал запрос post')
    const title = req.body.title;
    const directorName = req.body.directorName;
    const date = req.body.date;
    const text = req.body.description

    let filesNames = req.files.reduce((res, item) => {
        return res + item.filename + "XXXX"
    }, "")

    filesNames = filesNames.slice(0, filesNames.length - 4);

    await insetrAdd(title, directorName, date, filesNames, text);
    return res.sendStatus(200)

}



module.exports = {
    allFilmsHandler,
    informFilmHandler,
    addFilmsHandler
}