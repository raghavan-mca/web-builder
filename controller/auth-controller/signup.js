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
            if (user_signup.statuscode === 500) {
                next(apiError.internal({
                    'statuscode': 500,
                    'errormessage': user_signup.errormessage,
                    'message': 'badImplementation'

                }))
                return

            } else if (user_signup.statuscode === 400) {
                next(apiError.badRequest({
                    'statuscode': 400,
                    'errormessage': 'invalid_data',
                    'message': 'badRequest'


                }))
                return
            } else if (user_signup.length === 0) {
                return res.status(200).send({
                    'statuscode': 204,
                    'data': user_signup,
                    'message': 'success'
                })
            }
            else {
                return res.status(200).send({
                    'statuscode': 200,
                    'data': user_signup,
                    'message': 'success'
                })
            }
        }
    }
}

module.exports = signupcls