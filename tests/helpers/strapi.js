'use strict';

const { existsSync, unlinkSync } = require('fs');
const Strapi = require('@strapi/strapi');
const supertest = require('supertest');

async function setup() {
  // const appContext = await Strapi.compile();
  const app = await Strapi();
  await app.start();

  return Promise.resolve(app);
}

async function teardown() {
  const dbSettings = strapi.config.get('database.connection.connection');

  // close server to release the db-file
  await strapi.destroy();

  // delete test database after all tests
  if (dbSettings && dbSettings.filename) {
    const tmpDbFile = `${dbSettings.filename}`;

    if (existsSync(tmpDbFile)) unlinkSync(tmpDbFile);
  }

  return Promise.resolve();
}

function agent() {
  return supertest.agent(strapi.server.httpServer);
}

module.exports = {
  setup,
  teardown,
  agent,
};
