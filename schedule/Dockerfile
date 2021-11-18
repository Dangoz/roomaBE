# syntax=docker/dockerfile:1

FROM node:16-alpine 

WORKDIR /schedule

COPY . ./

RUN yarn install
RUN yarn build
RUN rm -rf .git

ENV NODE_ENV=production
ENV PORT=5200
ENV TZ=America/Vancouver

EXPOSE 5200
CMD [ "node", "./dist/server.js" ]