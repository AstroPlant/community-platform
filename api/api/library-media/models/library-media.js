"use strict";
const slugify = require("slugify");

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#life-cycle-callbacks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    async beforeCreate(data) {
      // Auto creating the slug
      if (data.title) {
        data.slug = slugify(data.title, {
          lower: true
        });
      }

      // Fetching meta data for links
      for (let component of data.content) {
        if (component.__component === "content-type.link") {
          await strapi.api["library-media"].config.functions.metadata.addTo(
            component
          );
        }
      }
    },
    async beforeUpdate(params, data) {
      // Auto updating the slug
      if (data.title) {
        data.slug = slugify(data.title, {
          lower: true
        });
      }

      // Fetching meta data for links
      for (let component of data.content) {
        if (component.__component === "content-type.link") {
          await strapi.api["library-media"].config.functions.metadata.addTo(
            component
          );
        }
      }
    }
  }
};
