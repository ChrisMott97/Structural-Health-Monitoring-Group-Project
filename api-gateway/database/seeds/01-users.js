/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
 const { faker } = require('@faker-js/faker');
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  fake_data = []
  for (let i = 0; i < 10; i++) {
    fake_data.push({id: i+1, name: faker.name.findName(), permission: 1, password: faker.internet.password()})
  }
  await knex('users').insert(fake_data);
};
