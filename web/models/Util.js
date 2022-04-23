const knex = require('../database/knex-internal');

function enumerate(table, property) {
  return knex(table).distinct(property);
}
module.exports = { enumerate };
