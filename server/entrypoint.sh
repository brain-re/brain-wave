#!/bin/bash
set -e

cd /express

# Install dependencies
if [ -e /express/node_modules/INSTALL_OK ]; then
  echo "INSTALL OK"
else
  rm -rf /express/node_modules

  npm install && \
  npm -g install migrate node-mongodb-fixtures && \
  npm install @faker-js/faker --save-dev
  
  touch /express/node_modules/INSTALL_OK
fi

# Start the application
npm run dev

# Run any additional commands passed in as arguments
exec "$@"