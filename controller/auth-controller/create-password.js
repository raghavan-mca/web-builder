const signup_service = require('../../services/auth-services')
const signup_service_ = new signup_service()
const apiError = require('../../error/api-error')


class passwordcreate {
    async passwordCreate(req, res, next) {
        let payload = req.body

        if (!payload) {
            next(apiError.badRequest('error'))
            return

        }
        else if (payload) {
            const newPassword = await signup_service_.createPassword(payload)
            if (newPassword.statuscode === 500) {
                next(apiError.internal({
                    'statuscode': 500,
                    'errormessage': newPassword.errormessage,
                    'message': 'badImplementation'

                }))
                return

            } else if (newPassword.statuscode === 400) {
                next(apiError.badRequest({
                    'statuscode': 400,
                    'errormessage': 'invalid_data',
                    'message': 'badRequest'


                }))
                return
            } else if (newPassword.length === 0) {
                return res.status(200).send({
                    'statuscode': 204,
                    'data': newPassword,
                    'message': 'success'
                })
            }
            else {
                return res.status(200).send({
                    'statuscode': 200,
                    'data': newPassword,
                    'message': 'success'
                })
            }
        }
    }
}

module.exports = passwordcreate