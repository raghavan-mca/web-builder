
let db = require('../configurations/dbConnection')
let config = require('../configurations/config')
const axios = require('axios')
var fs = require('fs');
class auth_services {
    async create_table_service(payload) {
        try {
            let find_template = await db.raw(`select * from aristostech_template where template_name = '${payload.template_name}'`).then(function (res) {
                if (res[0].length > 0) {
                    return true
                } else {
                    return false
                }

            });
            if (find_template) {
                let output = {
                    'statuscode': 200,
                    'message': 'table_already_exit'

                }
                return output
            } else {
                console.log(payload)
                let sql = `CREATE TABLE ${config.DB}.custom_${payload.template_name}(id INT NOT NULL AUTO_INCREMENT,PRIMARY KEY (id),uid VARCHAR(100),flags VARCHAR(100) NOT NULL DEFAULT 'false'`
                let build_sql = ""
                for (let i = 0; i < payload.field.length; i++) {
                    const element = payload.field[i];
                    if (element.type === "VARCHAR") {
                        build_sql += `,${element.model} ${element.type}(${element.length})`
                    } else {
                        build_sql += `,${element.model} ${element.type}`
                    }

                }
                sql += build_sql + `)`
                let create_table = await db.raw(sql).then(function (res) {
                    console.log("res", res)
                    if (res.length > 0) {
                        return true
                    } else {
                        return false
                    }

                });
                if (create_table) {
                    let insert_table_name = await db.raw(`INSERT INTO aristostech_template (template_name ) VALUES('${payload.template_name}')`).then(function (res) {
                        if (res[0].affectedRows > 0) {
                            return true
                        }
                    })
                    if (insert_table_name) {
                        let output = {
                            'statuscode': 200,
                            'message': 'table_created'

                        }
                        return output
                    }
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
    async create_website_service(payload) {
        try {
            let find_templet = await db.raw(`select * from custom_${payload.template_name} where uid = '${payload.uid}'`).then(function (res) {
                if (res[0].length > 0) {
                    return true
                } else {
                    return false
                }
            });
            if (find_templet) {
                let output = {
                    'statuscode': 200,
                    'message': 'already_exit'

                }
                return output
            } else {
                let uid = {
                    name: "uid",
                    value: payload.uid
                }
                payload.values.push(uid)
                let sql = `INSERT INTO custom_${payload.template_name}`
                let model = ""
                let values = ""
                for (let i = 0; i < payload.values.length; i++) {
                    const element = payload.values[i];
                    if (i === 0) {
                        model += `(${element.name}`
                        values += `('${element.value}'`
                    } else {
                        model += `,${element.name}`
                        values += `,'${element.value}'`
                    }
                }
                model += `)`
                values += `)`
                sql += model
                sql += `VALUES ${values}`
                let insert_table_name = await db.raw(sql).then(function (res) {
                    if (res[0].affectedRows > 0) {
                        return true
                    }
                })

                if (insert_table_name) {
                    let find_templet = await db.raw(`select * from aristostech_domain_picker `).then(function (res) {
                        return res[0]

                    });
                    let output = {
                        'statuscode': 200,
                        'message': 'success',
                        'domain': find_templet

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
    async domain_service(payload) {
        try {
            let find_user_ = await db.raw(`select * from aristostech_users where uid = '${payload.uid}'`).then(function (res) {
                return res[0]
            });
            if (find_user_[0].template_count <= find_user_[0].template_limit) {
                let insert_domain = await db.raw(`INSERT INTO aristostech_domain_picker (template_name,uid,domain_name ) VALUES('${payload.template_name}','${payload.uid}','${payload.domain_name}')`).then(function (res) {
                    if (res[0].affectedRows > 0) {
                        return true
                    }
                })
                if (insert_domain) {
                    let find_template = await db.raw(`select * from aristostech_template where template_name = '${payload.template_name}'`).then(function (res) {
                        return res[0]
                    });
                    // console.log(find_template)
                    if (find_template.length > 0) {
                        let update_template = await db.raw(`UPDATE aristostech_template SET count='${find_template[0].count += 1}' WHERE template_name="${payload.template_name}"`).then(function (res) {
                            if (res[0].affectedRows > 0) {
                                return true
                            }
                        })
                        if (update_template) {
                            let update_custom_table = await db.raw(`UPDATE custom_${payload.template_name} SET flags='true' WHERE uid="${payload.uid}"`).then(function (res) {
                                if (res[0].affectedRows > 0) {
                                    return true
                                }
                            })
                            if (update_custom_table) {
                                let find_user = await db.raw(`select * from aristostech_users where uid = '${payload.uid}'`).then(function (res) {
                                    return res[0]
                                });
                                if (find_user.length > 0) {
                                    if (find_user[0].template_count <= find_user[0].template_limit) {
                                        let update_user = await db.raw(`UPDATE aristostech_users SET template_count='${find_user[0].template_count += 1}' WHERE uid="${payload.uid}"`).then(function (res) {
                                            if (res[0].affectedRows > 0) {
                                                return true
                                            }
                                        })
                                        if (update_user) {
                                            let output = {
                                                'statuscode': 200,
                                                'message': 'success'

                                            }
                                            return output
                                        }
                                    } else {

                                        let output = {
                                            'statuscode': 200,
                                            'message': 'limit exit'

                                        }
                                        return output

                                    }

                                }
                            }

                        }
                    }
                }
            } else {
                let output = {
                    'statuscode': 200,
                    'message': 'limit exit'

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
    async imageupload(payload) {
        try {
            console.log(payload.truncated)
            if (payload.truncated) {
                var filePath = payload.tempFilePath;
                fs.unlinkSync(filePath);
                let output = {
                    'statuscode': 400,

                }
                return output
            } else {
                let a = payload.name.split(".")
                if (a[a.length - 1] === "jpg" || a[a.length - 1] === "jpeg") {
                    let output = {
                        'statuscode': 200,
                        'message': payload

                    }
                    return output
                } else {
                    let output = {
                        'statuscode': 400,
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
    async loadDomain(params) {
        try {
            console.log(`select * from aristostech_domain_picker WHERE ${params.domain_name}`)
            let find_templet = await db.raw(`select * from aristostech_domain_picker WHERE domain_name = "${params.domain_name}"`).then(function (res) {
                return res[0]

            });
            console.log(`select * from custom_${find_templet[0].template_name} WHERE uid = "${find_templet[0].uid}"`)
            if (find_templet.length > 0) {
                let find_templet_data = await db.raw(`select * from custom_${find_templet[0].template_name} WHERE uid = "${find_templet[0].uid}"`).then(function (res) {
                    return res[0]

                });
                if (find_templet_data.length > 0) {
                    find_templet_data[0]["api"]=config.DOMINE_URL+`/${find_templet[0].template_name}/${find_templet[0].uid}`
                    let output = {
                        'statuscode': 200,
                        'message': 'success',
                        'data':find_templet_data[0]

                    }
                    return output
                }else{
                   
                    return find_templet_data
                }
            } else {
                let output = {
                    'statuscode': 400,
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


}
module.exports = auth_services