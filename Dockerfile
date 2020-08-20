FROM node:12-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy packages to the docker image
COPY package.json ./

# Installing dependencies
RUN npm install

# If you are building your code for production
# RUN npm ci --only=production

# Copy the rest of the content
COPY . ./

# Opening port 3000
EXPOSE 3000:3000

# Live reload
VOLUME [ "./:/src/app", "/app/node_modules", "/app/.next" ]

# Production
# VOLUME [ "./:/src/app"]