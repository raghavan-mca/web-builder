const user_store_service = require('../../services/user-store-service')
const user_store_service_ = new user_store_service()
const apiError = require('../../error/api-error')


class updateTemplate {
    async Updatetemplate(req, res, next) {
        let payload = req.body
        

        if (!payload ) {
            next(apiError.badRequest('error'))
            return

        }
        else if (payload ) {
            const update_template = await user_store_service_.UpdateUserTemplate(payload)
            if (update_template.statuscode === 500) {
                next(apiError.internal({
                    'statuscode': 500,
                    'errormessage': update_template.errormessage,
                    'message': 'badImplementation'

                }))
                return

            } else if (update_template.statuscode === 400) {
                next(apiError.badRequest({
                    'statuscode': 400,
                    'errormessage': 'invalid_data',
                    'message': 'badRequest'


                }))
                return
            } else if (update_template.length === 0) {
                return res.status(200).send({
                    'statuscode': 204,
                    'data': update_template,
                    'message': 'success'
                })
            }
            else {
                return res.status(200).send({
                    'statuscode': 200,
                    'data': update_template,
                    'message': 'success'
                })
            }
        }
    }
}

module.exports = updateTemplate