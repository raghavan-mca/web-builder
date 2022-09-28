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
            console.log(newPassword)
            if (newPassword.code === 500) {
                next(apiError.internal({
                    'statusCode': 500,
                    'ErrorMessage': newPassword.ErrorMessage,
                    'Message': 'badImplementation'

                }))
                return

            } else if (newPassword.code === 400) {
                next(apiError.badRequest({
                    'statusCode': 400,
                    'ErrorMessage': 'invalid data',
                    'Message': 'badRequest'


                }))
                return
            } else if (newPassword.length === 0) {
                return res.status(200).send({
                    'statuscode': 204,
                    'data': newPassword,
                    'Message': 'success'
                })
            }
            else {
                return res.status(200).send({
                    'statuscode': 200,
                    'data': newPassword,
                    'Message': 'success'
                })
            }
        }
    }
}

module.exports = passwordcreate