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
            console.log(user_signup_mail)
            console.log(user_signup_mail)
            if (user_signup_mail.code === 500) {
                next(apiError.internal({
                    'statusCode': 500,
                    'ErrorMessage': user_signup_mail.ErrorMessage,
                    'Message': 'badImplementation'

                }))
                return

            } else if (user_signup_mail.code === 400) {
                next(apiError.badRequest({
                    'statusCode': 400,
                    'ErrorMessage': 'invalid data',
                    'Message': 'badRequest'


                }))
                return
            } else if (user_signup_mail.length === 0) {
                return res.status(200).send({
                    'statuscode': 204,
                    'data': user_signup_mail,
                    'Message': 'success'

                })
            }
            else {
                if(user_signup_mail.message == 'Expired') {
                    return res.render('signup-link', {link_expired: "auth-notify-show", user_exists: ""});
                }
                else if(user_signup_mail.message == 'Already Exit') {
                    return res.render('signup-link', {link_expired: "", user_exists: "auth-notify-show"});
                }
                else {
                    return res.render('create-password',  {create_password: "", reset_password: "dn", email: user_signup_mail.data[0].email});
                    // let cp_options = {
                    //     root: path.join(__dirname + '../../../public/pages/')
                    // };
                    // let cp_fileName = "create-password.html";

                    // console.log("CREATE PASSWORD ROUTE");
                    // return res.sendFile(cp_fileName, cp_options, (err) => {
                    //     if(err) {
                    //         next(err);
                    //         console.log(err);
                    //     }
                    //     else {
                    //         console.log("File Loaded");
                    //         console.log(user_signup_mail);
                    //         // next();
                    //     }
                    // });

                    // res.status(200).send({
                    //     'statuscode': 200,
                    //     'data': user_signup_mail
                    // })
                    
                }


            }

        }
    }
}

module.exports = signupMail