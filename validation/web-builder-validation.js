const joi = require('joi')

module.exports = {
    fetch: {
        query: joi.object({
            title:joi.string().optional()
        })
    },
    create:{
        body:joi.object({
            title:joi.string().required(),
            description :joi.string().required(),
            published :joi.string().required()
        })
    },
    update_body:{
        body:joi.object({
            title:joi.string().optional(),
            description :joi.string().optional(),
            published :joi.string().optional()
        })
    },
    update_params:{
        params: joi.object({
            id: joi.string().required()
        })
    },
    delete_params:{
        params: joi.object({
            id: joi.string().required()
        })
    },
}