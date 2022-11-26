const user_store_service = require('../../services/user-store-service')
const user_store_service_ = new user_store_service()
const apiError = require('../../error/api-error')


class fetchUserTemplate {
    async fetchtemplate(req, res, next) {
        let query = req.query
        if (!query) {
            next(apiError.badRequest('error'))
            return

        }
        else if (query) {
            const fetchUserData = await user_store_service_.getUserTemplate(query)
            if (fetchUserData.statuscode === 500) {
                next(apiError.internal({
                    'statuscode': 500,
                    'errormessage': fetchUserData.errormessage,
                    'message': 'badImplementation'

                }))
                return

            } else if (fetchUserData.statuscode === 400) {
                next(apiError.badRequest({
                    'statuscode': 400,
                    'errormessage': 'invalid_data',
                    'message': 'badRequest'


                }))
                return
            } else if (fetchUserData.length === 0) {
                return res.status(200).send({
                    'statuscode': 204,
                    'data': fetchUserData,
                    'message': 'success'
                })
            }
            else {
                return res.status(200).send({
                    'statuscode': 200,
                    'data': fetchUserData,
                    'message': 'success'
                })
            }
        }
    }
}

module.exports = fetchUserTemplate