FROM node:14-alpine

WORKDIR /usr/devis/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "node", "index.js" ]
