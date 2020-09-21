# AstroPlant Community Platform

Repository of the astroplant community platform.

- [Motivations](#motivations)
- [Architectural Decisions](#architectural-decisions)
  - [Technology Stack](#technology-stack)
  - [Tools and Libraries](#tools-and-libraries)
  - [Repo Structure](#repo-structure)
- [Development Setup](#development-setup)
- [Deployment](#deployment)
- [Roadmap](#roadmap)
- [Contributors](#contributors)

## Motivations

**Why a community platform ?**

As AstroPlant grew and new amazing space farmers joined, it has become obvious that our communication and on-boarding processes were not appropriate to what we wanted to provide to our end users and to our community. To solve those issues, we decided to create a single place where users, followers and contributors could go to for everything and anything Astroplant, a AstroPlant hub of some sort what we internally refer as the **AstroPlant platform**.

For more information about the platform, our community and goals, go to [astroplant.io](https://www.astroplant.io/).

# Architectural Decisions

> 📑 For future reference and new commers the following section is presenting and documenting the architectural decisions that came into account when creating the platform. Those decisions were made in May & June 2020 following user research, and based on early mock-ups.

## Technology Stack

We decided to go with the [JAM Stack](https://jamstack.org/) for many reason, the main one being that we wanted to provide a fast experience to our readers, there is no better way currently than using the JAM Stack to create staticly rendered websites.

### Next.js (Front-End)

The platform uses [Next.js](https://nextjs.org/) as a front-end framework, for many reasons : it does a lot out of the box, and provide great tools for both Server-Side & Static-Rendering, that we were going to need to create a blog, a support service, and a kit management tools all in the same space. And cherry on top : it's open-source !

### Strapi (API & Back-End)

For content management the platform is powered by [Strapi](https://strapi.io), not the best headless CMS for blogs/publication edition and creation, but probably the best overall when your content isn't limited blogs or text. And as a very popular open-source project it's improving at the speed of light every single day.

### PostreSQL (Data Storage)

The data is stored on a [PostreSQL](https://www.postgresql.org/) database. All the database management is handled by Strapi and its own ORM mapping tools, for more information read [Strapi Database Configuration](https://strapi.io/documentation/v3.x/concepts/configurations.html#database).

### Astroplant API & Back-End

The front-end uses data & control endpoints from [AstroPlants Core API](https://github.com/AstroPlant/astroplant-api) to control kits and display their data.

## Tools and Libraries

- [Storybook](https://storybook.js.org/) : for documentation, design system publication, component creation and extreme use case testing.
- [Formik](https://formik.org/) & [Yup](https://github.com/jquense/yup) : for forms creation & validation.
- [Styled-Components](https://styled-components.com/) : for styling.
- [Leaflet](https://leafletjs.com/) : for map creation & interactions.
- [React-Markdown](https://github.com/rexxars/react-markdown) : for markdown to html rendering.
- [Chart.js](https://www.chartjs.org/): for charts creation & edition.
  > :warning: May change in favor of [D3.js](https://d3js.org/).

## Repo structure

> 📑 We decided to keep the whole platform in a single repository as many of the change to the front-end also affects the back-end. It makes it easier to follow versioning and progression, and to rollback if necessary.

Here is the curent repository structure :

```bash

│   .storybook  # storybook configuration files
│   api         # the strapi project
│   components  # the react components
|   |
|   └───  cards
|   └───  forms
|   └───  grids
|   └───  inputs
|   └───  layouts
|   └───  stories   # storybook stories
|   └───  ...       # rest of the componenents
│   hocs        # higher order components
│   pages       # next.js pages
|   providers   # providers and context definitions
|   public      # public assets for the next.js front-end
|   services    # tools to access APIs
|   styles      # styling related files
|   utils       # helper function and hooks

```

# Development Setup

## Using Docker Compose

Make sure you have the [git command line tool](https://git-scm.com/) and [Docker](https://www.docker.com/) installed first, then run the following commands :

```bash
# Clone the repo
git clone https://github.com/AstroPlant/community-platform

cd community-platform

# Start up both strapi and next
docker-compose up -d
```

Once it's finished you should be asked to create a strapi admin account on [localhost:1337](localhost:1337). Please create at least an article, a user and add the correct permissions by following the steps [here](https://astroplant.gitbook.io/community-platform/). Then you should be able to access the front end on your [localhost:3000](localhost:3000).

## Without Docker

### Back-End

Please read the instructions indide the [api folder](api/README.md).

### Front-End

#### Create env files

Create an `env.local` file at the root of the project with the following content :

```bash

NEXT_PUBLIC_STRAPI_PUBLIC_URL="http://localhost:1337"
NEXT_PUBLIC_STRAPI_CLUSTER_URL="http://localhost:1337"

```

#### Install the package

Run the following commands :

```bash
# Clone the repo
git clone https://github.com/AstroPlant/community-platform

cd community-platform/api

# install strapi dependencies
npm install

# Start up strapi
npm run develop
```

When strapi is installed you should be asked to create a strapi admin account on your [localhost:1337](localhost:1337).

Then you should be able to install and boot next on [localhost:3000](localhost:3000).

```bash
cd ..

# install next dependencies
npm install

# Start up strapi
npm run dev
```

# Deployment

The deployment is made through [AstroPlant's kubernetes cluster](https://github.com/AstroPlant/astroplant-k8s) hosted at [SURFSara](https://www.surf.nl/). Please refer to the readme's inside the deployment folder: [Community API Folder](https://github.com/AstroPlant/astroplant-k8s/deployment/community-api) & [Community Platform Folder](https://github.com/AstroPlant/astroplant-k8s/deployment/community-platform).

# Roadmap

- [x] Build a static website for news, FAQs & document sharing.
- [ ] Build a tool to create graphs using kits data.
- [ ] Build a kit dashboard to access, edit & manage a kit. Currently done through [Astroplant Front-End](https://github.com/AstroPlant/astroplant-frontend-web)

# Contributors

- [RmnRss](https://github.com/rmnrss)
