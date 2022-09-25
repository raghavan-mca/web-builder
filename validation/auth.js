const joi = require('joi')

module.exports = {
    
    signup:{
        body:joi.object({
            username:joi.string().required(),
            email:joi.string().required(),
        })
    },
    signup_mail:{
        query:joi.object({
            username:joi.string().required(),
            email:joi.string().required(),
        })
    },
    create_password:{
        body:joi.object({
            email:joi.string().required(),
            password:joi.string().required(),
        })
    },
    forgetpassword:{
        body:joi.object({
            email:joi.string().required(),
        })
    },
    
}