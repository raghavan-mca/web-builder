const joi = require('joi')

module.exports = {

    
    fetchUserTemplate:{
        query:joi.object({
            uid: joi.string().required(),
        })
    },
    update_website: {
        body: joi.object({
            template_name: joi.string().required(),
            uid:joi.string().required(),
            values: joi.array().items({
                name: joi.string().required(),
                value: joi.string().required(),
            })
        })
    },
    delete_website: {
        params: joi.object({
            template_name: joi.string().required(),
            uid:joi.string().required(),
        })
    },

    
}