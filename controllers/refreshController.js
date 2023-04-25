const jwt = require("jsonwebtoken");
const {refreshSecret, accessSecret} = require("../config/constants");

async function refresHandler(req, res) {
    //достали все куки
    const cookies = req.cookies
    // проверям если рефреш (refreshToken)
    //? - проверяет обьек и его свойство на существование
    if (!cookies?.refreshToken) return res.sendStatus(401);
    // достаем токен
    const refreshToken = cookies.refreshToken;
    // проверка refreshToken
    jwt.verify(refreshToken, refreshSecret , (error, decoded)=> {
        if(error){return  res.sendStatus(403)} // если весе плохо завершаем
        // создали новый accessToken
        const accessToken = jwt.sign({user_id: decoded.user_id}, accessSecret, {expiresIn: "30s"})
        res.json({
            // Bearer - это префикс так принято
            accessToken: `Bearer ${accessToken}`
        });
    })
}

module.exports = {
    refresHandler
}