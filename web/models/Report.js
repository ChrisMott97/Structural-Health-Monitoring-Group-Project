const knex = require('../database/knex-internal');

function find(limit, offset) {
  return new Promise((resolve, reject)=>{
    knex('reports')
      .select()
      .modify((builder) => {
        if (limit) builder.limit(limit);
        if (offset) builder.offset(offset);
      }).then((rows)=>{
        results = []
        rows.forEach((row)=>{
          knex('report_sensors').select("sensor_id").where({report_id: row.id}).then((sensors)=>{
            sensors = sensors.map(x => x["sensor_id"])
            row.sensors = sensors
            results.push(row)
            if(results.length == rows.length){
              resolve(results)
            }
          })
        })
      })

  })
}

function findOne(id) {
  return new Promise((resolve, reject)=>{
    knex('reports').select().where({ id }).first().then((row)=>{
      knex('report_sensors').select("sensor_id").where({report_id: row.id}).then((sensors)=>{
        sensors = sensors.map(x => x["sensor_id"])
        row.sensors = sensors
        resolve(row)
      })
    });
  })
}

function create(title, start_date, end_date, sensitivity, user, sensors) {
  return new Promise((resolve, reject)=>{
    if(sensors){
      sensors = JSON.parse(sensors)
    }
    errored = true
    if(title && start_date && end_date && sensitivity && user && sensors){
      errored = false
    }
    if(errored){
      reject('Some required fields not given.')
    }
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
      return knex('report_sensors').insert(sensors_list).then(resolve(id))
    })
  })
}

module.exports = { find, findOne, create };
