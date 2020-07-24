/**
 * Helper functions to log using astroplant auth & tokens
 */
module.exports = {
  /***
   * add a preview to a new article
   */
  addPreview(data) {
    let tempContent = data.content;
    // Searching for urls in the content.
    const imgUrls = Array.from(
      tempContent.matchAll(/!\[(.*?)\]\((.*?)\)/g),
      (m) => ({ alt: m[1], url: m[2] })
    );

    const urls = Array.from(
      tempContent.matchAll(/\[(.*?)\]\((.*?)\)/g),
      (m) => ({ alt: m[1], url: m[2] })
    );

    const allUrls = urls.concat(imgUrls);

    // Then we replace it in the content
    for (let obj of allUrls) {
      // Replacing
      const imgLink = `![${obj.alt}](${obj.url})`;
      tempContent = tempContent.replace(imgLink, "");

      const link = `[${obj.alt}](${obj.url})`;
      tempContent = tempContent.replace(link, obj.alt);
    }

    data.preview = tempContent.substring(0, 416) + "...";
  },

  /***
   * update the preview of an existing article
   */
  async updatePreview(params, data) {
    this.addPreview(data);
  },
};
