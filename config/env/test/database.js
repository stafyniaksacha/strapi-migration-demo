'use strict';

module.exports = () => ({
  connection: {
    client: 'sqlite',
    connection: {
      filename: ':memory:',
    },
    useNullAsDefault: true,
  },
});
