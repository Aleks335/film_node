// рефреш токе - это новый токе необходимый для обновление аксес токен
const corsOptions = require('./config/corsOptions');
// мидл для кука  нужно установить  cookie-parser (куки считыватель)
const cookieParser = require('cookie-parser');

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const {validateTokenMiddleware} = require("./middlewares/validateTokenMiddleware");
const {credentials} = require("./middlewares/credentials");

//складываем файлы в паку imges
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + '/imges');
    },
    // Sets file(s) to be saved in uploads folder in same directory
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
    // Sets saved filename(s) to be original filename(s)
})

const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());//позволяет принимать и считывать cookie
app.use(credentials); // позволяет ставить заголовки необходимы для  cookie


app.use('/comments', require("./routes/comments"));
app.use('/favorites', require("./routes/favorites"));
app.use('/films', require("./routes/films"));
app.use('/imges', require("./routes/imges"));
app.use('/sign_in', require("./routes/sign_in"));
app.use('/sign_up', require("./routes/sign_up"));

app.use('/sign_restore_user_password', require("./routes/sign_restore_user_password"));
app.use('/sign_restore_user_code', require("./routes/sign_restore_user_code"));

app.use('/refresh', require("./routes/refresh"));


app.listen(3555, () => console.log('Ok'))