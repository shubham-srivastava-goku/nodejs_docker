FROM node:12
WORKDIR /share_ride/server
COPY package.json /share_ride/server
RUN npm install
COPY . /share_ride/server
CMD ["npm", "start"]