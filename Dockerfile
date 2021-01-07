FROM node:12-alpine
WORKDIR /share_ride/server
COPY package.json package-lock.json ./
RUN npm install --production
COPY . .
CMD npm start