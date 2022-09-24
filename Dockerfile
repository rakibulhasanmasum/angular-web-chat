FROM node:14

WORKDIR /src/app
COPY package.json .

ENTRYPOINT ["/bin/bash", "-c", "npm install && npm run docker"]