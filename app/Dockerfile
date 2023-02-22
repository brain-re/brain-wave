### ANGULAR ###
FROM node:16.13.2-slim as node

RUN apt update && apt upgrade -y && \
    apt install -y inetutils-ping rsync dos2unix

WORKDIR /usr/app

COPY . .

EXPOSE 4200 49153

RUN chmod +x entrypoint.sh && dos2unix entrypoint.sh

# Unable 'ng' cli in the container
RUN npm install -g @angular/cli && ngx-bootstrap --save
