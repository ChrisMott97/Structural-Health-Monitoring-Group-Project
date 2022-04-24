/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
<<<<<<< HEAD:web/database/test/migrations/20220215102644_create_related_table.js
exports.up = function (knex) {
  return knex.schema.createTable("related", (table) => {
    table.primary(["sensor_id", "related_id"]);
    table.string("sensor_id").references("id").inTable("sensors").notNullable();
    table
      .string("related_id")
      .references("id")
      .inTable("sensors")
      .notNullable();
  });
=======
exports.up = function(knex) {
  return knex.schema.createTable('related', table => {
      table.primary(['sensor_id', 'related_id'])
      table.string('sensor_id').references('id').inTable('sensors').notNullable()
      table.string('related_id').references('id').inTable('sensors').notNullable()
  })
>>>>>>> auto-encoder:api-gateway/database/test/migrations/20220215102644_create_related_table.js
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
<<<<<<< HEAD:web/database/test/migrations/20220215102644_create_related_table.js
exports.down = function (knex) {
  return knex.schema.dropTable("related");
=======
exports.down = function(knex) {
  return knex.schema.dropTable('related')
>>>>>>> auto-encoder:api-gateway/database/test/migrations/20220215102644_create_related_table.js
};
