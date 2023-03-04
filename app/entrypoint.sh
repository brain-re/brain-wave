#!/bin/bash
set -e

cd /usr/app

# Install dependencies
if [ -e /usr/app/node_modules/INSTALL_OK ]; then
  echo "INSTALL OK"
else
  rm -rf /usr/app/node_modules

  npm -g install npm@8.4.0 --loglevel verbose && \
  npm install bootstrap jquery popper.js @angular/cli@12.1.3 --save --loglevel verbose

  touch /usr/app/node_modules/INSTALL_OK
fi


# Start the application
npm run start

# Run any additional commands passed in as arguments
exec "$@"
