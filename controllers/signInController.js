const {selectUsers, updateRefreshToken} = require("../db/usersDB");
const jwt = require("jsonwebtoken");
const {accessSecret, refreshSecret} = require("../config/constants");


async function sign_inHandler(req, res) {
    const login = req.body.login;
    const pass = req.body.pass;

    const rez = await selectUsers(login, pass);
    if (rez.length > 0) {
        //sign - создать токен user_id: - то что кодируем (пейлоуд)
        const accessToken = jwt.sign({user_id: rez[0].user_id}, accessSecret, {expiresIn: "5s"})
        const refreshToken = jwt.sign({user_id: rez[0].user_id}, refreshSecret, {expiresIn: "1d"})
        const rez2 = updateRefreshToken(refreshToken, rez[0].user_id);


        //кук с http - httpOnly - сама куку, sameSite - своство можно ли работает с кукой с другово домена
        // secure - ставить хуки на https, maxAge - сколько будет жыть
        res.cookie('refreshToken', refreshToken, {httpOnly: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000})

        console.log(accessToken)
        res.json({
            // Bearer - это префикс так принято
            accessToken: `Bearer ${accessToken}`,
        });
    } else return res.sendStatus(401)
}

module.exports = {
    sign_inHandler
}