/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => {
  // Deletes ALL existing entries
  await knex('comments').del();
  await knex('anomalies').del();
  await knex('sensors').del();
};
