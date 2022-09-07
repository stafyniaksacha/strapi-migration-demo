'use strict';

const { 
  setPermissions,
  isFirstRun,
  getPluginUsersPermissionsStore,
  importArticles,
} = require('./utils')

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
    strapi.log.silly('bootstrap: setup permissions')
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

    strapi.log.silly('bootstrap: setup strapi stores')
    // setup users-permissions providers settings
    const grant = await getPluginUsersPermissionsStore().get({ key: 'grant' })
    grant.google.enabled = true
    grant.google.key = 'GKEY'
    grant.google.secret = 'GSECRET'
    await getPluginUsersPermissionsStore().set({ key: 'grant', value: grant })

    // setup users-permissions email templates
    const email = await getPluginUsersPermissionsStore().get({ key: 'email' })
    email.reset_password.options.object = 'Reset your password'
    email.reset_password.options.message = [
      '<p>We heard that you lost your password. Sorry about that!</p>',
      '',
      '<p>But don’t worry! You can use the following link to reset your password:</p>',
      '<p><%= URL %>?code=<%= TOKEN %></p>',
      '<p>Thanks.</p>',
    ].join('\n')
    await getPluginUsersPermissionsStore().set({ key: 'email', value: email })

    if (await isFirstRun()) {
      strapi.log.silly('bootstrap: first start, setup data...')
      await importArticles()
    }
  },
};
