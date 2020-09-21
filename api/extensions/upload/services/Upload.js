"use strict";

/**
 * Upload.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

const path = require("path");
const crypto = require("crypto");
const _ = require("lodash");
const { nameToSlug } = require("strapi-utils");

const { bytesToKbytes } = require("../utils/file");

const randomSuffix = () => crypto.randomBytes(5).toString("hex");
const generateFileName = (name) => {
  const baseName = nameToSlug(name, { separator: "_", lowercase: false });

  return `${baseName}_${randomSuffix()}`;
};

module.exports = {
  formatFileInfo({ filename, type, size }, fileInfo = {}, metas = {}) {
    const ext = path.extname(filename);
    const baseName = path.basename(filename, path.extname(filename));

    const usedName = fileInfo.name || baseName;

    const entity = {
      name: usedName,
      alternativeText: fileInfo.alternativeText,
      caption: fileInfo.caption,
      hash: generateFileName(usedName),
      ext,
      mime: type,
      size: bytesToKbytes(size),
    };

    const { refId, ref, source, field } = metas;

    if (refId && ref && field) {
      entity.related = [
        {
          refId,
          ref,
          source,
          field,
        },
      ];
    }

    if (metas.path) {
      entity.path = metas.path;
    }

    return entity;
  },
};
