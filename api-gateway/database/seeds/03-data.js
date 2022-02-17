/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const fs = require('fs')

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  let rawdata = fs.readFileSync('/home/node/app/database/seeds/data.json');
  let data = JSON.parse(rawdata);
  await knex('data').del()
  await knex('data').insert(data);
};
