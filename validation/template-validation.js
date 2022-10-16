const joi = require('joi')

module.exports = {

    create_table: {
        body: joi.object({
            template_name: joi.string().required(),
            field: joi.array().items({
                type: joi.string().required(),
                model: joi.string().required(),
                length: joi.string().optional().allow(''),
            })
        })
    },
    create_website: {
        body: joi.object({
            template_name: joi.string().required(),
            uid:joi.string().required(),
            values: joi.array().items({
                name: joi.string().required(),
                value: joi.string().required(),
            })
        })
    },
    domain: {
        body: joi.object({
            template_name: joi.string().required(),
            uid:joi.string().required(),
            domain_name:joi.string().required(),
        })
    },
    load_domain:{
        params: joi.object({
            domain_name: joi.string().required()
        })
    }
}