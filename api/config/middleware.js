module.exports = ({ env }) => ({
  parser: {
    enabled: true,
    multipart: true,
    formLimit: "25mb",
    jsonLimit: "25mb",
    formidable: {
      maxFileSize: 26214400,
    },
  },
  settings: {
    cors: {
      origin: [
        env("PRODUCTION_URL", "http://localhost:1337"),
        "http://localhost:3000",
        "https://app.astroplant.sda-projects.nl",
        "https://astroplant.io",
      ],
    },
  },
});
