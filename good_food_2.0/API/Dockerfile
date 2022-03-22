FROM FROM node:10

WORKDIR /server

COPY . .
COPY package.json

RUN npm install
EXPOSE 8080
CMD ["nodemon", "serveur.js"]