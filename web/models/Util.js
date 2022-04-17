const knexConfig = require("../database/knexfile.js")["development"];
const knex = require("knex")(knexConfig);

function enumerate(table, property) {
  return knex(table).distinct(property);
}
module.exports = { enumerate };
