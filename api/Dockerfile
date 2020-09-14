# Dockerfile used in the main docker compose to create the image of the API
# Environment variables and start commands are handled inside the docker compose

FROM strapi/base

# Create app directory
WORKDIR /usr/srv/app

# Copy packages to the docker image
COPY package.json ./

# Installing dependencies
RUN npm install

# Copy the rest of the content
COPY . ./

# Opening port 1337
EXPOSE 1337:1337

# Mounting volume to current directory
VOLUME [ "./:/usr/srv/app" ]