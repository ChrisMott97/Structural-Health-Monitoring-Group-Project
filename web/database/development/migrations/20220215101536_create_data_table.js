/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) =>
  knex.schema.createTable('data', (table) => {
    table.primary(['time', 'sensor_id']);
    table.timestamp('time', { precision: 0 }).notNullable();
    table.double('value');
    table.string('sensor_id').references('id').inTable('sensors').notNullable();
    table.unique(['time', 'sensor_id']);
  });

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable('data');
