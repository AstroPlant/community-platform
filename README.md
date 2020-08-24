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

### Astroplant API & Back-End

It uses data & control endpoints from [astroplant's API](https://github.com/AstroPlant/astroplant-api) to control kits and display their data.

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

## Using Docker

Make sure you have the [git command line tool](https://git-scm.com/) and [Docker](https://www.docker.com/) installed first, then run the following commands :

```bash
# Clone the repo
git clone https://github.com/Meet-Miles/astroplant-platform

cd astroplant-platform

# Start up both strapi and next
docker-compose up -d
```

Once it's finished you should be asked to create a strapi admin account on your [localhost:1337](localhost:1337), then you should be able to access the front end on your [localhost:3000](localhost:3000).

## Without Docker

Run the following commands :

```bash
# Clone the repo
git clone https://github.com/Meet-Miles/astroplant-platform

cd astroplant-platform/api

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

The deployment is made through [AstroPlant's kubernetes cluster](https://github.com/AstroPlant/astroplant-k8s) hosted at [SURFSara](https://www.surf.nl/).

## Update the images on Docker-Hub

### Next

To push a new docker image to the docker hub registry, run:

```bash
# Log into Docker hub
export DOCKER_ID_USER="yourusername"
docker login https://index.docker.io/v1/

# Clone the repo
git clone https://github.com/AstroPlant/community-platform.git
cd community-platform

# Build a docker image with the astroplant-community-platform tag
docker build -t astroplant-community-platform -f Dockerfile.production .
docker tag astroplant-community-platform $DOCKER_ID_USER/astroplant-community-platform:0.0.1

$DOCKER_ID_USER/astroplant-community-platform:0.0.1

# Publish image to docker hub
docker push $DOCKER_ID_USER/astroplant-community-platform:0.0.1
```

### Strapi

To push a new docker image to the docker hub registry, run:

```bash
# Log into Docker hub if not done
export DOCKER_ID_USER="yourusername"
docker login https://index.docker.io/v1/

# Clone the repo if not already done
git clone https://github.com/AstroPlant/community-platform.git

# Navigate to the api folder
cd community-platform/api

# Build a docker image with the astroplant-community-platform tag
docker build -t astroplant-community-api -f Dockerfile.production .
$DOCKER_ID_USER/astroplant-community-api:0.0.1

# Publish image to docker hub
docker push $DOCKER_ID_USER/astroplant-community-api:0.0.1
```

## Update the Kubernetes Cluster

See [AstroPlant's kubernetes cluster](https://github.com/AstroPlant/astroplant-k8s).

# Roadmap

[x] Build a static website for news, FAQs & document sharing
[] Build a tool to create graphs using kits data.
[] Build a kit dashboard to access, edit & manage a kit. Currently done through [Astroplant Front-End](https://github.com/AstroPlant/astroplant-frontend-web)

# Contributors

- [RmnRss](https://github.com/rmnrss)
