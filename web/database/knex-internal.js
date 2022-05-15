const environment = process.env.NODE_ENV || 'development';
const config = require('./knexfile-internal')[environment];

module.exports = require('knex')(config);
