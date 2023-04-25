
const {getRecoveryData, UpdatePassword, deletePasswordCode} = require("../db/usersPasswordsEestoreDB");

async function signRestoreUserCodeController(req, res) {
    const codeUser = req.body.code;

    // getRecoveryData   получить данные для восстановления
    const rezRecoveryData = await getRecoveryData(codeUser);

    if ((rezRecoveryData.length > 0) && (rezRecoveryData[0].code === Number(codeUser))){
        await UpdatePassword(rezRecoveryData[0].new_password, rezRecoveryData[0].user_id);
        await deletePasswordCode(rezRecoveryData[0].user_id);

        res.json({
            password:`password changed`
        })
    }else return res.sendStatus(402)

}

module.exports = {
    signRestoreUserCodeController
}