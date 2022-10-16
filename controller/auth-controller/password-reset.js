const signup_service = require('../../services/auth-services')
const signup_service_ = new signup_service()
const apiError = require('../../error/api-error')

class resetpassword {
    async resetPassword(req, res, next) {
        let payload = req.body

        if (!payload) {
            next(apiError.badRequest('error'))
            return

        }
        else if (payload) {
            const reset_user_password = await signup_service_.password_reset(payload)
            if (reset_user_password.statuscode === 500) {
                next(apiError.internal({
                    'statuscode': 500,
                    'errormessage': reset_user_password.errormessage,
                    'message': 'badImplementation'
                }))
                return

            } else if (reset_user_password.statuscode === 400) {
                next(apiError.badRequest({
                    'statuscode': 400,
                    'errormessage': 'invalid_data',
                    'message': 'badRequest'
                }))
                return
            } else if (reset_user_password.length === 0) {
                return res.status(200).send({
                    'statuscode': 204,
                    'data': reset_user_password,
                    'message': 'success'
                })
            }
            else {
            
                return res.status(200).send({
                    'statuscode': 200,
                    'data': reset_user_password,
                    'message': 'success'
                })
            }
        }
    }
}

module.exports = resetpassword