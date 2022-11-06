const contact_service = require('../../services/contact-form-service')
const contact_service_ = new contact_service()
const apiError = require('../../error/api-error')


class fetchContactForm {
    async fetchForm(req, res, next) {
        let query = req.query
        

        if (!query) {
            next(apiError.badRequest('error'))
            return

        }
        else if (query) {
            const fetchForm = await contact_service_.fetchContact(query)
            if (fetchForm.statuscode === 500) {
                next(apiError.internal({
                    'statuscode': 500,
                    'errormessage': fetchForm.errormessage,
                    'message': 'badImplementation'

                }))
                return

            } else if (fetchForm.statuscode === 400) {
                next(apiError.badRequest({
                    'statuscode': 400,
                    'errormessage': 'invalid_data',
                    'message': 'badRequest'


                }))
                return
            } else if (fetchForm.length === 0) {
                return res.status(200).send({
                    'statuscode': 204,
                    'data': fetchForm,
                    'message': 'success'
                })
            }
            else {
                return res.status(200).send({
                    'statuscode': 200,
                    'data': fetchForm,
                    'message': 'success'
                })
            }
        }
    }
}

module.exports = fetchContactForm