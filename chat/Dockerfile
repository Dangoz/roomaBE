# syntax=docker/dockerfile:1

FROM node:16-alpine 

WORKDIR /template

COPY . ./

RUN yarn install
RUN yarn build
RUN rm -rf .git

ENV NODE_ENV=production
ENV PORT=5100

EXPOSE 5100
CMD [ "node", "./dist/server.js" ]