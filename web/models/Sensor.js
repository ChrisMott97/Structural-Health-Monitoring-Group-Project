const knex = require('../database/knex-internal');

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

function findSimilar(id, by) {
  return knex('sensors')
    .where({ id })
    .first()
    .then((sensor) => {
      return knex('sensors')
        .select('id')
        .modify((builder) => {
          if (by) {
            builder.where(by, sensor[by]);
          } else {
            builder.where({ type: sensor.type });
          }
          builder.whereNot('id', id);
        });
    });
}
module.exports = { find, findOne, findSimilar };
