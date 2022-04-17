const environment = process.env.ENVIRONMENT || 'development';
const config = require('./knexfile-external')[environment];

module.exports = require('knex')(config);
