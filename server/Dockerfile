FROM node:16.13.2-slim as express
### NODE SERVER ###
WORKDIR /express

RUN apt update && apt upgrade -y && \
    apt install -y dos2unix

COPY . .

###
EXPOSE 3000

RUN chmod +x entrypoint.sh && dos2unix entrypoint.sh