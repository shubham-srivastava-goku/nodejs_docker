# nodejs_docker

Build docker image: docker build -t node-docker-typescript .

Run docker image: docker run -it -p 8080:80 --env PORT=80 node-docker-typescript

use --rm flag with docker run to remove the container automatically after it exists [For development environment]
