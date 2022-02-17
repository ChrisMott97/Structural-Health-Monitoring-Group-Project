/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
 exports.seed = async function(knex) {
    // Deletes ALL existing entries
    await knex('related').del()
    await knex('anomalies').del()
    await knex('data').del()
    await knex('users').del()
    await knex('sensors').del()   
  };
  