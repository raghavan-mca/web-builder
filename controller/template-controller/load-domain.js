const template_service = require('../../services/template-services')
const template_service_ = new template_service()
const apiError = require('../../error/api-error')


class domainload {
    async domainloading(req, res, next) {
        let payload = req.params

        if (!payload) {
            next(apiError.badRequest('error'))
            return

        }
        else if (payload) {
            const domain_loading = await template_service_.loadDomain(payload)
            if (domain_loading.statuscode === 500) {
                next(apiError.internal({
                    'statuscode': 500,
                    'errormessage': domain_loading.errormessage,
                    'message': 'badImplementation'

                }))
                return

            } else if (domain_loading.statuscode === 400) {
                next(apiError.badRequest({
                    'statuscode': 400,
                    'errormessage': 'invalid_data',
                    'message': 'badRequest'


                }))
                return
            } else if (domain_loading.length === 0) {
                return res.status(200).send({
                    'statuscode': 204,
                    'data': domain_loading,
                    'message': 'success'
                })
            }
            else {
                return res.status(200).send({
                    'statuscode': 200,
                    'data': domain_loading,
                    'message': 'success'
                })
            }
        }
    }
}

module.exports = domainload