
// const mysql = require("mysql");
// const {NULL} = require("mysql/lib/protocol/constants/types");
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


function  selectAll(column, sorting, year=0) {
    return new Promise((resolve, reject) => {
        con.query(`SELECT * FROM film WHERE date > ? ORDER BY ${column} ${sorting}`, [year], (err, res) => {
            if (err) reject(err);
            resolve(res)
        });
    })
}

function informFilm(idFilm) {
    return new Promise((resolve, reject) => {
        con.query(`SELECT * FROM FilmBD.film WHERE _id IN(?)`, [idFilm], (err, res) => {
            if (err) reject(err);
            resolve(res)
        });
    })
}


function selectAllComment(idFilm) {
    return new Promise((resolve, reject) => {
        con.query(`SELECT comments.*, users. email FROM FilmBD.comments comments, FilmBD.users users WHERE users.user_id = comments.user_id AND film_id IN(?)`, [idFilm], (err, res) => {
            if (err) reject(err);
            resolve(res)
        });
    })
}

function insetrAdd(title, directorName, date, filesNames, text) {
    return new Promise((resolve, reject) => {
        con.query('INSERT INTO film (title, director_name, date, filesNames, description) VALUES(?, ?, ?, ?, ?)', [title, directorName, date, filesNames, text], (err, res) => {
            if (err) reject(err);
            resolve(res)
        });
    })
}
function insetrAddComment(textComment, idFilm, token) {
    return new Promise((resolve, reject) => {
        con.query('INSERT INTO comments (film_id, text_comment, user_id) VALUES(?, ?, ?)', [idFilm, textComment, token], (err, res) => {
            if (err) reject(err);
            resolve(res)
        });
    })
}

function insetrAddFavorites(token, idFilm) {
    return new Promise((resolve, reject) => {
        con.query('INSERT INTO favorites (user_id, film_id) VALUES(?, ?)', [token, idFilm], (err, res) => {
            if (err) reject(err);
            resolve(res)
        });
    })
}

function massFavorites(token) {
    const {user_id}=token
        return new Promise((resolve, reject) => {
            con.query(`SELECT title, date,filesNames, film_id FROM FilmBD.film film, FilmBD.favorites favorites WHERE favorites.film_id = film._id AND user_id in(?)`, [user_id], (err, res) => {
                if (err) reject(err);
                resolve(res)
            });
        })
}

function delete_favorites(user_id ,idFilm) {
    return new Promise((resolve, reject) => {
        con.query(`DELETE FROM FilmBD.favorites WHERE user_id=(?) and film_id=(?)`, [user_id, idFilm], (err, res) => {
            if (err) reject(err);
            resolve(res)
        });
    })
}



module.exports = {
    insetrAddFavorites,
    selectAll,
    insetrAdd,
    insetrAddComment,
    selectAllComment,
    informFilm,
    massFavorites,
    delete_favorites
}