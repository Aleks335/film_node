const path = require("path");


async function imgesHandler(req, res) {
    // sendFile отправка любово файла path.join - узнсть расположение nod js  проекта
    res.sendFile(path.join(__dirname, '../imges') + `/${req.params.name}`)
}

module.exports = {
    imgesHandler
}