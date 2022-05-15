// Title, start date, end date, list of sensors

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("report_sensors", (table)=>{
    table.primary(['report_id', 'sensor_id']);
    table.string('sensor_id').references('id').inTable('sensors').notNullable();
    table
      .integer('report_id')
      .references('id')
      .inTable('reports')
      .notNullable();
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('report_sensors')
};
