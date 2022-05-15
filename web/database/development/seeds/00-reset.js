/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => {
  // Deletes ALL existing entries
  await knex('report_sensors').del()
  await knex('reports').del()
  await knex('comments').del();
  await knex('related').del()
  await knex('anomalies').del();
  await knex('data').del()
  await knex('sensors').del();
};
