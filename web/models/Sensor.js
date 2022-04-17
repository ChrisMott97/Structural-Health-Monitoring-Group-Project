const knex = require('../knex');

function find(limit, offset, type, subtype, location) {
  return knex('sensors')
    .select()
    .modify((builder) => {
      if (limit) builder.limit(limit);
      if (offset) builder.offset(offset);
      if (type) builder.where({ type });
      if (subtype) builder.where({ subtype });
      if (location) builder.where({ location });
    });
}

function findOne(id) {
  return knex('sensors').select().where({ id }).first();
}

function findRelated(id) {
  return knex('related').select('related_id').where({ sensor_id: id });
}
module.exports = { find, findOne, findRelated };
