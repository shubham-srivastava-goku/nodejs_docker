# nodejs_docker

To create tsconfig.json run npx tsc --init --rootDir src --outDir build --esModuleInterop --resolveJsonModule --lib es6 --module commonjs --allowJs true --noImplicitAny true

Docker is a layered based architecture. Every line in a Dockerfile is treated as an layer. Each layer is cached and if we are building the image again, it'll check if there are any updates there.
If there are no updates on the command, it'll use the cached layer and if there are update, it will create a new layer. All the other layer after the changed one will all be rebuilt.

This is the reason why we `copy package.json` and `package-lock.json` and install the package before copying the complete folder. We do not add packages frequently and we only use to change business logics.

**Build docker image:** `docker build -t node-docker-typescript .`
- `-t node-docker-typescript:v1` is to give specific image tag. If we will not provide it, docker will generate a random one.

**Run docker image:** `docker run -it -p 8080:80 --env PORT=80 --name node-typescript-container node-docker-typescript`
- `-it` is for interactive mode.
- `-p` is used to publish the port. 8080 on local system to 80 on docker container.
- `--env` option to pass environment variables used by the server / program.
- `--rm` flag with docker run to remove the container automatically after it exists [For development environment].
- `--name` option to create named tag for container.

**List all containers:** `docker ps -a`
- `-a` will show the stopped containers with running containers. Without `-a`, it'll only show running containers.

**List all images:** docker images -a
- `-a` is same as above

**Stop container:** `docker stop <container_name> or <container_id>.`

**Start container:** `docker start <container_name> or <container_id>.`
- Add `-a` to run the container in attached mode again.

**Attach the already running container:** `docker attach <container_name> or <container_id>`.

**See logs:** `docker logs -f <container_name> or <container_id>`

**See info of an image:** `docker image inspect <image_id>`

**Remove container:** `docker rm <container_name> or <container_id>`

**Rename images:** `docker tag old_tag:version new_tag:version`

**Remove images:** `docker rmi <image_name> or <image_id>`

**Remove all unused images:** `docker image prune`

**Copy file to container:** `docker cp /location/of/file/in/system <container_id>:/location/to/copy`

**Copy file from container:** `docker cp <container_id>:/location/of/file /location/to/copy/in/system`

**Publish an image:** `docker push HOST:image_name`

<sub>**NOTE:** Docker image name should be same as docker_id/repo_name which you gave on docker hub</sub>

**Pull an image:** `docker pull HOST:image_name`

### Volumes
A container can only persist data until it is not deleted. A container has it's own read/write layer. Images are read only. To overcome this, volumes are introduced.

1. **Volume:**
2. **Bind mount:**

**Add volume to persist data:**

  - `docker run -it -p 8080:80 --env PORT=80 --name node-typescript-container -v feedback:/app/server/feedback -v /app/server/node_modules -v "D:\NodeJs_Programs\nodejs_docker:/app/server:ro" -v /app/server/temp node-docker-typescript`
  
  - `-v  feedback:/app/server/feedback` **[Named Valume]:** feedback is name of the volume and /app/server/feedback is directory inside the volume which is attached to the actual folder in the image. This is also an example of named volume. It will persit the volume after container stops.

  - `-v "D:\NodeJs_Programs\nodejs_docker:/app/server"` is bind mount.

  - `-v /app/server/node_modules` is anonymous volume.

  - `-v /app/server/node_modules` is added because -v "D:\NodeJs_Programs\nodejs_docker:/app/server" can override the folder, that means node modules will be removed too. -v /app/server/node_modules will make sure that it is not deleted. It will survive because of docker rule, longer more specific path wins

We can assign environment variables and arg in dockerfile and we can also pass it as runtime arguments using --env --build-arg. We can also create .env file and pass it using --env-file ./.env while running the docker.
