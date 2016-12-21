FROM node:7.0

RUN apt-get update && apt-get install git

RUN mkdir /tmp/app

WORKDIR /tmp/app

COPY package.json index.js ./

RUN npm install

CMD node index.js
