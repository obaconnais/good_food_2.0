FROM node:16.13

ENV NODE_ENV=production

COPY . .

RUN npm install
EXPOSE 4200
CMD ["npm", "run", "start"]