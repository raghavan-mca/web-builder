const signup_service = require('../../services/auth-services')
const signup_service_ = new signup_service()
const apiError = require('../../error/api-error')

class signin_user {
    async userSignin(req, res, next) {
        let payload = req.body

        if (!payload) {
            next(apiError.badRequest('error'))
            return

        }
        else if (payload) {
            const usersignin = await signup_service_.signinuser(payload)
            console.log(usersignin)
            if (usersignin.code === 500) {
                next(apiError.internal({
                    'statusCode': 500,
                    'ErrorMessage': usersignin.ErrorMessage,
                    'Message': 'badImplementation'

                }))
                return

            } else if (usersignin.code === 400) {
                next(apiError.badRequest({
                    'statusCode': 400,
                    'ErrorMessage': 'invalid data',
                    'Message': 'badRequest'


                }))
                return
            } else if (usersignin.length === 0) {
                return res.status(200).send({
                    'statuscode': 204,
                    'data': usersignin,
                    'Message': 'success'
                })
            }
            else {
                return res.status(200).send({
                    'statuscode': 200,
                    'data': usersignin,
                    'Message': 'success'
                })
            }
        }
    }
}

module.exports = signin_user