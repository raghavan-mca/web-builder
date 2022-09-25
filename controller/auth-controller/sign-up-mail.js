const signup_service = require('../../services/auth-services')
const signup_service_ = new signup_service()
const apiError = require('../../error/api-error')

class signupMail {
    async signupmail(req, res, next) {
        let query = req.query

        if (!query) {
            next(apiError.badRequest('error'))
            return

        }
        else if (query) {
            const user_signup_mail = await signup_service_.signupmail(query)
            console.log(user_signup_mail)
            console.log(user_signup_mail)
            if (user_signup_mail.code === 500) {
                next(apiError.internal({
                    'statusCode': 500,
                    'ErrorMessage': user_signup_mail.ErrorMessage,
                    'Error': 'badImplementation'

                }))
                return

            } else if (user_signup_mail.code === 400) {
                next(apiError.badRequest({
                    'statusCode': 400,
                    'ErrorMessage': 'invalid data',
                    'Error': 'badRequest'


                }))
                return
            } else if (user_signup_mail.length === 0) {
                return res.status(200).send({
                    'statuscode': 204,
                    'data': user_signup_mail
                })
            }
            else {
                return res.status(200).send({
                    'statuscode': 200,
                    'data': user_signup_mail
                })
            }
        }
    }
}

module.exports = signupMail