FROM node:lts-alpine as base
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app && chown -R node:node /home/node/app/node_modules
WORKDIR /home/node/app
COPY --chown=node:node package*.json ./
EXPOSE 3030

# FROM base as production
# ENV NODE_ENV=production
# RUN npm ci --only-production
# COPY --chown=node:node . .
# CMD [ "node", "./dist/app.js" ]

FROM base as dev
ENV NODE_ENV=development
RUN npm install -g knex nodemon && npm install
COPY --chown=node:node . .
CMD [ "npm", "run", "start:dev"]
USER node

