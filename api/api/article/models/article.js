"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#life-cycle-callbacks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    async beforeCreate(data) {
      strapi.api["article"].config.functions.preview.addPreview(data);

      // If the article is marked as published
      if (data.published) {
        // Updating the publication date
        // If a value is given we use it otherwise we make the publication date the current one
        if (!data.published_at) {
          data.published_at = new Date();
        }
      }
    },
    async beforeUpdate(params, data) {
      await strapi.api["article"].config.functions.preview.updatePreview(
        params,
        data
      );

      // If the article is marked as published
      if (data.published) {
        // Updating the publication date
        // If a value is given we use it otherwise we make the publication date the current one
        if (!data.published_at) {
          data.published_at = new Date();
        }
      }
    }
  }
};
