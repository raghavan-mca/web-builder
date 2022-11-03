const signup_service = require('../../services/auth-services')
const signup_service_ = new signup_service()
const apiError = require('../../error/api-error')


class getuser {
    async user(req, res, next) {
        let query = req.query

        if (!query) {
            next(apiError.badRequest('error'))
            return

        }
        else if (query) {
            const getuser_data = await signup_service_.getuser(query)
            if (getuser_data.statuscode === 500) {
                next(apiError.internal({
                    'statuscode': 500,
                    'errormessage': getuser_data.errormessage,
                    'message': 'badImplementation'

                }))
                return

            } else if (getuser_data.statuscode === 400) {
                next(apiError.badRequest({
                    'statuscode': 400,
                    'errormessage': 'invalid_data',
                    'message': 'badRequest'


                }))
                return
            } else if (getuser_data.length === 0) {
                return res.status(200).send({
                    'statuscode': 204,
                    'data': getuser_data,
                    'message': 'success'
                })
            }
            else {
                return res.status(200).send({
                    'statuscode': 200,
                    'data': getuser_data,
                    'message': 'success'
                })
            }
        }
    }
}

module.exports = getuser