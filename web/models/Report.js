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

function create(title, start_date, end_date, sensitivity, user, sensors) {
  sensors = JSON.parse(sensors)
  return knex('reports').insert({
    title,
    user,
    sensitivity,
    start_date,
    end_date
  }).returning('id').then((res)=>{
    const id = res[0].id
    // console.log(id)
    let sensors_list = []
    sensors.forEach(s => {
      sensors_list.push({sensor_id: s, report_id: id})
    });
    return knex('report_sensors').insert(sensors_list).then(()=>{return id})
  })
}

module.exports = { find, findOne, create };
