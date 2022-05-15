/**
* @param { import("knex").Knex } knex
* @returns { Promise<void> }
*/

exports.seed = async (knex) => {
  // Deletes ALL existing entries
  // await knex('report_sensors').del();
  // await knex.raw('ALTER SEQUENCE reports_id_seq RESTART WITH 1');
  // let results = []
  // await knex('reports')
  //   .select()
  //   .then((rows) => {
  //     rows.forEach((row) => {
  //       const res = {};
  //       for (let i = 0; i < array.length; i++) {
  //         const element = array[i];
          
  //       }
  //       res.report_id = row.id;
  //       res.sensor_id =
  //       results.push(res);
  //     });
  //   });
  // await knex("report_sensors").insert(results);
};
