FROM node:14

WORKDIR /src/app
COPY package.json /src/app

ENTRYPOINT ["/bin/bash", "-c", "npm install && npm run docker"]
