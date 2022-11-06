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
            if (forget_mail.statuscode === 500) {
                next(apiError.internal({
                    'statuscode': 500,
                    'errormessage': forget_mail.errormessage,
                    'message': 'badImplementation'

                }))
                return

            } else if (forget_mail.statuscode === 400) {
                next(apiError.badRequest({
                    'statuscode': 400,
                    'errormessage': 'invalid_data',
                    'message': 'badRequest'
                }))
                // return res.render('forgot-password', {notify_err: 'Something Went Wrong, Please Try Again...', notify_sh: 'auth-notify-show', page_title: "Forgot Password"});                

            } else if (forget_mail.length === 0) {
                return res.status(200).send({
                    'statuscode': 204,
                    'data': forget_mail, 
                    'message': 'success'
                })
            }
            else {
                
                if(forget_mail.message == 'verification_link_expired') {
                    return res.render('forgot-password-link', {link_expired: "db", user_exists: "dn", page_lnk: 'fp', page_title: "Sign Up"});
                }
                else if(forget_mail.message == 'user_already_exist') {
                    return res.render('sign-in', {link_expired: "dn", user_exists: "db", page_lnk: 'signin', page_title: "Sign In"});
                }
                else {
                    return res.render('create-password', {create_password: "dn", reset_password: "", email: forget_mail.data[0].email, page_title: "Change Password"});
                }
                return res.render('create-password', {create_password: "dn", reset_password: ""});

            }
        }
    }
}

module.exports = forget_mail_validate