/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) =>
  knex.schema.createTable('sensors', (table) => {
    table.primary('id');
    table.string('id').notNullable();
    table.string('type').notNullable();
    table.string('subtype');
    table.string('location').notNullable();
    table.string('unit');
  });

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable('sensors');
