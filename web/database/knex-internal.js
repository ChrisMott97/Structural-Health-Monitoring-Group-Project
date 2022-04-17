const environment = process.env.ENVIRONMENT || 'development';
const config = require('./knexfile-internal')[environment];

module.exports = require('knex')(config);
