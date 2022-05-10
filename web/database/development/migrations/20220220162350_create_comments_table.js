/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("comments", (table) => {
    table.increments("id");
    table.string("user_id");
    table.string("sensor_id").references("id").inTable("sensors").notNullable();
    table
      .integer('anomaly_id')
      .unsigned()
      .references('id')
      .inTable('anomalies');
    table.text('body').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable('comments');
