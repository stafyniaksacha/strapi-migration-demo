'use-strict';

function getAppSetupStore() {
  return strapi.store({
    type: "app",
    name: "setup",
  });
}

function getPluginUsersPermissionsStore() {
  return strapi.store({
    type: "plugin",
    name: "users-permissions",
  });
}

async function isFirstRun() {
  const store = getAppSetupStore()
  const initHasRun = await store.get({ key: "initHasRun" });
  await store.set({ key: "initHasRun", value: true });
  console.log('initHasRun', initHasRun)
  return !initHasRun;
}

module.exports = {
  getAppSetupStore,
  getPluginUsersPermissionsStore,
  isFirstRun,
}