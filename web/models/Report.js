const knex = require('../database/knex-internal');

function find(limit, offset) {
  return knex('reports')
    .select()
    .modify((builder) => {
      if (limit) builder.limit(limit);
      if (offset) builder.offset(offset);
    });
}

function findOne(id) {
  return knex('reports').select().where({ id }).first();
}

module.exports = { find, findOne };
