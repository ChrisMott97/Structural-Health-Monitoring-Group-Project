/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('comments', table => {
        table.increments('id')
        table.integer('user_id').unsigned().references('id').inTable('users')
        table.string('sensor_id').references('sensor_id').inTable('data').notNullable()
        table.integer('anomaly_id').unsigned().references('id').inTable('anomalies')
        table.text('body').notNullable()
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('comments')
};
