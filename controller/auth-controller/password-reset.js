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
            console.log(reset_user_password)
            if (reset_user_password.code === 500) {
                next(apiError.internal({
                    'statusCode': 500,
                    'ErrorMessage': reset_user_password.ErrorMessage,
                    'Error': 'badImplementation'

                }))
                return

            } else if (reset_user_password.code === 400) {
                next(apiError.badRequest({
                    'statusCode': 400,
                    'ErrorMessage': 'invalid data',
                    'Error': 'badRequest'


                }))
                return
            } else if (reset_user_password.length === 0) {
                return res.status(200).send({
                    'statuscode': 204,
                    'data': reset_user_password
                })
            }
            else {
                return res.status(200).send({
                    'statuscode': 200,
                    'data': reset_user_password
                })
            }
        }
    }
}

module.exports = resetpassword