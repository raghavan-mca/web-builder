const user_store_service = require('../../services/user-store-service')
const user_store_service_ = new user_store_service()
const apiError = require('../../error/api-error')


class deleteTemplate {
    async Deletetemplate(req, res, next) {
        let payload = req.params
        if (!payload ) {
            next(apiError.badRequest('error'))
            return

        }
        else if (payload ) {
            const delete_template = await user_store_service_.DeleteUserTemplate(payload)
            if (delete_template.statuscode === 500) {
                next(apiError.internal({
                    'statuscode': 500,
                    'errormessage': delete_template.errormessage,
                    'message': 'badImplementation'

                }))
                return

            } else if (delete_template.statuscode === 400) {
                next(apiError.badRequest({
                    'statuscode': 400,
                    'errormessage': 'invalid_data',
                    'message': 'badRequest'


                }))
                return
            } else if (delete_template.length === 0) {
                return res.status(200).send({
                    'statuscode': 204,
                    'data': delete_template,
                    'message': 'success'
                })
            }
            else {
                return res.status(200).send({
                    'statuscode': 200,
                    'data': delete_template,
                    'message': 'success'
                })
            }
        }
    }
}

module.exports = deleteTemplate