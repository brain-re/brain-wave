FROM node:16.13.2-slim as express
### NODE SERVER ###
WORKDIR /express

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]

###
EXPOSE 3000