const apiError = require("../error/api-error")

function errorhandler(err, req, res, next) {
    let badRequest_output = {
        'statuscode':400,
        'errormessage':err.message,
        'Error':err.error

    }
    let Internal_Server_output = {
        'statuscode':500,
        'errormessage':'invalid file formate',
        'Error':'badImplementation'

    }
    if (err.error === 'Bad Request') {
        if (err instanceof apiError) {
            res.status(err.statuscode).json(err.message)
            return
        }
        res.status(400).json(badRequest_output)
    }
    else {
        if (err instanceof apiError) {
            res.status(err.statuscode).json(err.message)
            return
        }
        res.status(500).json(Internal_Server_output)
    }
}

module.exports = errorhandler