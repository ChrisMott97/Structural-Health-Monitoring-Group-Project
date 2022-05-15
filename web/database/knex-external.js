const environment = process.env.NODE_ENV || 'development';
const config = require('./knexfile-external')[environment];

module.exports = require('knex')(config);
