/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
<<<<<<< HEAD:web/database/test/migrations/20220211175801_create_sensor_table.js
exports.up = function (knex) {
  return knex.schema.createTable("sensors", (table) => {
    table.primary("id");
    table.string("id").notNullable();
    table.string("type").notNullable();
    table.string("subtype");
    table.string("location").notNullable();
    table.string("unit");
  });
=======
exports.up = function(knex) {
  return knex.schema.createTable('sensors', table => {
    table.primary('id')
    table.string('id').notNullable()
    table.string('type').notNullable()
    table.string('subtype')
    table.string('location').notNullable()
    table.string('unit')
  })
>>>>>>> auto-encoder:api-gateway/database/test/migrations/20220211175801_create_sensor_table.js
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
<<<<<<< HEAD:web/database/test/migrations/20220211175801_create_sensor_table.js
exports.down = function (knex) {
  return knex.schema.dropTable("sensors");
=======
exports.down = function(knex) {
  return knex.schema.dropTable('sensors');
>>>>>>> auto-encoder:api-gateway/database/test/migrations/20220211175801_create_sensor_table.js
};
