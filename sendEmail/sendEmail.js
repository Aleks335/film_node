
const nodemailer = require("nodemailer");

async function sendMail(emailUser, LoginUser, code) {
    console.log('eeee',emailUser, LoginUser, code)

    let transporter = nodemailer.createTransport({
        host: "smtp.timeweb.ru",
        port: 465,
        secure: true,
        auth: {
            user: "aleks@moneyshop24.ru",
            pass: "4508833Aa",
        },
    });

    let info = await transporter.sendMail({

        from: "aleks@moneyshop24.ru",
        to:emailUser,
        subject: `Привет ${LoginUser} ✔ `,
        html: `<b>Скопируйте ваш код для восстановление пароля</b></br><b>Код : ${code}</b>`,
    });
}

module.exports = {sendMail}
