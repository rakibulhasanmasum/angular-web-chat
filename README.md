# Before you begin

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
```

