"use strict";

async function updateMediaCount(sectionID, mediaArray) {
  await strapi.query("library-section").update(
    { id: sectionID },
    {
      library_medias_count: mediaArray ? mediaArray.length : 0
    }
  );
}

module.exports = {
  lifecycles: {
    async afterCreate(result, data) {
      updateMediaCount(result.id, result.library_medias);
    },
    async afterUpdate(result, params, data) {
      updateMediaCount(result.id, result.library_medias);
    }
  }
};
