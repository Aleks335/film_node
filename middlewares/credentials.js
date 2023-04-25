// проверяет список разрешенны оридчанов
// если присутсвует то ставит заголов позволяющий работать с куки

const allowedOrigins = require('../config/allowedOrigins');

const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    console.log('origin',origin)
    if (allowedOrigins.includes(origin)) {
        // Credentials слово относится к куки
        res.header('Access-Control-Allow-Credentials', true);
    }
    next();
}


module.exports = {credentials}

