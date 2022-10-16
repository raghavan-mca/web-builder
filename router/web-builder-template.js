const express = require('express')
const router = express.Router()



const createTable = require('../controller/template-controller/create-table')
const createWebsite = require('../controller/template-controller/create-website')
const createDomain = require('../controller/template-controller/domain-picker')
const uploadImage = require('../controller/template-controller/image-upload')
const loadDomain = require('../controller/template-controller/load-domain')

const {
    validate
} = require('express-validation')

const joi = require('../validation/template-validation')

const template_createTable = new createTable();
const create_Website = new createWebsite()
const domain = new createDomain();
const image = new uploadImage();
const domain_loading = new loadDomain()



router.post('/createtable', validate(joi.create_table),
    template_createTable.TableCreate)

router.post('/createwebsite', validate(joi.create_website),
    create_Website.createwebsite)

router.post('/domain', validate(joi.domain),
    domain.domain)

router.post('/upload',
    image.upload)

router.post('/:domain_name', validate(joi.load_domain),
    domain_loading.domainloading)



module.exports = router