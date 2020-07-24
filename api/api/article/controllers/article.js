"use strict";
const axios = require("axios");
const TurndownService = require("turndown");

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  import: async ctx => {
    const turndownService = new TurndownService();

    let postImported = [];

    const { data } = await axios.get(
      "https://www.astroplant.io/wp-json/wp/v2/posts?per_page=1&page=16"
    );

    const posts = await Promise.all(
      data.map(
        post =>
          new Promise(async (resolve, reject) => {
            const {
              title: { rendered: titleRendered },
              slug,
              content: { rendered: contentRendered },
              date,
              jetpack_featured_media_url
            } = post;

            const existingArticle = await strapi
              .query("article")
              .findOne({ slug });

            if (existingArticle) {
              console.log("already exists");
              resolve({});
            } else {
              // Setting default values

              // Default author
              const author = await strapi
                .query("user", "users-permissions")
                .findOne({ id: 2 });

              // Cover placeholder
              let fileId = 1;

              // transforming to markdowns
              const titlemd = turndownService.turndown(titleRendered);
              let originalContentMD = turndownService.turndown(contentRendered);

              // Searching for images in the content.
              let allUrls = Array.from(
                originalContentMD.matchAll(/!\[(.*?)\]\((.*?)\)/g),
                m => ({ alt: m[1], url: m[2] })
              );

              // For each url we download it and uplaod it to strapi
              // Then we replace it in the content
              for (let obj of allUrls) {
                // Downloading
                const downloaded = await strapi.config.functions.download(
                  obj.url
                );

                // Uploading
                const uploaded = await strapi.config.functions.upload(
                  downloaded
                );

                // Replacing
                const wpLink = `![${obj.alt}](${obj.url})`;
                const strapiLink = `![${obj.alt}](${uploaded.url})`;
                originalContentMD = originalContentMD.replace(
                  wpLink,
                  strapiLink
                );
              }

              // If the article has a cover
              if (jetpack_featured_media_url != "") {
                // Downloading the cover
                const downloaded = await strapi.config.functions.download(
                  jetpack_featured_media_url
                );

                // Uploading to strapi
                const uploaded = await strapi.config.functions.upload(
                  downloaded
                );

                fileId = uploaded.id;
              }

              // Creating object
              const articleData = {
                title: titlemd,
                slug,
                content: originalContentMD,
                cover: [fileId],
                author: author,
                published: true,
                published_at: date
              };

              postImported.push(titlemd);

              try {
                const created = await strapi.services.article.create(
                  articleData
                );

                resolve(created);
              } catch (err) {
                reject(err);
              }
            }
          })
      )
    );

    ctx.send(postImported);
  }
};
