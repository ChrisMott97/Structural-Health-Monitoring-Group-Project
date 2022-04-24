/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => {
  // Deletes ALL existing entries
  await knex('sensors').del();
  await knex('sensors').insert([
    {
      id: 'GPH000EDE',
      type: 'GPS',
      subtype: 'Longitude',
      location: 'East Antenna',
      unit: 'degrees',
    },
    {
      id: 'GPH000EDN',
      type: 'GPS',
      subtype: 'Latitude',
      location: 'East Antenna',
      unit: 'degrees',
    },
    {
      id: 'GPH000EDH',
      type: 'GPS',
      subtype: 'Height',
      location: 'East Antenna',
      unit: 'metre',
    },
    {
      id: 'GPH000WDE',
      type: 'GPS',
      subtype: 'Longitude',
      location: 'West Antenna',
      unit: 'degrees',
    },
    {
      id: 'GPH000WDN',
      type: 'GPS',
      subtype: 'Latitude',
      location: 'West Antenna',
      unit: 'degrees',
    },
    {
      id: 'GPH000WDH',
      type: 'GPS',
      subtype: 'Height',
      location: 'West Antenna',
      unit: 'metre',
    },
  ]);
};
