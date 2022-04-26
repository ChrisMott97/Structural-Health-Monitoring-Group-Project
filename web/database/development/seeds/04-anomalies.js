/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("anomalies").del();
  await knex.raw("ALTER SEQUENCE anomalies_id_seq RESTART WITH 1");

  const anomalies_count = 20;
  const status_max = 5;
  let results = [];
  await knex("data")
    .select()
    .orderByRaw("random()")
    .limit(anomalies_count)
    .then((rows) => {
      rows.forEach((row) => {
        res = {};
        res.status = Math.floor(Math.random() * status_max) + 1;
        res.confidence = Math.random();
        res.notes = "This is a fake anomaly";
        res.sensor_time = row.time;
        res.sensor_id = row.sensor_id;
        res.user_id = "auth0|624db449e287a5007080932d";
        results.push(res);
      });
    });
  // await knex("users")
  //   .select()
  //   .then((users) => {
  //     results.forEach((res) => {
  //       res.user_id = users[Math.floor(Math.random() * users.length)].id;
  //     });
  //   });
  await knex("anomalies").insert(results);
};
