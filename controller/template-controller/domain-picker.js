const template_service = require('../../services/template-services')
const template_service_ = new template_service()
const apiError = require('../../error/api-error')


class domainPicker {
    async domain(req, res, next) {
        let payload = req.body

        if (!payload) {
            next(apiError.badRequest('error'))
            return

        }
        else if (payload) {
            const domain_picker = await template_service_.domain_service(payload)
            if (domain_picker.statuscode === 500) {
                next(apiError.internal({
                    'statuscode': 500,
                    'errormessage': domain_picker.errormessage,
                    'message': 'badImplementation'

                }))
                return

            } else if (domain_picker.statuscode === 400) {
                next(apiError.badRequest({
                    'statuscode': 400,
                    'errormessage': 'invalid_data',
                    'message': 'badRequest'


                }))
                return
            } else if (domain_picker.length === 0) {
                return res.status(200).send({
                    'statuscode': 204,
                    'data': domain_picker,
                    'message': 'success'
                })
            }
            else {
                return res.status(200).send({
                    'statuscode': 200,
                    'data': domain_picker,
                    'message': 'success'
                })
            }
        }
    }
}

module.exports = domainPicker