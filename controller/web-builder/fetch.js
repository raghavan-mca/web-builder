const company_listing_service = require('../../services/company-listing')
const company_listing_services = new company_listing_service()
const apiError = require('../../error/api-error')

class company_listing {
    async fetchcompanylisting(req, res, next) {
        let query = req.query
        
            if (!query) {
                next(apiError.badRequest('error'))
                return

            }
            else if (query) {
                console.log(query)
                const company_listing_fetch = await company_listing_services.fetchcompanylisting(query)
                if (company_listing_fetch.code === 500) {
                    next(apiError.internal({
                        'statusCode': 500,
                        'ErrorMessage': company_listing_fetch.ErrorMessage,
                        'Error': 'badImplementation'

                    }))
                    return
                
                } else if (company_listing_fetch.code === 400) {
                    next(apiError.badRequest({
                        'statusCode': 400,
                        'ErrorMessage':'invalid data' ,
                        'Error': 'badRequest'


                    }))
                    return
                }else if(company_listing_fetch.length === 0){
                    return res.status(200).send({
                        'statuscode':204,
                        'data': company_listing_fetch
                    })
                }
                 else {
                    return res.status(200).send({
                        'statuscode':200,
                        'data': company_listing_fetch
                    })
                }
            }

        
    }
}

module.exports = company_listing