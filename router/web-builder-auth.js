const express = require('express')
const router = express.Router()



const signUp = require('../controller/auth-controller/signup')
const user_signup_mail = require('../controller/auth-controller/sign-up-mail')
const passwordCreate = require('../controller/auth-controller/create-password')
const signin = require('../controller/auth-controller/signin-user')
const forget_password = require('../controller/auth-controller/forget-password-mail')
const forget_mail_validate = require('../controller/auth-controller/forget-password-validate')
const reset_password_ = require('../controller/auth-controller/password-reset')

const signUpAuth = require('../controller/auth-controller/sign-up-auth')
const signInAuth = require('../controller/auth-controller/sign-in-auth')
const forgotPasswordAuth = require('../controller/auth-controller/forgot-password-auth')

const {
    validate
} = require('express-validation')

const joi = require('../validation/auth')

const signUp_web_builder = new signUp();
const signup_mail = new user_signup_mail();
const new_password = new passwordCreate();
const user_signin = new signin();
const reset_password = new forget_password();
const reset_password_validate = new forget_mail_validate();
const reset_user_password = new reset_password_();

const sign_up_auth = new signUpAuth();
const sign_in_auth = new signInAuth();
const forgot_password_auth = new forgotPasswordAuth();


router.post('/signup', validate(joi.signup),
    signUp_web_builder.signup)

router.get('/validationmail', validate(joi.signup_mail),
    signup_mail.signupmail)

router.post('/createpassword', validate(joi.create_password),
    new_password.passwordCreate)

router.post('/signin', validate(joi.create_password),
    user_signin.userSignin)

router.post('/forgetpassword', validate(joi.forgetpassword),
    reset_password.forgetpasswordmail)

router.get('/resetpassword', validate(joi.reset_mail),
    reset_password_validate.forgetmail)

router.post('/resetuserpassword', validate(joi.create_password),
    reset_user_password.resetPassword)

// ARJ ROUTER PAGE
router.get('/signup-auth', sign_up_auth.signupAuth);

router.get('/signin-auth', sign_in_auth.signinAuth);

router.get('/forgot-password-auth', forgot_password_auth.forgotPasswordAuth);


module.exports = router