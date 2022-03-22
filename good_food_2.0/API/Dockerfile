FROM node:16

WORKDIR /API

COPY . .

RUN npm install
EXPOSE 5000
CMD "[nodemon", "serveur.js"]