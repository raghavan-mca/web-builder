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
            if (forget_main_.statuscode === 500) {
                next(apiError.internal({
                    'statuscode': 500,
                    'errormessage': forget_main_.errormessage,
                    'message': 'badImplementation'

                }))
                return

            } else if (forget_main_.statuscode === 400) {
                next(apiError.badRequest({
                    'statuscode': 400,
                    'errormessage': 'invalid_data',
                    'message': 'badRequest'


                }))
                return
            } else if (forget_main_.length === 0) {
                return res.status(200).send({
                    'statuscode': 204,
                    'data': forget_main_,
                    'message': 'success'
                })
            }
            else {
                return res.status(200).send({
                    'statuscode': 200,
                    'data': forget_main_,
                    'message': 'success'
                })
            }
        }
    }
}

module.exports = forgetMail