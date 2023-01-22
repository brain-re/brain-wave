### ANGULAR ###
FROM node:16.13.2-slim as node

RUN apt update && apt upgrade -y && \
    apt install -y inetutils-ping rsync

WORKDIR /usr/app

COPY . .

EXPOSE 4200 49153
