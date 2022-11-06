const company_services = require('../../services/company-listing')
const company_Services = new company_services()
const apiError = require('../../error/api-error')

class company_listing {
    async deletecompanylisting(req, res, next) {

        let params = req.params


        try {
            if (!params) {
                next(apiError.badRequest('error'))
                return

            } else if (params) {
                const company_listing_delete = await company_Services.deletecompanylisting(params)

                if (company_listing_delete.statuscode === 500) {
                    next(apiError.internal({
                        'statuscode': 500,
                        'errormessage': company_listing_delete.errormessage,
                        'Error': 'badImplementation'

                    }))
                    return
                } else if (company_listing_delete.statuscode === 11000) {
                    next(apiError.conflict({
                        'statuscode': 409,
                        'Error': 'conflict',
                        'errormessage': 'duplicate data'
                    }))
                    return
                }
                else {
                    return res.status(202).send({
                        'statuscode':202,
                        'data': company_listing_delete,
                        'deleted id':params.id
                    })
                }
            }

        } catch (err) {
            
            if (err.statuscode === 11000) {
                next(apiError.conflict({
                    'statuscode': 409,
                    'Error': 'conflict',
                    'errormessage': 'duplicate data'
                }))
                return
            }
            next(apiError.internal({
                'statuscode': 500,
                'errormessage': 'undefine error',
                'Error': 'badImplementation'

            }))
            return
        }


    }
}

module.exports = company_listing