# FROM node:lts-alpine as base
# RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app && chown -R node:node /home/node/app/node_modules
# WORKDIR /home/node/app
# COPY --chown=node:node package*.json ./
# EXPOSE 3030

# FROM base as production
# ENV NODE_ENV=production
# RUN npm ci --only-production
# COPY --chown=node:node . .
# CMD [ "node", "./dist/app.js" ]

# FROM base as dev
# ENV NODE_ENV=development
# RUN npm install -g knex nodemon && npm install
# COPY --chown=node:node . .
# CMD [ "npm", "run", "start:dev"]
# USER node

FROM node:16.14.2 as dev
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin
EXPOSE 3030
RUN mkdir /home/node/app && chown node:node /home/node/app
WORKDIR /home/node/app
USER node
COPY --chown=node:node package.json package-lock.json ./
RUN npm install -g --quiet knex nodemon && npm install --quiet

FROM node:16.14.2-slim as prod
RUN mkdir /home/node/app && chown node:node /home/node/app
WORKDIR /home/node/app
USER node
COPY --from=dev --chown=node:node /home/node/app/node_modules ./node_modules
COPY . .
CMD ["node", "./bin/www"]