// const mysql = require("mysql");
//
// const con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "4508833Aa",
//     database: 'filmBD',
//     port:3306
//     // password: "ebueidni",
// });
// con.connect(function (err) {
//     if (err) throw err;
//     console.log("Connected to db Films!");
// });


// подключение к БД
const {con} = require("./connectionDB");


// проверка по логина уникальность
function loginUniqueness(login) {
    return new Promise((resolve, reject) => {
        con.query(`SELECT * FROM users WHERE login = ?`, [login], (err, res) => {
            if (err) reject(err);
            resolve(res)
        });
    })
}


function insertUser(login, pass, email) {
    return new Promise((resolve, reject) => {
        con.query('INSERT INTO users (login, password, email) VALUES(?, ?, ?)', [login, pass, email], (err, res) => {
            if (err) reject(err);
            resolve(res)
        });
    })
}

function selectUsers(login, pass) {
    return new Promise((resolve, reject) => {
        con.query(`SELECT * FROM users WHERE login = ? and password = ?`, [login, pass], (err, res) => {
            if (err) reject(err);
            resolve(res)
        });
    })
}
function selectUsersById(id) {
    return new Promise((resolve, reject) => {
        con.query(`SELECT * FROM users WHERE user_id = ?`, [id], (err, res) => {
            if (err) reject(err);
            resolve(res)
        });
    })
}

function insertUsersPasswordsRestoreCode(user_id, code, new_password){
    return new Promise((resolve, reject) => {
        con.query(`INSERT INTO FilmBD.users_passwords_restore_code (user_id, code, new_password) VALUES(?, ?, ?)`, [user_id, code, new_password], (err, res) => {
            if (err) reject(err);
            resolve(res)
        });
    })
}

function updateRefreshToken(refresh_token, user_id) {
    return new Promise((resolve, reject) => {
        con.query(`UPDATE FilmBD.users SET refresh_token=? WHERE user_id=?`, [refresh_token, user_id,], (err, res) => {
            if (err) reject(err);
            resolve(res)
        });
    })
}



module.exports = {insertUser, selectUsers, loginUniqueness, selectUsersById, insertUsersPasswordsRestoreCode, updateRefreshToken}