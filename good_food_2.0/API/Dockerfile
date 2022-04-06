FROM node:16.13

ENV NODE_ENV=production

# WORKDIR /API

COPY . .

RUN npm install

COPY . .

CMD ["npm run", "dev"]
EXPOSE 5000