const express = require('express')
const router = express.Router()


const fetchtemplate = require('../controller/user-store-controller/get-template')
const updatetemplate = require('../controller/user-store-controller/update-template')
const deletetemplate = require('../controller/user-store-controller/delete-template')

const {
    validate
} = require('express-validation')

const joi = require('../validation/user-store-validation')

const fetchtemplate_ = new fetchtemplate();
const updatetemplate_ = new updatetemplate();
const deletetemplate_ = new deletetemplate();




router.get('/fetch/user/template', validate(joi.fetchUserTemplate),
fetchtemplate_.fetchtemplate)

router.put('/update/user/template', validate(joi.update_website),
updatetemplate_.Updatetemplate)

router.delete('/remove/user/template/:uid/:template_name', validate(joi.delete_website),
deletetemplate_.Deletetemplate)





module.exports = router