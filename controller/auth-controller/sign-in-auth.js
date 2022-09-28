const signup_service = require('../../services/auth-services')
const signup_service_ = new signup_service()
const apiError = require('../../error/api-error')

const path = require('path');

class signInAuth {
    async signinAuth(req, res, next) {
        //ARJ - PAGES ROUTER
            
            return res.render('sign-in');

    }
}

module.exports = signInAuth