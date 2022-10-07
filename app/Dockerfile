FROM node:16.13.2-slim as node
### ANGULAR ###
WORKDIR /usr/app

COPY package*.json ./

RUN npm -g install npm@8.4.0 && \
    npm install bootstrap jquery popper.js @angular/cli@12.1.3 --save

EXPOSE 4200 49153

COPY . .

RUN npm run build

RUN apt update && apt upgrade -y && \
    apt install -y inetutils-ping

CMD [ "npm", "run", "start"]
