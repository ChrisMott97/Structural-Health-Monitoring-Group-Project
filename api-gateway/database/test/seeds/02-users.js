/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
 const { faker } = require('@faker-js/faker');
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex.raw("ALTER TABLE users AUTO_INCREMENT = 1")

  let fake_data = []
  let max_permission = 3
  
  for (let i = 0; i < 10; i++) {
    fake_data.push({
      name: faker.name.findName(), 
      permission: Math.floor(Math.random() * max_permission)+1, 
      password: faker.internet.password()})
  }
  await knex('users').insert(fake_data);
};
