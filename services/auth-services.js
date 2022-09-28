const CryptoJS = require('crypto-js');
let db = require('../configurations/dbConnection')
let config = require('../configurations/config')
const axios = require('axios')
var nodemailer = require('nodemailer');
let authfirebase = require('../configurations/firebase')
const { initializeApp } = require("firebase/app");
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } = require("firebase/auth");
initializeApp(authfirebase);
const auth = getAuth();



class auth_services {
    async signup(payload) {
        try {
            let find_user = await db.raw(`select * from aristostech_users where username = '${payload.username}' AND email = '${payload.email}' AND validate = 0`).then(function (res) {
                if (res[0].length > 0) {
                    return true
                } else {
                    return false
                }

            });
            if (find_user) {
                let delete_invalid_user = await db.raw(`DELETE FROM aristostech_users WHERE email = '${payload.email}'`).then(function (res) {
                    if (res[0].affectedRows > 0) {
                        return true
                    } else {
                        return false
                    }
                })
                if (delete_invalid_user) {
                    let insert_user = await db.raw(`INSERT INTO aristostech_users ( username, email, validate, business_name,business_nature,terms ) VALUES('${payload.username}', '${payload.email}', 0, '${payload.business_name}','${payload.business_nature}','${payload.terms}')`).then(function (res) {

                        if (res[0].affectedRows > 0) {
                            return true
                        }
                    })
                    if (insert_user) {
                        console.log(1)
                        var transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                                user: config.EMAIL,
                                pass: config.MAIL_PASS
                            }
                        });

                        var mailOptions = {
                            from: config.EMAIL,
                            to: payload.email,
                            subject: 'Verification Mail From Aristostech',
                            text: `${config.DOMINE_URL}/validationmail?username=${payload.username}&email=${payload.email}`
                        };

                        let mail_checker = await transporter.sendMail(mailOptions)

                        if (mail_checker) {
                            let output = {
                                'statuscode': 200,
                                'message': mail_checker

                            }
                            return output
                        }

                    }
                } else {

                    let error = {
                        "code": 500,
                        "ErrorMessage": "Server error"
                    }
                    return error

                }
            } else {
                let find_user = await db.raw(`select * from aristostech_users where username = '${payload.username}' OR email = '${payload.email}'`).then(function (res) {

                    if (res[0].length > 0) {
                        return false
                    } else {
                        return true
                    }
                })

                if (find_user) {
                    let insert_user = await db.raw(`INSERT INTO aristostech_users ( username, email, validate, business_name,business_nature,terms ) VALUES('${payload.username}', '${payload.email}', 0, '${payload.business_name}','${payload.business_nature}','${payload.terms}')`).then(function (res) {
                        if (res[0].affectedRows > 0) {
                            return true
                        }
                    })

                    if (insert_user) {
                        var transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                                user: config.EMAIL,
                                pass: config.MAIL_PASS
                            }
                        });

                        var mailOptions = {
                            from: config.EMAIL,
                            to: payload.email,
                            subject: 'Verification Mail From Aristostech',
                            text: `${config.DOMINE_URL}/validationmail?username=${payload.username}&email=${payload.email}`
                        };

                        let mail_checker = await transporter.sendMail(mailOptions)
                        if (mail_checker) {
                            let output = {
                                'statuscode': 200,
                                'message': mail_checker

                            }
                            return output
                        }
                    }
                } else {
                    const output = {
                        'statuscode': 200,
                        'message': 'User Already Exist',
                    }
                    return output
                }
            }
        } catch (err) {
            let err_function = new Error(err)
            if (err_function.name === 'Error') {
                let error = {
                    "code": 500,
                    "ErrorMessage": err_function.message
                }
                return error
            }
        }
    }
    async signupmail(query) {
        try {
            let find_user = await db.raw(`select * from aristostech_users where username = '${query.username}' AND email = '${query.email}' AND validate = 0`).then(function (res) {
                return res[0]
            })
            if (find_user.length > 0) {
                var dateString = find_user[0].timestamp
                var myDate = new Date(dateString);
                var result = myDate.getTime();
                var millisecond = new Date().getTime() - result

                const minutes = Math.floor(millisecond / 60000);
                if (minutes > 3) {
                    let output = {
                        'statuscode': 200,
                        'message': "Verification Link Expired"

                    }
                    return output
                } else {
                    let output = {
                        'statuscode': 200,
                        'message': "success",
                        'data': find_user
                    }
                    return output
                }
            } else {
                let find_user_ = await db.raw(`select * from aristostech_users where username = '${query.username}' AND email = '${query.email}' AND validate = 1`).then(function (res) {
                    return res[0]
                })
                if (find_user_.length > 0) {
                    let output = {
                        'statuscode': 200,
                        'message': "User Already exist",


                    }
                    return output
                }
            }
            let output = {
                'code': 400,
                'message': "Not found",


            }
            return output
        } catch (err) {
            let err_function = new Error(err)
            if (err_function.name === 'Error') {
                let error = {
                    "code": 500,
                    "ErrorMessage": err_function.message
                }
                return error
            }
        }
    }
    async createPassword(payload) {
        try {
            const passphrase = config.ENCRYPT_KEY;
            let encrypt = CryptoJS.AES.encrypt(payload.password, passphrase).toString();
            let find_user = await db.raw(`select * from aristostech_users where email = '${payload.email}' AND validate = 0`).then(function (res) {
                if (res[0].length > 0) {
                    return true
                } else {
                    false
                }
            })
            if (find_user) {


                let account_created = await createUserWithEmailAndPassword(auth, payload.email, payload.password)
                if (account_created) {
                    let update_user_detail = await db.raw(`UPDATE aristostech_users SET validate='1',password="${encrypt}",uid='${account_created.user.uid}' WHERE email="${account_created.user.email}"`).then(function (res) {
                        if (res[0].affectedRows > 0) {
                            return true
                        }
                    })
                    if (update_user_detail) {
                        const output = {
                            'statuscode': 200,
                            'message': 'success',
                        }
                        return output
                    } else {
                        const output = {
                            'code': 500,
                            'message': update_user_detail,
                        }
                        return output
                    }

                }
            } else {
                const output = {
                    'code': 400,
                    'message': "invalid data",
                }
                return output
            }
        } catch (err) {
            let err_function = new Error(err)
            if (err_function.name === 'Error') {
                let error = {
                    "code": 500,
                    "ErrorMessage": err_function.message
                }
                return error
            }
        }
    }
    async signinuser(payload) {
        try {
            let signin = await signInWithEmailAndPassword(auth, payload.email, payload.password)
            if (signin) {
                const output = {
                    'statuscode': 200,
                    'message': 'success',
                }
                return output
            }
        } catch (err) {
            let err_function = new Error(err)
            if (err_function.name === 'Error') {
                let error = {
                    "code": 500,
                    "ErrorMessage": err_function.message
                }
                return error
            }
        }

    }
    async forget_password_mail(payload) {
        try {


            let find_user = await db.raw(`select * from aristostech_users where email = '${payload.email}'`).then(function (res) {
                return res[0]
            })
            if (find_user.length > 0) {
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: config.EMAIL,
                        pass: config.MAIL_PASS
                    }
                });

                var mailOptions = {
                    from: config.EMAIL,
                    to: payload.email,
                    subject: 'Password Reset Mail From Aristostech',
                    text: `${config.DOMINE_URL}/resetpassword?username=${find_user[0].username}&email=${payload.email}`
                };

                let mail_checker = await transporter.sendMail(mailOptions)
                if (mail_checker) {
                    let update_reset_timestamp = await db.raw(`UPDATE aristostech_users SET password_timestamp='${new Date().getTime()}' WHERE email="${payload.email}"`).then(function (res) {
                        if (res[0].affectedRows > 0) {
                            return true
                        }
                    })
                    if (update_reset_timestamp) {
                        const output = {
                            'statuscode': 200,
                            'message': 'success',
                            'data': mail_checker
                        }
                        return output
                    }
                }

            } else {
                const output = {
                    'code': 400,
                    'message': 'invalid data',

                }
                return output
            }
        } catch (err) {
            let err_function = new Error(err)
            if (err_function.name === 'Error') {
                let error = {
                    "code": 500,
                    "ErrorMessage": err_function.message
                }
                return error
            }
        }
    }
    async forget_password_validate(query) {
        try {
            let find_user = await db.raw(`select * from aristostech_users where username = '${query.username}' AND email = '${query.email}' AND validate = 1`).then(function (res) {
                return res[0]
            })
            if (find_user.length > 0) {
                var result = find_user[0].timestamp
                var millisecond = result - new Date().getTime()
                const minutes = Math.floor(millisecond / 60000);
                if (minutes > 3) {
                    let output = {
                        'statuscode': 200,
                        'message': "Verification Link Expired"

                    }
                    return output
                } else {
                    let output = {
                        'statuscode': 200,
                        'message': "success",
                        'data': find_user

                    }
                    return output
                }
            }
            let output = {
                'code': 400,
                'message': "Not found",


            }
            return output
        } catch (err) {
            let err_function = new Error(err)
            if (err_function.name === 'Error') {
                let error = {
                    "code": 500,
                    "ErrorMessage": err_function.message
                }
                return error
            }
        }
    }
    async password_reset(payload) {
        try {
            console.log(payload)
            let find_user = await db.raw(`select * from aristostech_users where  email = '${payload.email}'`).then(function (res) {
                return res[0]
            })
            const passphrase = config.ENCRYPT_KEY;
            let encrypt = CryptoJS.AES.encrypt(payload.password, passphrase).toString();
            const bytes = CryptoJS.AES.decrypt(find_user[0].password, passphrase);
            const originalText = bytes.toString(CryptoJS.enc.Utf8);
            if (find_user) {
                console.log("PPPPPPPPPPPPPPPPPPPPP")
                let signin = await signInWithEmailAndPassword(auth, payload.email, originalText)
                let token = await signin.user.getIdToken()
                signin.user.uid
                if (signin.user.uid === find_user[0].uid) {
                    let change_password = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${authfirebase.apiKey}`, { "idToken": token, "password": payload.password, "returnSecureToken": true }
                    )

                    if (change_password) {
                        let update_user_detail = await db.raw(`UPDATE aristostech_users SET password='${encrypt}' WHERE email="${payload.email}"`).then(function (res) {
                            if (res[0].affectedRows > 0) {
                                return true
                            }
                        })
                        if (update_user_detail) {
                            const output = {
                                'statuscode': 200,
                                'message': 'success',
                            }
                            return output
                        }
                    }

                }

            }

        } catch (err) {

            let err_function = new Error(err)
            if (err_function.name === 'Error') {
                let error = {
                    "code": 500,
                    "ErrorMessage": err_function.message
                }
                return error
            }
        }
    }
}
module.exports = auth_services