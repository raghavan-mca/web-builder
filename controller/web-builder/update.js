const company_listing_service = require('../../services/company-listing')
const company_listing_Services = new company_listing_service()
const apiError = require('../../error/api-error')

class company_listing {
    async updatecompanylisting(req, res, next) {

        let payload = req.body
        let params = req.params
        try {
            if (!payload || !params) {
                next(apiError.badRequest('error'))
                return

            } else if (payload && params) {
                
                const company_listing_update = await company_listing_Services.updatecompanylisting(payload,params)
                if (company_listing_update.statuscode === 500) {
                    next(apiError.internal({
                        'statuscode': 500,
                        'errormessage': company_listing_update.errormessage,
                        'Error': 'badImplementation'

                    }))
                    return
                } else if (company_listing_update.statuscode === 11000) {
                    next(apiError.conflict({
                        'statuscode': 409,
                        'Error': 'conflict',
                        'errormessage': 'duplicate data'
                    }))
                    return
                }else if (company_listing_update.statuscode === 400) {
                    next(apiError.badRequest({
                        'statuscode': 400,
                        'errormessage':'invalid_data' ,
                        'Error': 'badRequest'


                    }))
                    return
                }
                else {
                    return res.status(200).send({
                        'statuscode':200,
                        "status":'success'
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