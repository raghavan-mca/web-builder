const express = require('express')
const router = express.Router()



const createform = require('../controller/contact-form/create-contact-form')
const fetchform = require('../controller/contact-form/fetch-contact-form')
const deleteform = require('../controller/contact-form/delete-contact-form')

const {
    validate
} = require('express-validation')

const joi = require('../validation/contact-form-validation')

const create_form = new createform();
const fetch_form_ = new fetchform();
const deleteform_ = new deleteform();



router.post('/:template_name/:uid', validate(joi.createform),
    create_form.createForm)

router.get('/fetch/message', validate(joi.fetchform),
    fetch_form_.fetchForm)

router.delete('/delete/message', validate(joi.deleteform),
    deleteform_.deleteForm)





module.exports = router