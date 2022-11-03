const contact_service = require('../../services/contact-form-service')
const contact_service_ = new contact_service()
const apiError = require('../../error/api-error')


class deleteContactForm {
    async deleteForm(req, res, next) {
        let payload = req.body
        

        if (!payload ) {
            next(apiError.badRequest('error'))
            return

        }
        else if (payload ) {
            const deleteForm = await contact_service_.deleteContact(payload)
            if (deleteForm.statuscode === 500) {
                next(apiError.internal({
                    'statuscode': 500,
                    'errormessage': deleteForm.errormessage,
                    'message': 'badImplementation'

                }))
                return

            } else if (deleteForm.statuscode === 400) {
                next(apiError.badRequest({
                    'statuscode': 400,
                    'errormessage': 'invalid_data',
                    'message': 'badRequest'


                }))
                return
            } else if (deleteForm.length === 0) {
                return res.status(200).send({
                    'statuscode': 204,
                    'data': deleteForm,
                    'message': 'success'
                })
            }
            else {
                return res.status(202).send({
                    'statuscode': 202,
                    'data': deleteForm,
                    'message': 'success'
                })
            }
        }
    }
}

module.exports = deleteContactForm