"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#life-cycle-callbacks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    async beforeUpdate(params, data) {
      // Deleting the media file, if the avatar has to be cleared
      if (data.avatar === null) {
        const user = await strapi
          .query("user", "users-permissions")
          .findOne(params);

        await strapi.query("file", "upload").delete({ id: user.avatar.id });
      }
    }
  }
};
