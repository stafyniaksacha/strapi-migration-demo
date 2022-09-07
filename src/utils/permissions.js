'use strict';

/**
 * @param {string} type 
 * @param {Map<string, string[]>} permissions 
 * @param {{ reset?: boolean }=} options 
 * @returns 
 */
async function setPermissions(
  type, 
  permissions, 
  options = {
    reset: false
  }
) {
  // Find the ID of the public role
  const role = await strapi.query("plugin::users-permissions.role").findOne({
    select: ["id"], 
    where: {
      type,
    },
  });

  if (!role) {
    strapi.log.error(`bootstrap: no role found with type ${type}`);
    return;
  }

  if (options.reset) {
    strapi.log.silly(`bootstrap: reseting permissions for role with type "${type}"`);
    await strapi.db.connection.raw('DELETE FROM "up_permissions_role_links" WHERE "role_id" = ?', [role.id]);
  }

  // Create the new permissions and link them to the role
  const allPermissionsToCreate = [];

  for (const controllerId in permissions) {
    if (controllerId in permissions) {
      const actionIds = permissions[controllerId] ?? [];

      const permissionsToCreate = actionIds.map((actionId) =>
        strapi.query("plugin::users-permissions.permission").create({
          data: {
            action: `${controllerId}.${actionId}`,
            role: role.id,
          },
        })
      );

      allPermissionsToCreate.push(...permissionsToCreate);
    }
  }


  await Promise.all(allPermissionsToCreate);
}

module.exports = {
  setPermissions,
}