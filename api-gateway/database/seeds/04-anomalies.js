/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('anomalies').del()
  await knex.raw("ALTER TABLE anomalies AUTO_INCREMENT = 1")

  const anomalies_count = 10
  const status_max = 5
  let results = []
  await knex('data').select().orderByRaw('RAND()').limit(anomalies_count).then(rows => {
      rows.forEach(row => {
        res = {}
        res.status = Math.floor(Math.random() * status_max)+1;
        res.confidence = Math.random()
        res.notes = "This is a fake anomaly"
        res.sensor_time = row.time
        res.sensor_id = row.sensor_id
        results.push(res)
      });
  })
  await knex('users').select().then(users => {
    results.forEach(res => {
      res.user_id = users[Math.floor(Math.random()*users.length)].id
    })
  })
  await knex('anomalies').insert(results);
};
