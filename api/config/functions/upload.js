const path = require("path");
const fs = require("fs").promises;

module.exports = async (imgPath) => {
  // we want the file type without the "." like: "jpg" or "png"
  const ext = path.extname(imgPath).slice(1);

  // name of the file like image01.jpg
  const name = path.basename(imgPath);
  // read contents of file into a Buffer
  const buffer = await fs.readFile(imgPath);
  // get the buffersize using service function from upload plugin

  const fileData = await strapi.plugins.upload.services.upload.enhanceFile({
    path: imgPath,
    name,
    type: `image/${ext}`,
    size: buffer.toString().length,
  });

  // pass the `buffers` variable to the service function upload which
  // returns a promise that gets resolved upon upload
  return strapi.plugins.upload.services.upload.uploadFileAndPersist(fileData);
};
