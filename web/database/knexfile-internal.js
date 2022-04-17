// Update with your config settings.
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: 'internal-database',
      user: 'root',
      password: 'example',
      database: 'humber_bridge',
    },
    migrations: {
      tableName: 'migrations',
      directory: './development/migrations',
    },
    seeds: {
      directory: './development/seeds',
    },
    pool: {
      min: 2,
      max: 6,
      createTimeoutMillis: 3000,
      acquireTimeoutMillis: 30000,
      idleTimeoutMillis: 30000,
      reapIntervalMillis: 1000,
      createRetryIntervalMillis: 100,
      propagateCreateError: false, // <- default is true, set to false
    },
  },
  test: {
    client: 'pg',
    connection: {
      host: 'internal-database-test',
      user: 'root',
      password: 'example',
      database: 'humber_bridge',
    },
    migrations: {
      tableName: 'migrations',
      directory: './test/migrations',
    },
    seeds: {
      directory: './test/seeds',
    },
    pool: {
      min: 2,
      max: 6,
      createTimeoutMillis: 3000,
      acquireTimeoutMillis: 30000,
      idleTimeoutMillis: 30000,
      reapIntervalMillis: 1000,
      createRetryIntervalMillis: 100,
      propagateCreateError: false, // <- default is true, set to false
    },
  },
};
