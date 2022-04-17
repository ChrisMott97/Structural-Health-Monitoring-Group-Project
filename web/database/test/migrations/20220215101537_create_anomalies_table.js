/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("anomalies", (table) => {
    table.increments("id");
    table.integer("status").notNullable();
    table.float("confidence").notNullable();
    table.string("notes");
    table.integer("user_id").unsigned().references("id").inTable("users");
    table.timestamp("sensor_time", { precision: 0 }).notNullable();
    table.string("sensor_id").notNullable();
    table
      .foreign(["sensor_time", "sensor_id"])
      .references(["time", "sensor_id"])
      .inTable("data");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("anomalies");
};
