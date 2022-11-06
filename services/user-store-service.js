let db = require('../configurations/dbConnection')
let config = require('../configurations/config')




class auth_services {
    async getUserTemplate(query) {
        try {
            let find_user_templet = await db.raw(`select template_name from aristostech_template_count where uid='${query.uid}' `).then(function (res) {
                return res[0]

            });
            if (find_user_templet.length > 0) {
                let data = []
                for (let i = 0; i < find_user_templet.length; i++) {
                    const element = find_user_templet[i];
                    let find_user_templet_data = await db.raw(`select * from custom_${element.template_name} where uid='${query.uid}' `).then(function (res) {
                        return res[0]

                    });
                    let find_domain = await db.raw(`select * from aristostech_domain_picker where template_name='${element.template_name}' `).then(function (res) {
                        console.log(res[0]);
                        return res[0]

                    });
                    find_user_templet_data[0][`template_name`] = element.template_name
                    console.log(find_domain[0]);
                    if(find_domain.length > 0) {
                        find_user_templet_data[0][`domain`] = find_domain[0].domain_name
                    }
                    else {
                        find_user_templet_data[0][`domain`] = 'No_Domain'
                    }
                    data.push(find_user_templet_data[0])
                }
                if (data.length > 0) {
                    let output = {
                        'statuscode': 200,
                        'message': 'success',
                        'domain': data

                    }
                    return output
                } else {
                    return data
                }
            } else {
                return find_user_templet
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
    async UpdateUserTemplate(payload) {
        try {
            console.log(payload)
            let sql = `UPDATE custom_${payload.template_name} SET`
            let values = ""
            let index = 0
            for (let i = 0; i < payload.values.length; i++) {
                const element = payload.values[i];
                if (i === 0) {

                    values += ` ${element.name} = '${element.value}'`
                } else {
                    values += ` , ${element.name} = '${element.value}'`
                }
                if (element.name === "user_template_name") {
                    index = i
                }
            }

            values += `WHERE uid= '${payload.uid}'`
            sql += `${values}`
            let update_website = await db.raw(sql).then(function (res) {
                if (res[0].affectedRows > 0) {
                    return true
                }
            })
            if (index > 0) {
                let update_contact_form = await db.raw(`UPDATE aristostech_contact_form SET user_template_name = '${payload.values[index].value}' WHERE uid= '${payload.uid}'`)
            }
            if (update_website) {
                let output = {
                    'statuscode': 200,
                    'message': 'success',

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
    async DeleteUserTemplate(params) {
        try {
            let delete_website = await db.raw(`DELETE FROM custom_${params.template_name} WHERE uid='${params.uid}'`).then(function (res) {
                if (res[0].affectedRows > 0) {
                    return true
                }
            })
            if (delete_website) {
                let delete_website_count = await db.raw(`DELETE FROM aristostech_template_count WHERE uid='${params.uid}' AND template_name='${params.template_name}'`).then(function (res) {
                    if (res[0].affectedRows > 0) {
                        return true
                    }
                })
                 let delete_website_contact = await db.raw(`DELETE FROM aristostech_contact_form WHERE uid='${params.uid}' AND template_name='${params.template_name}'`).then(function (res) {
                        if (res[0].affectedRows > 0) {
                            return true
                        }
                    })
                if (delete_website_count) {
                    let delete_website_domain = await db.raw(`DELETE FROM aristostech_domain_picker WHERE uid='${params.uid}' AND template_name='${params.template_name}'`).then(function (res) {
                        if (res[0].affectedRows > 0) {
                            return true
                        }
                    })
                    if(delete_website_domain)
                    {

                    let select_user = await db.raw(`SELECT template_count FROM aristostech_users WHERE uid='${params.uid}'`).then(function (res) {
                            return res[0]
                    })
                    console.log(select_user[0].template_count,`UPDATE aristostech_users SET template_count=${select_user[0].template_count - 1}  WHERE uid='${params.uid}'`)
                    let update_user = await db.raw(`UPDATE aristostech_users SET template_count= '${select_user[0].template_count - 1}' WHERE uid='${params.uid}'`).then(function (res) {
                        if (res[0].affectedRows > 0) {
                            return true
                        }
                    })
                    if (update_user) {
                        let output = {
                            'statuscode': 200,
                            'message': 'success',

                        }
                        return output
                    }
                    }
                }
            }else{
                return {statuscode:500}
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