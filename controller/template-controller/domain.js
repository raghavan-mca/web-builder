const template_service = require('../../services/template-services')
const template_service_ = new template_service()
const apiError = require('../../error/api-error')


class domain {
    async domain(req, res, next) {

        const get_domain = await template_service_.get_domain(req.query)
        if (get_domain.statuscode === 500) {
            next(apiError.internal({
                'statuscode': 500,
                'errormessage': get_domain.errormessage,
                'message': 'badImplementation'

            }))
            return

        } else if (get_domain.statuscode === 400) {
            next(apiError.badRequest({
                'statuscode': 400,
                'errormessage': 'invalid_data',
                'message': 'badRequest'


            }))
            return
        } else if (get_domain.length === 0) {
            return res.status(200).send({
                'statuscode': 204,
                'data': get_domain,
                'message': 'success'
            })
        }
        else {
            return res.status(200).send({
                'statuscode': 200,
                'data': get_domain,
                'message': 'success'
            })
        }

    }
}

module.exports = domain