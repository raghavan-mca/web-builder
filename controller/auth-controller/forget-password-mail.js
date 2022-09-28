const signup_service = require('../../services/auth-services')
const signup_service_ = new signup_service()
const apiError = require('../../error/api-error')

class forgetMail {
    async forgetpasswordmail(req, res, next) {
        let payload = req.body

        if (!payload) {
            next(apiError.badRequest('error'))
            return

        }
        else if (payload) {
            const forget_main_ = await signup_service_.forget_password_mail(payload)
            console.log(forget_main_)
            console.log(forget_main_)
            if (forget_main_.code === 500) {
                next(apiError.internal({
                    'statusCode': 500,
                    'ErrorMessage': forget_main_.ErrorMessage,
                    'Message': 'badImplementation'

                }))
                return

            } else if (forget_main_.code === 400) {
                next(apiError.badRequest({
                    'statusCode': 400,
                    'ErrorMessage': 'invalid data',
                    'Message': 'badRequest'


                }))
                return
            } else if (forget_main_.length === 0) {
                return res.status(200).send({
                    'statuscode': 204,
                    'data': forget_main_,
                    'Message': 'success'
                })
            }
            else {
                return res.status(200).send({
                    'statuscode': 200,
                    'data': forget_main_,
                    'Message': 'success'
                })
            }
        }
    }
}

module.exports = forgetMail