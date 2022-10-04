const joi = require('joi')

module.exports = {

    signup: {
        body: joi.object({
            username: joi.string().required(),
            email: joi.string().required(),
            business_name: joi.string().required(),
            business_nature: joi.string().required(),
            terms: joi.string().required()
        })
    },
    signup_mail: {
        query: joi.object({
            username: joi.string().required(),
            email: joi.string().required(),
            password_timestamp:joi.string().required(),
        })
    },
    reset_mail: {
        query: joi.object({
            username: joi.string().required(),
            email: joi.string().required(),
            password_timestamp:joi.string().required(),
        })
    },
    create_password: {
        body: joi.object({
            email: joi.string().required(),
            password: joi.string().required(),
        })
    },
    forgetpassword: {
        body: joi.object({
            email: joi.string().required(),
        })
    },

}