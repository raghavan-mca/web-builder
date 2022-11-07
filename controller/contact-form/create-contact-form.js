const contact_service = require('../../services/contact-form-service')
const contact_service_ = new contact_service()
const apiError = require('../../error/api-error')


class createContactForm {
    async createForm(req, res, next) {
        let payload = req.body
        let params = req.params

        if (!payload && !params) {
            next(apiError.badRequest('error'))
            return

        }
        else if (payload && params) {
            const createForm = await contact_service_.createContact(payload,params)
            if (createForm.statuscode === 500) {
                next(apiError.internal({
                    'statuscode': 500,
                    'errormessage': createForm.errormessage,
                    'message': 'badImplementation'

                }))
                return

            } else if (createForm.statuscode === 400) {
                next(apiError.badRequest({
                    'statuscode': 400,
                    'errormessage': 'invalid_data',
                    'message': 'badRequest'


                }))
                return
            } else if (createForm.length === 0) {
                return res.status(200).send({
                    'statuscode': 204,
                    'data': createForm,
                    'message': 'success'
                })
            }
            else {
                return res.status(200).send({
                    'statuscode': 200,
                    'data': createForm,
                    'message': 'success'
                })
            }
        }
    }
}

module.exports = createContactForm