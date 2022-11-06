require('mysql')
let config = require('./config.js')
let DbConnection = {
    host: config.HOST,
    user: config.USERNAME_DB,
    password: config.PASSWORD,
    database: config.DB
}

let knex = require('knex')({
    client: 'mysql',
    connection: DbConnection
  });

  module.exports =knex

