FROM node:latest

RUN mkdir -p /app

WORKDIR /app

COPY . .

# RUN npm i -g npm@latest && npm i && npm update && npm run build
RUN chmod +x install.sh

ENTRYPOINT [ "/bin/bash", "install.sh" ]

CMD [ "node", ".output/server/index.mjs"]