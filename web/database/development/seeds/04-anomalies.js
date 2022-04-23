/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => {
  // Deletes ALL existing entries
  await knex('anomalies').del();
  await knex.raw('ALTER SEQUENCE anomalies_id_seq RESTART WITH 1');

  // const anomaliesCount = 20;
  // const statusMax = 5;
  const results = [];
  // Get random selection of data from external DB and make anomalies

  // await knex('data')
  //   .select()
  //   .orderByRaw('random()')
  //   .limit(anomaliesCount)
  //   .then((rows) => {
  //     rows.forEach((row) => {
  //       const res = {};
  //       res.status = Math.floor(Math.random() * statusMax) + 1;
  //       res.confidence = Math.random();
  //       res.notes = 'This is a fake anomaly';
  //       res.sensor_time = row.time;
  //       res.sensor_id = row.sensor_id;
  //       results.push(res);
  //     });
  //   });

  // Get random selection of users from auth0 for anomalies

  // await knex('users')
  //   .select()
  //   .then((users) => {
  //     results.forEach((res) => {
  //       res.user_id = users[Math.floor(Math.random() * users.length)].id;
  //     });
  //   });
  await knex('anomalies').insert(results);
};
