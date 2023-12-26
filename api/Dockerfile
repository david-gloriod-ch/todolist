FROM node:latest

RUN mkdir -p /app

WORKDIR /app

COPY . .

RUN npm i -g npm@latest && npm i && npm update && npm run build

CMD [ "node", "dist/main.js"]