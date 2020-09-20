"use strict";
const axios = require("axios");
const TurndownService = require("turndown");
const slugify = require("slugify");
const fs = require("fs");
const removeMd = require("remove-markdown");

/**
 * Upload a file to strapi using the upload service
 * @param {*} url
 */
const uploadFromUrl = async url => {
  // Downloading
  const downloaded = await strapi.config.functions.download(url);

  // Uploading
  const uploaded = await strapi.config.functions.upload(downloaded);

  // Removing temp files
  fs.unlinkSync(downloaded);

  return uploaded;
};

/**
 * Searching for images in the content.
 * @param {*} content
 */
const findImgUrls = content => {
  return Array.from(content.matchAll(/!\[(.*?)\]\((.*?)\)/g), m => ({
    alt: m[1],
    url: m[2]
  }));
};

/**
 * create a preview based of the article content
 * @param {*} content
 */
const createPreview = content => {
  const plainText = removeMd(content);

  return plainText.substring(0, 136) + "...";
};

module.exports = {
  import: async () => {
    const turndownService = new TurndownService();

    const { data } = await axios.get(
      "https://www.astroplant.io/wp-json/wp/v2/posts?per_page=1&page=1"
    );

    const posts = await Promise.all(
      data.map(
        post =>
          new Promise(async (resolve, reject) => {
            const {
              title: { rendered: titleRendered },
              content: { rendered: contentRendered },
              date,
              jetpack_featured_media_url
            } = post;

            const slug = slugify(titleRendered, {
              lower: true
            });

            const existingArticle = await strapi.query("article").findOne({
              slug: slug
            });

            if (existingArticle) {
              strapi.log.info("Skipping... This article already exists");
              resolve({});
            } else {
              strapi.log.info(`Adding ${slug}...`);

              // Default author
              const author = await strapi
                .query("user", "users-permissions")
                .findOne({ username: "astrobot" });

              // Cover placeholder
              let coverId = null;

              // transforming to markdowns
              let mdContent = turndownService.turndown(contentRendered);

              const allImageUrls = findImgUrls(mdContent);

              /**
               * For each url we download and upload it to strapi
               * Then we update the links with the correct urls
               */
              for (let obj of allImageUrls) {
                const uploadedImage = await uploadFromUrl(obj.url);

                // Replacing
                const wpLink = `![${obj.alt}](${obj.url})`;
                const strapiLink = `![${obj.alt}](${uploadedImage.url})`;
                mdContent = mdContent.replace(wpLink, strapiLink);
              }

              // If the article has a cover
              if (jetpack_featured_media_url != "") {
                const uploadedCover = await uploadFromUrl(
                  jetpack_featured_media_url
                );

                coverId = uploadedCover.id;
              }

              // Creating object
              const articleData = {
                title: titleRendered,
                slug: slug,
                cover: coverId,
                preview: createPreview(mdContent),
                published: true,
                published_at: date,
                author: author || null,
                content: [
                  {
                    __component: "content-type.rich-text",
                    text: mdContent
                  }
                ]
              };

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

    return posts;
  }
};
