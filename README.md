# nodejs_docker

To create tsconfig.json run npx tsc --init --rootDir src --outDir build --esModuleInterop --resolveJsonModule --lib es6 --module commonjs --allowJs true --noImplicitAny true

Build docker image: docker build -t node-docker-typescript .

Run docker image: docker run -it -p 8080:80 --env PORT=80 --name node-typescript-container node-docker-typescript

Use --rm flag with docker run to remove the container automatically after it exists [For development environment]

Use --env option to pass enviroment variables used by the server / program.

Use --name option to create named tag for container

Add valume to persist data: 

  docker run -it -p 8080:80 --env PORT=80 --name node-typescript-container -v feedback:/app/server/feeback -v /app/server/node_modules -v "D:\NodeJs_Programs\nodejs_docker:/app/server:ro" -v /app/server/temp node-docker-typescript
  
  -v  feedback:/app/server/feeback [Named Valume]: feedback is name of the volume and /app/server/feedback is directory inside the volume which is attached to the atual folder in the image. This is also an example of named volume. It will persit the volume after container stops.

  -v "D:\NodeJs_Programs\nodejs_docker:/app/server" is bind mount.

  -v /app/server/node_modules is anonymouse volume.

  -v /app/server/node_modules is added becuase -v "D:\NodeJs_Programs\nodejs_docker:/app/server" can override the folder, that means node modules will be removed too.  -v /app/server/node_modules will make sure that it is not deleted. It will survive because of docker rule, longer more specific path wins

We can assign environment variables and arg in dockerfile and we can also pass it as runtime arguments using --env --build-arg. We can also create .env file and pass it using --env-file ./.env while running the docker.
