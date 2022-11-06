const joi = require('joi')

module.exports = {

    createform: {
        body: joi.object({
            first_name: joi.string().required(),
            phone_number: joi.string().optional().allow(""),
            email: joi.string().required(),
            message: joi.string().required()
        }),
        params:joi.object({
            uid: joi.string().required(),
            template_name: joi.string().required(),
        })
    },
    fetchform:{
        query:joi.object({
            uid: joi.string().required(),
            user_template_name:joi.string().optional().allow("")
        })
    },
    deleteform:{
        body:joi.object({
            ids:joi.array()
        })
    }
}