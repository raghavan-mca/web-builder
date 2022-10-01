const express = require('express');
const app = express();

const path = require('path');


const apierrorHandler = require('./error/errorhandler')
const config = require('./configurations/config')
require('./configurations/dbConnection')
app.use(express.json());

const company_listing = require('./router/web-builder-router');
const auth_router = require('./router/web-builder-auth');


app.set('view engine', "ejs")
app.use(express.static(path.join(__dirname, "views")));
app.use(express.static(path.join(__dirname, "public")));

app.use(company_listing)
app.use(auth_router)
app.use(apierrorHandler)


app.use((req, res, next) => {
    res.status(404).send({
        'statuscode': 404,
        'error': 'Not found'
    });
})

app.listen(config.port, () => {
    console.log(`http://localhost:${config.port}`);
})
