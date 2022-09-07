"use strict";

process.env.NODE_ENV = 'development-pg';

const Strapi = require("@strapi/strapi");

async function setup() {
  Strapi({
    dir: __dirname,
  });
  await strapi.start();

  return Promise.resolve(strapi);
}

setup().catch(console.error);