const signup_service = require('../../services/auth-services')
const signup_service_ = new signup_service()
const apiError = require('../../error/api-error')

const path = require('path');

class signUpAuth {
    async signupAuth(req, res, next) {
        //ARJ - PAGES ROUTER

            return res.render('signup', {page_title: "Sign Up"});

            // return res.sendFile(fileName, options, (err) => {
            //     if(err) {
            //         next(err);
            //         console.log(err);
            //     }
            //     else {
            //         console.log("File Loaded");
            //     }
            // });



            // if (signup_auth_serv.statuscode === 500) {
            //     next(apiError.internal({
            //         'statuscode': 500,
            //         'errormessage': signup_auth_serv.errormessage,
            //         'Error': 'badImplementation'

            //     }))
            //     return

            // } else if (signup_auth_serv.statuscode === 400) {
            //     next(apiError.badRequest({
            //         'statuscode': 400,
            //         'errormessage': 'invalid_data',
            //         'Error': 'badRequest'


            //     }))
            //     return
            // } else if (signup_auth_serv.length === 0) {
            //     return res.status(200).send({
            //         'statuscode': 204,
            //         'data': signup_auth_serv
            //     })
            // }
            // else {
            //     return res.status(200).send({
            //         'statuscode': 200,
            //         'data': signup_auth_serv
            //     })
            // }
    }
}

module.exports = signUpAuth