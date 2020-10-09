"use strict";

const slugify = require("slugify");

async function updateSection(sectionId) {
  await strapi.query("library-section").update({ id: sectionId }, {});
}

module.exports = {
  lifecycles: {
    async afterCreate(result, data) {
      await updateSection(result.library_section.id);
    },
    async afterDelete(results, data) {
      if (results.length > 0) {
        for (let res of results) {
          await updateSection(res.library_section.id);
        }
      }
    },
    async afterUpdate(result, params, data) {
      await updateSection(result.library_section.id);
    },
    async beforeCreate(data) {
      // Auto creating the slug
      if (data.title) {
        data.slug = slugify(data.title, {
          lower: true,
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
          lower: true,
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
  },
};
