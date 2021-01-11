# nodejs_docker

Build docker image: docker build -t node-docker-typescript .

Run docker image: docker run -it -p 8080:80 --env PORT=80 --name node-typescript-container node-docker-typescript

Use --rm flag with docker run to remove the container automatically after it exists [For development environment]

Use --env option to pass enviroment variables used by the server / program.

Use --name option to create named tag for container

Add valume to persist data: 

  docker run -it -p 8080:80 --env PORT=80 --name node-typescript-container -v feedback:/app/server/feeback node-docker-typescript
  
  -v  feedback:/app/server/feeback: feedback is name of the volume and /app/server/feedback is directory inside the volume which is attached to the atual folder in the image. This is also an example of named volume. It will persit the volume after container stops.
