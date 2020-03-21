FROM node:12.16.1-alpine3.9

ARG NODE_ENV=production

WORKDIR /app

# install dependencies
COPY ./yarn.lock ./package.json ./
RUN yarn

# copy over the rest of the files
COPY ./ .

RUN npm prune --production

# run
CMD ["npm", "run", "start"]
