'use strict';

const { setPermissions } = require('./utils')

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap(/*{ strapi }*/) {
    // set "public" permissions
    await setPermissions('public', {
      'plugin::users-permissions.auth': [
        'connect',
        'callback',
        'forgotPassword',
        'resetPassword',
      ],
      'plugin::users-permissions.user': [
        'me',
      ],
    }, { reset: true })

    // set "authenticated" permissions
    await setPermissions('authenticated', {
      'plugin::users-permissions.auth': [
        'connect',
        'forgotPassword',
        'resetPassword',
      ],
      'plugin::users-permissions.user': [
        'me',
      ],
    }, { reset: true })
  },
};
