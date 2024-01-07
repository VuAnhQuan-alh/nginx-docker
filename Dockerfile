# path /Dockerfile

# FROM node:20-alpine
# WORKDIR /app
# COPY . .
# RUN yarn install && yarn build
# CMD ["node", "dist/main"]

FROM node:20-alpine as development
WORKDIR /usr/src/app
COPY --chown=node:node ./package.json ./yarn.lock ./
COPY --chown=node:node ./ .
RUN yarn install --only=development
USER node

FROM node:20-alpine as build
WORKDIR /usr/src/app
COPY --chown=node:node ./package.json ./yarn.lock ./
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules
COPY --chown=node:node ./ .
RUN yarn build
USER node

FROM node:20-alpine as production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

CMD ["node", "dist/main"]