const CryptoJS = require('crypto-js');
let db = require('../configurations/dbConnection')
let config = require('../configurations/config')
const axios = require('axios')
var nodemailer = require('nodemailer');
let authfirebase = require('../configurations/firebase')
const { initializeApp } = require("firebase/app");
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } = require("firebase/auth");
const { date } = require('joi');
initializeApp(authfirebase);
const auth = getAuth();



class auth_services {
    async signup(payload) {
        try {
            let timestamp=new Date().getTime().toString()
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
                    let insert_user = await db.raw(`INSERT INTO aristostech_users (password_timestamp, username, email, validate, business_name,business_nature,terms ) VALUES('${timestamp}','${payload.username}', '${payload.email}', 0, '${payload.business_name}','${payload.business_nature}','${payload.terms}')`).then(function (res) {

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
                            text: `${config.DOMINE_URL}/validationmail?username=${payload.username}&email=${payload.email}&password_timestamp=${timestamp}
                            `
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
                        "statuscode": 500,
                        "errormessage": "Server error"
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
                    let insert_user = await db.raw(`INSERT INTO aristostech_users (password_timestamp, username, email, validate, business_name,business_nature,terms ) VALUES('${timestamp}','${payload.username}', '${payload.email}', 0, '${payload.business_name}','${payload.business_nature}','${payload.terms}')`).then(function (res) {
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
                            text: `${config.DOMINE_URL}/validationmail?username=${payload.username}&email=${payload.email}&password_timestamp=${timestamp}
                            `
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
                        'message': 'user_already_exist',
                    }
                    return output
                }
            }
        } catch (err) {
            console.log(err)
            let err_function = new Error(err)
            if (err_function.name === 'Error') {
                let error = {
                    "statuscode": 500,
                    "errormessage": err_function.message
                }
                return error
            }
        }
    }
    async signupmail(query) {
        try {
            let find_user = await db.raw(`select * from aristostech_users where username = '${query.username}' AND email = '${query.email}' AND validate = 0 AND password_timestamp=${query.password_timestamp}`).then(function (res) {
                return res[0]
            })
            if (find_user.length > 0) {
                var dateString = find_user[0].timestamp
                var myDate = new Date(dateString);
                var x = new Date();
                var result = myDate.getTime();
                var millisecond = new Date().getTime() - result

                const minutes = Math.floor(millisecond / 60000);
                console.log('min'+minutes);

                if (false) {
                    let output = {
                        'statuscode': 200,
                        'message': "verification_link_expired",
                        'min': minutes,
                        'ms': millisecond
                    }
                    return output
                } else {
                    let output = {
                        'statuscode': 200,
                        'message': "success",
                        'data': find_user,
                        'min': minutes,
                        'ms': millisecond,
                        'x': x,
                        'mdate': myDate,
                        'db_ds': dateString,
                        'res': result
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
                        'message': "user_already_exist",


                    }
                    return output
                }
            }
            let output = {
                'statuscode': 400,
                'message': "Not found",


            }
            return output
        } catch (err) {
            let err_function = new Error(err)
            if (err_function.name === 'Error') {
                let error = {
                    "statuscode": 500,
                    "errormessage": err_function.message
                }
                return error
            }
        }
    }
    async createPassword(payload) {
        try {
            let timestamp=new Date().getTime().toString()
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
                    let update_user_detail = await db.raw(`UPDATE aristostech_users SET password_timestamp='${timestamp.toString()}', validate='1',password="${encrypt}",uid='${account_created.user.uid}' WHERE email="${account_created.user.email}"`).then(function (res) {
                        if (res[0].affectedRows > 0) {
                            return true
                        }
                    })
                    console.log(update_user_detail)
                    if (update_user_detail) {
                        const output = {
                            'statuscode': 200,
                            'message': 'success',
                        }
                        return output
                    } else {
                        const output = {
                            'statuscode': 500,
                            'message': update_user_detail,
                        }
                        return output
                    }

                }
            } else {
                const output = {
                    'statuscode': 400,
                    'message': "invalid_data",
                }
                return output
            }
        } catch (err) {
            console.log(err)
            let err_function = new Error(err)
            if (err_function.name === 'Error') {
                let error = {
                    "statuscode": 500,
                    "errormessage": err_function.message
                }
                return error
            }
        }
    }
    async signinuser(payload) {
        try {
            let signin = await signInWithEmailAndPassword(auth, payload.email, payload.password)
            // console.log(signin.user.uid);
            let user_data =await db.raw(`select * from aristostech_users where uid = '${signin.user.uid}'`).then(function (res) {
                return res[0]
            });
            let obj = {
                "id": user_data[0].id,
                "username": user_data[0].username,
                "email": user_data[0].email,
                "uid": user_data[0].uid,
                "business_name": user_data[0].business_name,
                "business_nature": user_data[0].business_nature,
                "template_limit": user_data[0].template_limit,
                "template_count": user_data[0].template_count
            }
            let arr = [];
            arr.push(obj);
       
            if (arr.length>0) {
                const output = {
                    'statuscode': 200,
                    'message': 'success',
                    'data':arr
                }
                return output
            }
        } catch (err) {
            let err_function = new Error(err)
            if (err_function.name === 'Error') {
                let error = {
                    "statuscode": 500,
                    "errormessage": err_function.message
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
                let timestamp = new Date().getTime()
                var mailOptions = {
                    from: config.EMAIL,
                    to: payload.email,
                    subject: 'Password Reset Mail From Aristostech',
                    text: `${config.DOMINE_URL}/resetpassword?username=${find_user[0].username}&email=${payload.email}&password_timestamp=${timestamp}`
                };

                let mail_checker = await transporter.sendMail(mailOptions)
                if (mail_checker) {
                    let update_reset_timestamp = await db.raw(`UPDATE aristostech_users SET password_timestamp='${timestamp.toString()}' WHERE email="${payload.email}"`).then(function (res) {
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
                    'statuscode': 400,
                    'message': 'invalid_data',

                }
                return output
            }
        } catch (err) {
            let err_function = new Error(err)
            if (err_function.name === 'Error') {
                let error = {
                    "statuscode": 500,
                    "errormessage": err_function.message
                }
                return error
            }
        }
    }
    async forget_password_validate(query) {
        try {
            let find_user = await db.raw(`select * from aristostech_users where username = '${query.username}' AND email = '${query.email}' AND validate = 1 AND password_timestamp=${query.password_timestamp}`).then(function (res) {
                return res[0]
            })
            if (find_user.length > 0) {
                var result = find_user[0].password_timestamp
                var millisecond = new Date().getTime() - result
                const minutes = Math.floor(millisecond / 60000);
                if (false) {
                    let output = {
                        'statuscode': 200,
                        'message': "verification_link_expired"

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
                let output = {
                    'statuscode': 200,
                    'message': "verification_link_expired"

                }
                return output
            }
            // let output = {
            //     'statuscode': 400,
            //     'message': "Not found",


            // }
            // return output
        } catch (err) {
            let err_function = new Error(err)
            if (err_function.name === 'Error') {
                let error = {
                    "statuscode": 500,
                    "errormessage": err_function.message
                }
                return error
            }
        }
    }
    async password_reset(payload) {
        try {
            let find_user = await db.raw(`select * from aristostech_users where  email = '${payload.email}'`).then(function (res) {
                return res[0]
            })
            const passphrase = config.ENCRYPT_KEY;
            let encrypt = CryptoJS.AES.encrypt(payload.password, passphrase).toString();
            const bytes = CryptoJS.AES.decrypt(find_user[0].password, passphrase);
            const originalText = bytes.toString(CryptoJS.enc.Utf8);
            if (find_user) {
                let signin = await signInWithEmailAndPassword(auth, payload.email, originalText)
                let token = await signin.user.getIdToken()
                signin.user.uid
                if (signin.user.uid === find_user[0].uid) {
                    let change_password = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${authfirebase.apiKey}`, { "idToken": token, "password": payload.password, "returnSecureToken": true }
                    )

                    if (change_password) {
                        let timestamp = new Date().getTime()

                        let update_user_detail = await db.raw(`UPDATE aristostech_users SET password='${encrypt}',password_timestamp='${timestamp.toString()}' WHERE email="${payload.email}"`).then(function (res) {

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
                    "statuscode": 500,
                    "errormessage": err_function.message
                }
                return error
            }
        }
    }
    async getuser(query) {
        try {
            let user_data = await db.raw(`select * from aristostech_users where  uid = '${query.uid}'`).then(function (res) {
                return res[0]
            })
            if (user_data.length > 0) {
                let obj = {
                    "id": user_data[0].id,
                    "username": user_data[0].username,
                    "email": user_data[0].email,
                    "uid": user_data[0].uid,
                    "business_name": user_data[0].business_name,
                    "business_nature": user_data[0].business_nature,
                    "template_limit": user_data[0].template_limit,
                    "template_count": user_data[0].template_count
                }
               
                    const output = {
                        'statuscode': 200,
                        'message': 'success',
                        'data':[obj]
                    }
                    return output
                }
                
            else{
                return user_data
            }

        } catch (err) {
            let err_function = new Error(err)
            if (err_function.name === 'Error') {
                let error = {
                    "statuscode": 500,
                    "errormessage": err_function.message
                }
                return error
            }
        }
    }
}
module.exports = auth_services
