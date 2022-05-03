FROM node:16.13

ENV NODE_ENV=production

COPY . .

RUN npm install
EXPOSE 5000
CMD ["npm", "run", "dev"]