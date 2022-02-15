// Update with your config settings.
const path = require('path');
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'mysql2',
    connection: {
      host : 'internal-database',
      user : 'root',
      password : 'example',
      database : 'humber_bridge'
    },
    migrations: {
      tableName: 'migrations'
    },
  },

};
