/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => {
  return knex.schema
    .createTable('sensors', (table) => {
      table.primary('id');
      table.string('id').notNullable();
      table.string('type');
      table.string('subtype');
      table.string('location');
      table.string('unit');
    })
    .then(() =>
      knex.schema
        .createTable('anomalies', (table) => {
          table.increments('id');
          table.integer('status').notNullable().defaultTo(0);
          table.float('confidence').notNullable();
          table.string('notes');
          table.string('user_id');
          table.timestamp('sensor_time').notNullable();
          table.string('sensor_id').notNullable();
          table.foreign('sensor_id').references('id').inTable('sensors');
          table.timestamp('created_at').defaultTo(knex.fn.now());
          table.timestamp('updated_at').defaultTo(knex.fn.now());
        })
        .then(() =>
          knex.schema.createTable('comments', (table) => {
            table.increments('id');
            table.string('user_id');
            table
              .string('sensor_id')
              .references('id')
              .inTable('sensors')
              .notNullable();
            table
              .integer('anomaly_id')
              .unsigned()
              .references('id')
              .inTable('anomalies');
            table.text('body').notNullable();
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.fn.now());
          })
        )
    );
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async (knex) => {
  await knex('comments').del();
  await knex('related').del();
  await knex('anomalies').del();
  await knex('data').del();
  await knex('users').del();
  await knex('sensors').del();
};
