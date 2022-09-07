'use strict';

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/articles/get/latest',
      handler: 'find.latest',
      config: {
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/articles/slug/:slug',
      handler: 'find.bySlug',
      config: {
        auth: false,
      },
    },
  ],
}