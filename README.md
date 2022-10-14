# Before you begin

## With docker
1. I assume you have docker & docker-compose installed on your pc.

2. Please notice on the scripts under package.json we declared "docker" which will be executed in `npm run docker` command. I have added --host to be 0.0.0.0 to allow my docker container to expose the port to localhost of my host computer. Meanwhile --poll=2000 will allow to recompile the project in every changes we save.
 
3. To run the project 
```bash
  # on the terminal run
  docker-compose build
  docker-compose up
  
  # to run any commands on the docker container, on another terminal run
  docker exec -it angular6-web-chat_web_1 /bin/sh
  # docker exec -it angular6-web-chat_web_1 cmd.exe # for windows
  
  # ng can be found at `node_modules/.bin/ng`
```
## Without docker

```bash
  # run the following command on terminal
  npm start
```

# Screenshots
<img src="https://github.com/rakibulhasanmasum/web-chat/blob/master/screenshots/1.png" alt="screenshot" style="max-width: 100%; height: 600px;">
<img src="https://github.com/rakibulhasanmasum/web-chat/blob/master/screenshots/2.png" alt="screenshot" style="max-width: 100%; height: 600px;">
<img src="https://github.com/rakibulhasanmasum/web-chat/blob/master/screenshots/3.png" alt="screenshot" style="max-width: 100%; height: 600px;">

# angular.json [modifications]
```js
"schematics": {
  "@schematics/angular:component": {
    "inlineStyle": true,
    "inlineTemplate": true,
    "skipTests": true
   }
},
```
