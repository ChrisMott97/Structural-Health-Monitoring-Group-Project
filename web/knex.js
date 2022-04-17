const environment = process.env.ENVIRONMENT || 'development';
const config = require('./database/knexfile')[environment];
module.exports = require('knex')(config);
