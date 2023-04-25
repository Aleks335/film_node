// подключение к БД
const {con} = require("./connectionDB");


function getRecoveryData(codeUser) {
    return new Promise((resolve, reject) => {
        con.query(`SELECT * FROM FilmBD.users_passwords_restore_code WHERE code = ?`, [codeUser], (err, res) => {
            if (err) reject(err);
            resolve(res)
        });
    })
}
function UpdatePassword(new_password, user_id) {
    return new Promise((resolve, reject) => {
        con.query(`UPDATE FilmBD.users SET password=? WHERE user_id=?`, [new_password, user_id], (err, res) => {
            if (err) reject(err);
            resolve(res)
        });
    })
}

function deletePasswordCode(user_id) {
    return new Promise((resolve, reject) => {
        con.query(`DELETE FROM FilmBD.users_passwords_restore_code WHERE user_id=?`, [user_id], (err, res) => {
            if (err) reject(err);
            resolve(res)
        });
    })
}



module.exports = {getRecoveryData, UpdatePassword, deletePasswordCode}