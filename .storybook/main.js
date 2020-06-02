const path = require("path");

const pathToSvg = path.resolve(__dirname, "../public/icons");

module.exports = {
  webpackFinal: (config) => {
    // modify storybook's default file-loader rule to avoid conflicts with svgr
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test.test(".svg")
    );
    fileLoaderRule.exclude = pathToSvg;

    config.module.rules.push({
      test: /\.svg$/,
      include: pathToSvg,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            icon: true,
          },
        },
      ],
    });

    return config;
  },
  stories: ["../components/stories/*.stories.js"],
  addons: [
    "@storybook/addon-actions",
    "@storybook/addon-knobs",
    "@storybook/addon-links",
  ],
};
