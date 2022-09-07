const path = require('path');

module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: 'localhost',
      port: 5432,
      database: 'my_database',
      user: 'my_user',
      password: 'password123',
      timezone: 'utc',
      schema: 'public',
    },
  },
});
