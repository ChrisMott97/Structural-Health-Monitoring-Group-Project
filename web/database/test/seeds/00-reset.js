/**
 * @param { import("knex").Knex } knex
<<<<<<< HEAD:web/database/test/seeds/00-reset.js
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("comments").del();
  await knex("related").del();
  await knex("anomalies").del();
  await knex("data").del();
  await knex("users").del();
  await knex("sensors").del();
};
=======
 * @returns { Promise<void> } 
 */
 exports.seed = async function(knex) {
    // Deletes ALL existing entries
    await knex('comments').del()
    await knex('related').del()
    await knex('anomalies').del()
    await knex('data').del()
    await knex('users').del()
    await knex('sensors').del()   
  };
  
>>>>>>> auto-encoder:api-gateway/database/test/seeds/00-reset.js
