# AstroPlant Community Platform

Repository of the astroplant community platform. For more information about the platform and it's purpose, go to [astroplant.io](https://www.astroplant.io/).

## Structure

```bash

│   .storybook  // storybook related files
│   api         // the strapi project
│   components  // the react components
|   |
|   └───  cards
|   └───  forms
|   └───  grids
|   └───  inputs
|   └───  layouts
|   └───  stories   // storybook's stories
|   └───  ...
│   hocs        // higher order components
│   pages       // next.js pages
|   providers   // providers & context definitions
|   public      // public assets for the next.js front-end
|   services    // tools to access api's data
|   styles      // styling related files
|   utils       // helper function & hooks

```

## Technology Stack & Dependencies

The platform uses [Next.js](https://nextjs.org/) as a front-end framework and [Strapi](https://strapi.io/) as a back-end. It uses data & control endpoints from [astroplant's API](https://github.com/AstroPlant/astroplant-api) to control kits and display their data.

## Tools used

- [Storybook](https://storybook.js.org/) : for documentation, design system publication, extreme use case testing.
- [Formik](https://formik.org/) & [Yup](https://github.com/jquense/yup) : for forms creation & validation
- [Styled-Components](https://styled-components.com/) : for styling.
- [Leaflet](https://leafletjs.com/) : for map creation & interactions.
- [React-Markdown](https://github.com/rexxars/react-markdown) : for markdown to html rendering.
- [Chart.js](https://www.chartjs.org/): for charts creation & edition.
  > /!\ May change in favor of [D3.js](https://d3js.org/).

## Contributors

- [RmnRss](https://github.com/rmnrss)
