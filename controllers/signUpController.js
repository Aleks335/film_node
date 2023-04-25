const {loginUniqueness, insertUser} = require("../db/usersDB");

async function sign_upHandler(req, res) {
    const login = req.body.login;
    const pass = req.body.pass;
    const email = req.body.email;

    const rezUniqu = await loginUniqueness(login);
    if (rezUniqu.length === 0) {
        insertUser(login, pass, email)
        // res.json({
        //     usebbb:'kkhgfg',
        // })
        return res.sendStatus(200)
    } else return res.sendStatus(401)
}

module.exports = {
    sign_upHandler
}