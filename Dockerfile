FROM node:10.13.0
WORKDIR ./src/app
COPY package.json yarn.lock ./
RUN yarn install
COPY . ./
RUN yarn ssr-prod
