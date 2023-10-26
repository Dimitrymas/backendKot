FROM node:18

WORKDIR /usr/src/app


COPY app/ ./app

COPY index.js ./

COPY package*.json ./

RUN npm install

CMD [ "node", "index.js" ]