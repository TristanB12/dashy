FROM node:14

WORKDIR /usr/src/app
COPY package*.json ./

COPY . .

#Build vue app into public/
RUN cd front && npm install && npm run build

RUN  cd back/ && npm install

EXPOSE 8080

CMD [ "node", "./back/server.js" ]