const signup_service = require('../../services/auth-services')
const signup_service_ = new signup_service()
const apiError = require('../../error/api-error')

class forget_mail_validate {
    async forgetmail(req, res, next) {
        let query = req.query

        if (!query) {
            next(apiError.badRequest('error'))
            return

        }
        else if (query) {
            const forget_mail = await signup_service_.forget_password_validate(query)
            console.log(forget_mail)
            console.log(forget_mail)
            if (forget_mail.code === 500) {
                next(apiError.internal({
                    'statusCode': 500,
                    'ErrorMessage': forget_mail.ErrorMessage,
                    'Error': 'badImplementation'

                }))
                return

            } else if (forget_mail.code === 400) {
                next(apiError.badRequest({
                    'statusCode': 400,
                    'ErrorMessage': 'invalid data',
                    'Error': 'badRequest'


                }))
                return
            } else if (forget_mail.length === 0) {
                return res.status(200).send({
                    'statuscode': 204,
                    'data': forget_mail
                })
            }
            else {
                return res.render('create-password', {create_password: "dn", reset_password: "", email: forget_mail.data[0].email});
                // return res.render('create-password', {create_password: "dn", reset_password: ""});

                // return res.status(200).send({
                //     'statuscode': 200,
                //     'data': forget_mail
                // })
            }
        }
    }
}

module.exports = forget_mail_validate