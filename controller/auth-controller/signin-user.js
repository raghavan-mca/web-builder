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
            if (usersignin.statuscode === 500) {
                next(apiError.internal({
                    'statuscode': 500,
                    'errormessage': usersignin.errormessage,
                    'message': 'badImplementation'

                }))
                return

            } else if (usersignin.statuscode === 400) {
                next(apiError.badRequest({
                    'statuscode': 400,
                    'errormessage': 'invalid_data',
                    'message': 'badRequest'


                }))
                return
            } else if (usersignin.length === 0) {
                return res.status(200).send({
                    'statuscode': 204,
                    'data': usersignin,
                    'message': 'success'
                })
            }
            else {
                return res.status(200).send({
                    'statuscode': 200,
                    'data': usersignin,
                    'message': 'success'
                })
            }
        }
    }
}

module.exports = signin_user