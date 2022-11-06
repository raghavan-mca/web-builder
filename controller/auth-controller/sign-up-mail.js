const signup_service = require('../../services/auth-services')
const signup_service_ = new signup_service()
const apiError = require('../../error/api-error')

const path = require('path');

class signupMail {
    async signupmail(req, res, next) {
        let query = req.query

        if (!query) {
            next(apiError.badRequest('error'))
            return

        }
        else if (query) {
            const user_signup_mail = await signup_service_.signupmail(query)
           if (user_signup_mail.statuscode === 500) {
                next(apiError.internal({
                    'statuscode': 500,
                    'errormessage': user_signup_mail.errormessage,
                    'message': 'badImplementation'

                }))
                return

            } else if (user_signup_mail.statuscode === 400) {
                next(apiError.badRequest({
                    'statuscode': 400,
                    'errormessage': 'invalid_data',
                    'message': 'badRequest'


                }))
                return
            } else if (user_signup_mail.length === 0) {
                return res.status(200).send({
                    'statuscode': 204,
                    'data': user_signup_mail,
                    'message': 'success'

                })
            }
            else {
                if(user_signup_mail.message == 'verification_link_expired') {
                    console.log(user_signup_mail);
                    return res.render('signup-link', {link_expired: "db", user_exists: "dn", page_lnk: 'signup', page_title: "Sign Up"});
                }
                else if(user_signup_mail.message == 'user_already_exist') {
                    console.log(user_signup_mail);

                    return res.render('signin', {link_expired: "dn", user_exists: "db", page_lnk: 'signin', page_title: "Sign In"});
                }
                else {
                    console.log(user_signup_mail);
                    return res.render('create-password',  {create_password: "", reset_password: "dn", email: user_signup_mail.data[0].email, page_title: "Create Password"});
                    
                }


            }

        }
    }
}

module.exports = signupMail