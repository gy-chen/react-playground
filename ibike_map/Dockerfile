FROM node:10-alpine

# Installs latest Chromium (68) package.
RUN apk update && apk upgrade && \
    echo @edge http://nl.alpinelinux.org/alpine/edge/community >> /etc/apk/repositories && \
    echo @edge http://nl.alpinelinux.org/alpine/edge/main >> /etc/apk/repositories && \
    apk add --no-cache \
    chromium@edge \
    nss@edge

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

WORKDIR /var/www
ADD . /var/www

RUN yarn
RUN yarn build:client
RUN yarn build:server

CMD yarn start:server