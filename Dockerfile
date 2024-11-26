FROM node:20-alpine as base

RUN apk update && apk add --no-cache tzdata

ENV TZ=America/Sao_Paulo

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
ENV PUPPETEER_EXECUTABLE_PATH /usr/bin/chromium-browser

RUN apk update && apk add --no-cache \
    .build-deps \
    udev \
    ttf-opensans \
    chromium \
    ca-certificates \
    nss \
    freetype \
    harfbuzz \
    ttf-freefont

RUN yarn global add typescript@^4.7.4
RUN yarn global add puppeteer

RUN apk add nano

WORKDIR /app

COPY package.json .
RUN yarn install --production

COPY . .
RUN yarn build;

FROM base as app
CMD ["yarn", "start"]