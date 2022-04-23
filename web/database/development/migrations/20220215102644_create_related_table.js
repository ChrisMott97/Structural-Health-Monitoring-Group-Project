/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) =>
  knex.schema.createTable('related', (table) => {
    table.primary(['sensor_id', 'related_id']);
    table.string('sensor_id').references('id').inTable('sensors').notNullable();
    table
      .string('related_id')
      .references('id')
      .inTable('sensors')
      .notNullable();
  });

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable('related');
