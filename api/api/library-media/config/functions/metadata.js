const metascraper = require("metascraper")([
  require("metascraper-description")(),
  require("metascraper-image")(),
  require("metascraper-publisher")(),
  require("metascraper-title")()
]);

const axios = require("axios");

/**
 * Helper functions to get metadata from urls and create rich links
 */
module.exports = {
  /***
   * get the metadata of the given url
   */
  async get(url) {
    const { data } = await axios.get(url);
    return await metascraper({
      html: data,
      url
    });
  },

  /**
   * add metadata to the media link
   * @param {*} component to complete
   */
  async addTo(component) {
    const meta = await this.get(component.url);

    component.meta_description = meta.description || null;
    component.meta_title = meta.title || null;
    component.meta_image_url = meta.image || null;
    component.meta_publisher = meta.publisher || null;
  }
};
