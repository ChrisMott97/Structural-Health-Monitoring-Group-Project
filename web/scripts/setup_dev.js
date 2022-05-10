const knex = require('../database/knex-internal');
console.log("Setting up dev...")

knex('sensors').insert([
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
]).then(()=>{
  console.log("inserted sensors")
  let results = [];
  knex("sensors")
    .select()
    .then((rows) => {
      rows.forEach((i) => {
        rows.forEach((j) => {
          if (i.location == j.location && i.id != j.id) {
            results.push({ sensor_id: i.id, related_id: j.id });
          }
        });
      });
    }).then(()=>{
      knex("related").insert(results).then(()=>console.log("inserted related"));
    })
}).catch(console.error)