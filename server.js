const express = require('express');
const app = express();
const file_uploade = require('express-fileupload')
const path = require('path');
const cors = require('cors');

app.use(file_uploade({
    useTempFiles : true,
    createParentPath:true,
    limits: { fileSize: 300000 },
}));

const apierrorHandler = require('./error/errorhandler')
const config = require('./configurations/config')
require('./configurations/dbConnection')
app.use(express.json());
app.use(cors());

const company_listing = require('./router/web-builder-router');
const auth_router = require('./router/web-builder-auth');
const template= require('./router/web-builder-template');
const contact_form = require('./router/web-builder-contact-form');
const user_store = require('./router/web-builder-user-store')


app.set('view engine', "ejs")
app.use(express.static(path.join(__dirname, "views")));
app.use(express.static(path.join(__dirname, "public")));

app.use(company_listing)
app.use(auth_router)
app.use(template)
app.use(contact_form)
app.use(user_store)
app.use(apierrorHandler)


app.use((req, res, next) => {
    res.status(404).send({
        'StatusCode': 404,
        'error': 'Not found'
    });
})

app.listen(config.port, () => {
    console.log(`http://localhost:${config.port}`);
})
