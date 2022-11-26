const template_service = require('../../services/template-services')
const template_service_ = new template_service()
const apiError = require('../../error/api-error')


class CreateWebsite {
    async createwebsite(req, res, next) {
        let payload = req.body

        if (!payload) {
            next(apiError.badRequest('error'))
            return

        }
        else if (payload) {
            const create_website = await template_service_.create_website_service(payload)
            if (create_website.statuscode === 500) {
                next(apiError.internal({
                    'statuscode': 500,
                    'errormessage': create_website.errormessage,
                    'message': 'badImplementation'

                }))
                return

            } else if (create_website.statuscode === 400) {
                next(apiError.badRequest({
                    'statuscode': 400,
                    'errormessage': 'invalid_data',
                    'message': 'badRequest'


                }))
                return
            } else if (create_website.length === 0) {
                return res.status(200).send({
                    'statuscode': 204,
                    'data': create_website,
                    'message': 'success'
                })
            }
            else {
                return res.status(200).send({
                    'statuscode': 200,
                    'data': create_website,
                    'message': 'success'
                })
            }
        }
    }
}

module.exports = CreateWebsite