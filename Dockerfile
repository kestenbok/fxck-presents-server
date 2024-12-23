FROM node:22-slim

WORKDIR /app

COPY package.json .
COPY pnpm-lock.yaml .

RUN npm i -g pnpm

RUN pnpm install

COPY . .

CMD [ "pnpm", "start:dev" ]