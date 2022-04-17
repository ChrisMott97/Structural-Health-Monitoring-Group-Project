const knex = require('../knex');

function enumerate(table, property) {
  return knex(table).distinct(property);
}
module.exports = { enumerate };
