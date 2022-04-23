/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async (knex) => {
  await knex.schema.dropTable('comments');
  await knex.schema.dropTable('related');
  await knex.schema.dropTable('anomalies');
  await knex.schema.dropTable('data');
  await knex.schema.dropTable('users');
  await knex.schema.dropTable('sensors');
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async () => {};
