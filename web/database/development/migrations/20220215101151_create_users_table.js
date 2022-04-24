/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
<<<<<<< HEAD:web/database/development/migrations/20220215101151_create_users_table.js
exports.up = (knex) =>
  knex.schema.createTable('users', (table) => {
    table.increments('id');
    table.string('name').notNullable();
    table.integer('permission').notNullable();
    table.string('password').notNullable();
  });
=======
exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
      table.increments('id')
      table.string('name').notNullable()
      table.integer('permission').notNullable()
      table.string('password').notNullable()
  })
};
>>>>>>> auto-encoder:api-gateway/database/development/migrations/20220215101151_create_users_table.js

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
<<<<<<< HEAD:web/database/development/migrations/20220215101151_create_users_table.js
exports.down = (knex) => knex.schema.dropTable('users');
=======
exports.down = function(knex) {
  return knex.schema.dropTable('users')
};
>>>>>>> auto-encoder:api-gateway/database/development/migrations/20220215101151_create_users_table.js
