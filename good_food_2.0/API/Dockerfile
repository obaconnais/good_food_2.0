FROM node:16.13

ENV NODE_ENV=production

# WORKDIR /API

COPY . .

RUN npm install -g
EXPOSE 5000
CMD ["npm", "run", "dev"]