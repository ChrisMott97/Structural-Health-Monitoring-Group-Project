/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
<<<<<<< HEAD:web/database/development/migrations/20220215101536_create_data_table.js
exports.up = (knex) =>
  knex.schema.createTable('data', (table) => {
    table.primary(['time', 'sensor_id']);
    table.timestamp('time', { precision: 0 }).notNullable();
    table.double('value');
    table.string('sensor_id').references('id').inTable('sensors').notNullable();
    table.unique(['time', 'sensor_id']);
  });
=======
exports.up = function(knex) {
  return knex.schema.createTable('data', table => {
      table.primary(['time','sensor_id'])
      table.timestamp('time',{ precision: 0 }).notNullable()
      table.double('value')
      table.string('sensor_id').references('id').inTable('sensors').notNullable()
      table.unique(['time', 'sensor_id'])
  })
};
>>>>>>> auto-encoder:api-gateway/database/development/migrations/20220215101536_create_data_table.js

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
<<<<<<< HEAD:web/database/development/migrations/20220215101536_create_data_table.js
exports.down = (knex) => knex.schema.dropTable('data');
=======
exports.down = function(knex) {
  return knex.schema.dropTable('data')
};
>>>>>>> auto-encoder:api-gateway/database/development/migrations/20220215101536_create_data_table.js
