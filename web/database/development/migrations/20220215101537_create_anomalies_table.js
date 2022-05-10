/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("anomalies", (table) => {
    table.increments("id");
    table.integer("status").notNullable().defaultTo(1);
    table.float("confidence").notNullable();
    table.float("sensitivity").notNullable();
    table.string("user_id");
    table.timestamp("sensor_time", { precision: 0 }).notNullable();
    table.string("sensor_id");
    table
      .foreign(['sensor_time', 'sensor_id'])
      .references(['time', 'sensor_id'])
      .inTable('data');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable('anomalies');
