FROM strapi/base

# Create app directory
WORKDIR /usr/srv/app

# Copy packages to the docker image
COPY package.json ./

# Installing dependencies
RUN npm install

# If you are building your code for production
# RUN npm ci --only=production

# Copy the rest of the content
COPY . ./

# Opening port 1337
EXPOSE 1337:1337

# Mounting volume to current directory
VOLUME [ "./:/srv/app" ]