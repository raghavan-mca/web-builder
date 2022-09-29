const signup_service = require('../../services/auth-services')
const signup_service_ = new signup_service()
const apiError = require('../../error/api-error')

const path = require('path');

class forgotPasswordAuth {
    async forgotPasswordAuth(req, res, next) {
        //ARJ - PAGES ROUTER

            return res.render('forgot-password', {notify_err: '', notify_sh: ''});                


            // return res.sendFile(fileName, options, (err) => {
            //     if(err) {
            //         next(err);
            //         console.log(err);
            //     }
            //     else {
            //         console.log("File Loaded");
            //     }
            // });



            // if (signup_auth_serv.code === 500) {
            //     next(apiError.internal({
            //         'statusCode': 500,
            //         'ErrorMessage': signup_auth_serv.ErrorMessage,
            //         'Error': 'badImplementation'

            //     }))
            //     return

            // } else if (signup_auth_serv.code === 400) {
            //     next(apiError.badRequest({
            //         'statusCode': 400,
            //         'ErrorMessage': 'invalid data',
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

module.exports = forgotPasswordAuth