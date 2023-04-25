
const {loginUniqueness, insertUsersPasswordsRestoreCode} = require("../db/usersDB");
const {sendMail} = require("../sendEmail/sendEmail");

async function signRestoreUserPassword(req, res) {
    const login = req.body.login;
    const new_password = req.body.new_password;
    const old_password = req.body.old_password;

    // получаем юзера, пароль , емаил  по логину
    const rezUsers= await loginUniqueness(login);

    // проверяем пустой массив и старый логин
    if ((rezUsers.length > 0 ) && (old_password === rezUsers[0].password)){
        const emailUser = rezUsers[0].email;
        const LoginUser = rezUsers[0].login;
        const user_id = rezUsers[0].user_id;
        //формируем код
        const code = Math.random().toFixed(4).slice(2);
        // отправляем на почту
        console.log('ddd',emailUser, LoginUser, code)
        await sendMail(emailUser, LoginUser, code)
        //записываем в бд users_passwords_restore_code
        await insertUsersPasswordsRestoreCode(user_id, code, new_password)
        res.json({
            mail:`letter sent to ${emailUser}`
        })
    }else return res.sendStatus(401)
}


module.exports = {
    signRestoreUserPassword
}
