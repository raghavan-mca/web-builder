require('dotenv').config()
module.exports = {
    port: process.env.PORT,
    HOST: process.env.HOST,
    USERNAME_DB: process.env.USERNAME_DB,
    PASSWORD: process.env.PASSWORD,
    DB: process.env.DB,
    EMAIL:process.EMAIL,
    DOMAIN:process.WEB_DOMAIN
}