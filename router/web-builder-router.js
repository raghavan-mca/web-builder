const express = require('express')
const router = express.Router()

const fetch = require('../controller/web-builder/fetch')
const create = require('../controller/web-builder/create')
const update = require('../controller/web-builder/update')
const delete_ = require('../controller/web-builder/delete')

const {
    validate
} = require('express-validation')

const joi = require('../validation/web-builder-validation')


const fetch_web_builder = new fetch();
const create_web_builder = new create();
const update_web_builder = new update();
const delete_web_builder = new delete_();

router.get('/educare/get-company', validate(joi.fetch),
    fetch_web_builder.fetchcompanylisting)

router.post('/educare/new-company', validate(joi.create),
    create_web_builder.createcompanylisting)

router.put('/educare/edit-company/:id', validate(joi.update_body), validate(joi.update_params),
    update_web_builder.updatecompanylisting)

router.delete('/educare/delete-company/:id', validate(joi.delete_params),
    delete_web_builder.deletecompanylisting)


module.exports = router