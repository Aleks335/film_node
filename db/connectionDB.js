
const mysql = require("mysql");

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "4508833Aa",
    database: 'filmBD',
    port:3306
    // password: "ebueidni",
});
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected to db Films!");
});

module.exports = {con}