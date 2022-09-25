const company_listing_service = require('../../services/company-listing')
const company_listing_services = new company_listing_service()
const apiError = require('../../error/api-error')

class company_listing {
    async createcompanylisting(req, res, next) {
        let payload = req.body

        if (!payload) {
            next(apiError.badRequest('error'))
            return

        }
        else if (payload) {
            const company_listing_create = await company_listing_services.createcompanylisting(payload)
            console.log(company_listing_create)
            if (company_listing_create.code === 500) {
                next(apiError.internal({
                    'statusCode': 500,
                    'ErrorMessage': company_listing_create.ErrorMessage,
                    'Error': 'badImplementation'

                }))
                return

            } else if (company_listing_create.code === 400) {
                next(apiError.badRequest({
                    'statusCode': 400,
                    'ErrorMessage': 'invalid data',
                    'Error': 'badRequest'


                }))
                return
            } else if (company_listing_create.length === 0) {
                return res.status(200).send({
                    'statuscode': 204,
                    'data': company_listing_create
                })
            }
            else {
                return res.status(200).send({
                    'statuscode': 200,
                    'data': company_listing_create
                })
            }
        }
    }
}

module.exports = company_listing