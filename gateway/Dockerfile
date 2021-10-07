# syntax=docker/dockerfile:1

FROM node:16-alpine 

WORKDIR /gateway

COPY . ./

RUN yarn install
RUN yarn build
RUN rm -rf .git

ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080
CMD [ "node", "./dist/server.js" ]