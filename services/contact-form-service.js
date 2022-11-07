
let db = require('../configurations/dbConnection')

class contact_form_services {
    async createContact(payload, params) {
        try {
            //    console.log(payload,params)
            let find_templet_data = await db.raw(`select * from custom_${params.template_name} WHERE uid = "${params.uid}"`).then(function (res) {
                return res[0]

            });

            if (find_templet_data.length > 0) {

                let insert_contact = await db.raw(`INSERT INTO aristostech_contact_form(template_name,uid,first_name ,phone_number,message,email,user_template_name) VALUES('${params.template_name}','${params.uid}','${payload.first_name}','${payload.phone_number}','${payload.message}','${payload.email}','${find_templet_data[0].user_template_name}')`).then(function (res) {
                    if (res[0].affectedRows > 0) {
                        return true
                    }
                })
                if (insert_contact) {
                    let output = {
                        'statuscode': 200,
                        'message': 'success',


                    }
                    return output
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
    async fetchContact(query) {
        try {
            let condition = `uid = "${query.uid}"`
            if (query.user_template_name !== "" && query.user_template_name !== undefined) {
                condition += `AND user_template_name="${query.user_template_name}"`
            }
            console.log(`select * from aristostech_contact_form WHERE ${condition}`)
            let find_templet_data = await db.raw(`select * from aristostech_contact_form WHERE ${condition}`).then(function (res) {
                return res[0]

            });
            if (find_templet_data.length > 0) {
                let get_unique_table = await db.raw(`SELECT user_template_name FROM aristostech_contact_form GROUP BY user_template_name`).then(
                    function (res) {
                        return res[0]
                    }
                )
                if (get_unique_table) {
                    let output = {
                        'statuscode': 200,
                        'message': 'success',
                        'data': {
                            "template_name": get_unique_table,
                            "filter_data": find_templet_data
                        }


                    }
                    return output
                }

            } else {
                return find_templet_data
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
    async deleteContact(payload) {
        try {
            var count = 0
            let skip = []
            for (let i = 0; i < payload.ids.length; i++) {
                const element = payload.ids[i];
                // console.log(`delete from aristostech_contact_form WHERE id = ${element}`)
                let find_templet_data = await db.raw(`delete from aristostech_contact_form WHERE id = ${element}`).then(function (res) {
                    if (res[0].affectedRows === 1) {
                        return true
                    } else {
                        return element
                    }


                });
                console.log(find_templet_data)
                if (find_templet_data === true) {
                    count += 1
                } else {
                    skip.push(find_templet_data)
                }
            }

            let output = [{
                deleteCount: count,
                skip: skip,
                skipCount: skip.length

            }]
            console.log(output)
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
}
module.exports = contact_form_services