# nodejs_docker

To create tsconfig.json run npx tsc --init --rootDir src --outDir build --esModuleInterop --resolveJsonModule --lib es6 --module commonjs --allowJs true --noImplicitAny true

Docker is a layered based architecture. Every line in a Dockerfile is treated as an layer. Each layer is cached and if we are building the image again, it'll check if there are any updates there.
If there are no updates on the command, it'll use the cached layer and if there are update, it will create a new layer. All the other layer after the changed one will all be rebuilt.

That is the reason we `copy package.json and package-lock.json` and install the package. We do not add packages frequently and we only use to change business logics.


**Build docker image:** `docker build -t node-docker-typescript .`

**Run docker image:** `docker run -it -p 8080:80 --env PORT=80 --name node-typescript-container node-docker-typescript`

Use `--rm` flag with docker run to remove the container automatically after it exists [For development environment]

Use `--env` option to pass environment variables used by the server / program.

Use `--name` option to create named tag for container

**Add volume to persist data:**

  - `docker run -it -p 8080:80 --env PORT=80 --name node-typescript-container -v feedback:/app/server/feedback -v /app/server/node_modules -v "D:\NodeJs_Programs\nodejs_docker:/app/server:ro" -v /app/server/temp node-docker-typescript`
  
  - `-v  feedback:/app/server/feedback` **[Named Valume]:** feedback is name of the volume and /app/server/feedback is directory inside the volume which is attached to the actual folder in the image. This is also an example of named volume. It will persit the volume after container stops.

  - `-v "D:\NodeJs_Programs\nodejs_docker:/app/server"` is bind mount.

  - `-v /app/server/node_modules` is anonymous volume.

  - `-v /app/server/node_modules` is added because -v "D:\NodeJs_Programs\nodejs_docker:/app/server" can override the folder, that means node modules will be removed too. -v /app/server/node_modules will make sure that it is not deleted. It will survive because of docker rule, longer more specific path wins

We can assign environment variables and arg in dockerfile and we can also pass it as runtime arguments using --env --build-arg. We can also create .env file and pass it using --env-file ./.env while running the docker.
