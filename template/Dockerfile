# syntax=docker/dockerfile:1

FROM node:16-alpine 

WORKDIR /template

COPY . ./

RUN yarn install
RUN yarn build
RUN rm -rf .git

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000
CMD [ "node", "./dist/server.js" ]