const signup_service = require('../../services/auth-services')
const signup_service_ = new signup_service()
const apiError = require('../../error/api-error')

class signupcls {
    async signup(req, res, next) {
        let payload = req.body

        if (!payload) {
            next(apiError.badRequest('error'))
            return

        }
        else if (payload) {
            const user_signup = await signup_service_.signup(payload)
            console.log(user_signup)
            if (user_signup.code === 500) {
                next(apiError.internal({
                    'statusCode': 500,
                    'ErrorMessage': user_signup.ErrorMessage,
                    'Error': 'badImplementation'

                }))
                return

            } else if (user_signup.code === 400) {
                next(apiError.badRequest({
                    'statusCode': 400,
                    'ErrorMessage': 'invalid data',
                    'Error': 'badRequest'


                }))
                return
            } else if (user_signup.length === 0) {
                return res.status(200).send({
                    'statuscode': 204,
                    'data': user_signup
                })
            }
            else {
                return res.status(200).send({
                    'statuscode': 200,
                    'data': user_signup
                })
            }
        }
    }
}

module.exports = signupcls