
let db = require('../configurations/dbConnection')

class company_listing_services {
    async fetchcompanylisting(query) {
        console.log(query)
        try {
            const fetch_company = await db.raw('SELECT * from tutorials').then(function (resp) {
                return resp[0]
            });
            return fetch_company

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

    async createcompanylisting(payload) {
        try {
            const create_company = await db.raw(`INSERT INTO tutorials(title, description, published) VALUES (${payload.title},${payload.description},${payload.published})`).then(function (resp) {
                return resp[0]
            });
            if (create_company) {
                const output = {
                    'statuscode': 200,
                    'message': 'success',
                }
                return output
            }
        } catch (err) {
            console.log(err)
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

    async updatecompanylisting(payload, params) {

        try {
           
            let sql =`UPDATE tutorials SET title='${payload.title}',description='${payload.description}',published='${payload.published}' WHERE title='${params.id}'`
           
            const update_company = await db.raw(sql).then(function (resp) {
                
                return resp[0]
            });
            return update_company
        } catch (err) {
            let err_function = new Error(err)
            let err_message = err_function.message
            let err_message_arr = err_message.split(':')

            if (err_message_arr[0] === 'ReferenceError') {
                let error = {
                    "code": 500,
                    "ErrorMessage": err_message
                }
                return error
            }
            if (err_message_arr[0] === 'MongoServerError') {
                let error = {
                    "code": 11000,
                    "ErrorMessage": err_message
                }
                return error
            }
            return err
        }
    }
    async deletecompanylisting(params) {
        try {
            const delete_company = await db.raw(`DELETE FROM tutorials WHERE title=${params.id};`).then(function (resp) {
                return resp[0]
            });
            return delete_company
        } catch (err) {
            let err_function = new Error(err)
            let err_message = err_function.message
            let err_message_arr = err_message.split(':')

            if (err_message_arr[0] === 'ReferenceError') {
                let error = {
                    "code": 500,
                    "ErrorMessage": err_message
                }
                return error
            }
            if (err_message_arr[0] === 'MongoServerError') {
                let error = {
                    "code": 11000,
                    "ErrorMessage": err_message
                }
                return error
            }
            return err
        }
    }
    
    
}
module.exports = company_listing_services