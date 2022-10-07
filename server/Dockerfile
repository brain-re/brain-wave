FROM node:16.13.2-slim as express
### NODE SERVER ###
WORKDIR /express

COPY package*.json ./

RUN npm install && \
    npm install migrate -g && \
    npm install node-mongodb-fixtures -g && \
    npm install @faker-js/faker --save-dev

COPY . .

CMD ["npm", "run", "dev"]

###
EXPOSE 3000