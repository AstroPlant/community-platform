# Strapi application

## Booting Strapi for development without Docker

### Set up environment variables

1. First generate a secure token.

```bash
openssl rand 64 | base64 # (linux/macOS users)
# or
node -e "console.log(require('crypto').randomBytes(64).toString('base64'))" # (all users)
```

2. Create an `env.local` file at the root of this folder with the following content :

```bash

ADMIN_JWT_SECRET=token_generated_above

```

### Setup a psql database

1. Install [PostreSQL](https://www.postgresql.org/).

Please follow the steps presented on the [PostreSQL website](https://www.postgresql.org/) to install postgres.

2. Create a database & a user

```bash
# Activating PSQL
psql postgres

# Create the strapi db
CREATE DATABASE strapi;

# Create a user
CREATE ROLE strapi WITH LOGIN PASSWORD 'strapi' CREATEDB;

# Grant all priviledge to the strapi user
GRANT ALL PRIVILEGES ON DATABASE strapi TO strapi;
```

### Install Strapi

From then you should be able to install and launch our strapi app with the following commands :

```bash
# Clone the repo
git clone https://github.com/AstroPlant/community-platform

cd community-platform/api

# install strapi dependencies
npm install

# Start up strapi
npm run develop
```

When Strapi is installed you should be asked to create a Strapi admin account on your [localhost:1337](localhost:1337).
