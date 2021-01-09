FROM node:12-alpine
WORKDIR /share_ride/server
COPY package.json package-lock.json ./
RUN npm install --production
COPY . .
EXPOSE 8080 80
CMD npm start