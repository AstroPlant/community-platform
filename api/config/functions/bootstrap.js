"use strict";

/**
 * generates a password
 * @param {int} length of the password
 */
function generatePassword(length) {
  let result = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789/*";
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

/**
 * updates the given permission object to enabled: true
 * @param {array} perms to enable
 */
const enablePerms = async (perms) => {
  for (let perm of perms) {
    await strapi.query("permission", "users-permissions").update(
      {
        id: perm.id,
      },
      { enabled: true }
    );
  }
};

/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * Setting up a bot user for legacy articles
 * Setting up permissions for public and authenticated users
 * Importing legacy articles
 *
 * See more details here: https://strapi.io/documentation/v3.x/concepts/configurations.html#bootstrap
 */
module.exports = async () => {
  strapi.log.info("Starting the API...");

  // START - Creating Bot User

  strapi.log.info("Creating bot user...");

  const authenticatedRole = await strapi
    .query("role", "users-permissions")
    .findOne({ type: "authenticated" }, ["id"]);

  let botUser = await strapi.query("user", "users-permissions").findOne({
    username: "astrobot",
  });

  if (!botUser) {
    /**
     * Creating a user that we only use for article imports
     */
    botUser = await strapi.plugins["users-permissions"].services.user.add({
      username: "astrobot",
      email: "bot@astroplant.io",
      password: generatePassword(12),
      role: authenticatedRole.id || null,
      description: "I am a bot used by the AstroPlant team.",
      confirmed: true,
    });
  }

  strapi.log.info("Setting permissions...");

  // START - Public permissions

  const publicRole = await strapi
    .query("role", "users-permissions")
    .findOne({ type: "public" }, ["id"]);

  const publicPerms = await strapi
    .query("permission", "users-permissions")
    .find({
      role: [publicRole.id],
      controller: [
        "article",
        "library-media",
        "category",
        "faq",
        "feature",
        "help-section",
        "library-section",
        "user",
        "userspermissions",
      ],
      action: ["find", "findone", "searchusers"],
    });

  await enablePerms(publicPerms);

  // END - Public permissions

  // START - Auth Users permissions

  const mediaPerms = await strapi
    .query("permission", "users-permissions")
    .find({
      role: [authenticatedRole.id],
      controller: ["library-media"],
    });

  const usersPerms = await strapi
    .query("permission", "users-permissions")
    .find({
      role: [authenticatedRole.id],
      controller: ["user"],
      action: ["update"],
    });

  const uploadPerms = await strapi
    .query("permission", "users-permissions")
    .find({
      role: [authenticatedRole.id],
      type: "upload",
      action: ["upload"],
    });

  const authenticatedPerms = [...mediaPerms, ...uploadPerms, ...usersPerms];

  await enablePerms(authenticatedPerms);

  // END - Auth Users permissions

  // START - IMPORTING OLD ARTICLES

  strapi.log.info("Creating the first article...");

  const nbArticle = await strapi.query("article").count();

  if (nbArticle === 0) {
    await strapi.services.article.create({
      title: "The first article!",
      preview: "I am the first article can you believe it ?!",
      published: true,
      author: botUser.id || null,
      content: [
        {
          __component: "content-type.rich-text",
          text: "I am the first article can you believe it ?!",
        },
      ],
    });
  }

  // END - IMPORTING OLD ARTICLES
};
