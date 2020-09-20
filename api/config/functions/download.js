const axios = require("axios");
const path = require("path");
const fs = require("fs");

/**
 * Helper function to download cover image from the old WordPress
 */
module.exports = async url => {
  const name = path.basename(url);

  const filePath = `./public/${name}`;

  // create an instance of fs.writeStream
  const writeStream = fs.createWriteStream(filePath);

  // GET request and create a readStream to the resource
  const { data } = await axios.get(url, { responseType: "stream" });

  // pipe the data we receive to the writeStream
  data.pipe(writeStream);

  // Promise that resolves when the event writeStream.on
  // is emitted. Resolves the file path
  return new Promise((resolve, reject) => {
    writeStream.on("finish", () => {
      resolve(filePath);
    });
    writeStream.on("error", reject);
  });
};
