/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
<<<<<<< HEAD:web/database/test/migrations/20220220162350_create_comments_table.js
exports.up = function (knex) {
  return knex.schema.createTable("comments", (table) => {
    table.increments("id");
    table.integer("user_id").unsigned().references("id").inTable("users");
    table.string("sensor_id").references("id").inTable("sensors").notNullable();
    table
      .integer("anomaly_id")
      .unsigned()
      .references("id")
      .inTable("anomalies");
    table.text("body").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
=======
exports.up = function(knex) {
    return knex.schema.createTable('comments', table => {
        table.increments('id')
        table.integer('user_id').unsigned().references('id').inTable('users')
        table.string('sensor_id').references('id').inTable('sensors').notNullable()
        table.integer('anomaly_id').unsigned().references('id').inTable('anomalies')
        table.text('body').notNullable()
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
>>>>>>> auto-encoder:api-gateway/database/test/migrations/20220220162350_create_comments_table.js
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
<<<<<<< HEAD:web/database/test/migrations/20220220162350_create_comments_table.js
exports.down = function (knex) {
  return knex.schema.dropTable("comments");
=======
exports.down = function(knex) {
    return knex.schema.dropTable('comments')
>>>>>>> auto-encoder:api-gateway/database/test/migrations/20220220162350_create_comments_table.js
};
