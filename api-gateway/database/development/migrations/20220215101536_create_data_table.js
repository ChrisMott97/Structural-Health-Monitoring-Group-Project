/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('data', table => {
      table.primary(['time','sensor_id'])
      table.timestamp('time').notNullable()
      table.double('value')
      table.string('sensor_id').references('id').inTable('sensors').notNullable()
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('data')
};
