

const jwt = require("jsonwebtoken");
const {secret} = require("../config/constants");

function validateTokenMiddleware(req, res, next) {
    // достать токен
    const authHeader = req.headers["authorization"];// ищеи заголовок authorization
    console.log('authHeader', authHeader)
    const accessToken = authHeader && authHeader.split(" ")[1]; // выкидываем Bearer остается токе
    console.log('accessToken', accessToken)
    if (accessToken === null){
        return  res.sendStatus(401)
    }
    // сверить/ декодировать
    // decoded- расшифрованный токен
    jwt.verify(accessToken, secret, (error, decoded)=> {
        if(error){return  res.sendStatus(403)} // если весе плохо завершаем
        req.tokenData =  decoded //tokenData - новое свойство   decoded - расшифроваггый токен
        next();
    })
}

module.exports = {validateTokenMiddleware}
