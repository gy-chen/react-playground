FROM node:10-alpine

WORKDIR /var/www
ADD . /var/www

RUN yarn
RUN yarn build:client
RUN yarn build:server

CMD yarn start:server