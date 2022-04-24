/**
 * @param { import("knex").Knex } knex
<<<<<<< HEAD:web/database/test/seeds/01-sensors.js
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("sensors").del();
  await knex("sensors").insert([
    {
      id: "GPH000EDE",
      type: "GPS",
      subtype: "Longitude",
      location: "East Antenna",
      unit: "degrees",
    },
    {
      id: "GPH000EDN",
      type: "GPS",
      subtype: "Latitude",
      location: "East Antenna",
      unit: "degrees",
    },
    {
      id: "GPH000EDH",
      type: "GPS",
      subtype: "Height",
      location: "East Antenna",
      unit: "metre",
    },
    {
      id: "GPH000WDE",
      type: "GPS",
      subtype: "Longitude",
      location: "West Antenna",
      unit: "degrees",
    },
    {
      id: "GPH000WDN",
      type: "GPS",
      subtype: "Latitude",
      location: "West Antenna",
      unit: "degrees",
    },
    {
      id: "GPH000WDH",
      type: "GPS",
      subtype: "Height",
      location: "West Antenna",
      unit: "metre",
    },
  ]);
=======
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('sensors').del()
  await knex('sensors').insert([
    {id: "GPH000EDE",type: "GPS", subtype: "Longitude", location: "East Antenna", unit: "degrees"},
    {id: "GPH000EDN",type: "GPS", subtype: "Latitude", location: "East Antenna", unit: "degrees"},
    {id: "GPH000EDH",type: "GPS", subtype: "Height", location: "East Antenna", unit: "metre"},
    {id: "GPH000WDE",type: "GPS", subtype: "Longitude", location: "West Antenna", unit: "degrees"},
    {id: "GPH000WDN",type: "GPS", subtype: "Latitude", location: "West Antenna", unit: "degrees"},
    {id: "GPH000WDH",type: "GPS", subtype: "Height", location: "West Antenna", unit: "metre"}
]);
>>>>>>> auto-encoder:api-gateway/database/test/seeds/01-sensors.js
};
