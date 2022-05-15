// Title, start date, end date, list of sensors

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("reports", (table)=>{
    table.increments('id');
    table.string("title");
    table.string("user");
    table.float("sensitivity").notNullable();
    table.timestamp("start_date");
    table.timestamp("end_date");
    table.timestamp('created_at').defaultTo(knex.fn.now());
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('reports')
};
