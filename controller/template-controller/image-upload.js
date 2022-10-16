const template_service = require('../../services/template-services')
const template_service_ = new template_service()
const apiError = require('../../error/api-error')


class uploadImage {
    async upload(req, res, next) {
        console.log(req)
        let payload = req.files.files

        if (!payload) {
            next(apiError.badRequest('error'))
            return

        }
        else if (payload) {
            const upload_image = await template_service_.imageupload(payload)
            if (upload_image.statuscode === 500) {
                next(apiError.internal({
                    'statuscode': 500,
                    'errormessage': upload_image.errormessage,
                    'message': 'badImplementation'

                }))
                return

            } else if (upload_image.statuscode === 400) {
                next(apiError.badRequest({
                    'statuscode': 400,
                    'errormessage': 'invalid_data',
                    'message': 'badRequest'


                }))
                return
            } else if (upload_image.length === 0) {
                return res.status(200).send({
                    'statuscode': 204,
                    'data': upload_image,
                    'message': 'success'
                })
            }
            else {
                return res.status(200).send({
                    'statuscode': 200,
                    'data': upload_image,
                    'message': 'success'
                })
            }
        }
    }
}

module.exports = uploadImage