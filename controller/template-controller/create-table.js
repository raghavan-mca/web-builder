const template_service = require('../../services/template-services')
const template_service_ = new template_service()
const apiError = require('../../error/api-error')


class templateTableCreate {
    async TableCreate(req, res, next) {
        let payload = req.body

        if (!payload) {
            next(apiError.badRequest('error'))
            return

        }
        else if (payload) {
            const newTable = await template_service_.create_table_service(payload)
            if (newTable.statuscode === 500) {
                next(apiError.internal({
                    'statuscode': 500,
                    'errormessage': newTable.errormessage,
                    'message': 'badImplementation'

                }))
                return

            } else if (newTable.statuscode === 400) {
                next(apiError.badRequest({
                    'statuscode': 400,
                    'errormessage': 'invalid_data',
                    'message': 'badRequest'


                }))
                return
            } else if (newTable.length === 0) {
                return res.status(200).send({
                    'statuscode': 204,
                    'data': newTable,
                    'message': 'success'
                })
            }
            else {
                return res.status(200).send({
                    'statuscode': 200,
                    'data': newTable,
                    'message': 'success'
                })
            }
        }
    }
}

module.exports = templateTableCreate