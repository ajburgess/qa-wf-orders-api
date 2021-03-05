FROM node:14-alpine

# RUN mkdir -p /home/node/app
WORKDIR /home/node/app

COPY package*.json ./

RUN npm install --production

COPY . .

EXPOSE 8000

CMD [ "node", "index.js" ]