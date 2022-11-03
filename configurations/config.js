require('dotenv').config()
module.exports = {
    port: process.env.PORT,
    HOST: process.env.HOST,
    USERNAME_DB: process.env.USERNAME_DB,
    PASSWORD: process.env.PASSWORD,
    DB: process.env.DB,
    EMAIL:process.env.EMAIL,
    MAIL_PASS:process.env.MAIL_PASS,
    DOMINE_URL:process.env.DOMINE_URL,
    ENCRYPT_KEY:process.env.ENCRYPT_KEY
}